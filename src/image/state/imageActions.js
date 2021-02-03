import {
  SET_IMAGE_FILTER,
  FETCH_FILTERED_IMAGES_REQUEST,
  FETCH_FILTERED_IMAGES_SUCCESS,
  FETCH_FILTERED_IMAGES_FAILURE,
  CLEAR_IMAGES,
  SET_TO_END_OF_PAGE,
  SET_CURRENT_IMAGE,
  GO_BACK_TO_LIST,
} from './imageActionTypes';
import Image from '../../api/image';

// action to set the current breed filter
export const setImageFilter = (filter) => {
  return {
    type: SET_IMAGE_FILTER,
    payload: {
      filter: filter,
    },
  };
};

// action when a request for images is made
export const fetchFilteredImagesRequest = (filter) => {
  return {
    type: FETCH_FILTERED_IMAGES_REQUEST,
    payload: {
      filter: filter,
    },
  };
};

// action when the API responds with the list of images successfully
export const fetchFilteredImagesSuccess = (images) => {
  return {
    type: FETCH_FILTERED_IMAGES_SUCCESS,
    payload: {
      images: images,
    },
  };
};

// action when the API fails to respond
export const fetchFilteredImagesFailure = (error) => {
  return {
    type: FETCH_FILTERED_IMAGES_FAILURE,
    payload: {
      error: error,
    },
  };
};

// action when the image list is cleared
export const clearImages = () => {
  return {
    type: CLEAR_IMAGES,
  };
};

// action when the list has reached the end of the page
export const setToEndOfPage = () => {
  return {
    type: SET_TO_END_OF_PAGE,
  };
};

// action when the a single image is selected to be rendered
export const setCurrentImage = (image) => {
  return {
    type: SET_CURRENT_IMAGE,
    payload: {
      currentImage: image,
    },
  };
};

// action when user is going back from single page to list page
export const goBackToList = (image) => {
  return {
    type: GO_BACK_TO_LIST,
  };
};

/**
 * Retrieves a list of unique images based on filter criteria
 * @param {Object} filter filter criteria to search resuslts with
 */
export const fetchImages = (filter) => {
  return function (dispatch, getState) {
    // make sure filters are updated on state
    dispatch(fetchFilteredImagesRequest(filter));

    // retrieve images based on the filter provided
    new Image()
      .search(filter)
      .then((images) => {
        // update state with the list of filtered images
        // since the API is inconsistent, eg it returns duplicates
        // and returns the same results compared to the first page
        // if there are no more results to be loaded,
        // we need to filter those to make sure the results are accurate
        const currentImages = getState().images;
        let ids = {};
        let filteredImages = []; // use a dedicated array to retain sort

        // determine new images
        // if doing an initial fetch, this will return every fetched image
        [...currentImages, ...images].forEach((image) => {
          if (!ids[image.id]) {
            ids[image.id] = true;
            filteredImages.push(image);
          }
        });

        // if the resulting images are of the same length as of the current one,
        // we'll assume it reached the end of the page and should no longer render any further
        if (currentImages.length === filteredImages.length) {
          dispatch(setToEndOfPage());
        } else {
          dispatch(fetchFilteredImagesSuccess(filteredImages));
        }
      })
      .catch((error) => {
        dispatch(
          // update state with the error message
          fetchFilteredImagesFailure('This is an error message'),
        );
      });
  };
};

// fetches more images for the current filter criteria
export const showMoreImages = () => {
  return function (dispatch, getState) {
    const { filter } = getState(); // @TODO - update to have state separated for `image`
    dispatch(
      fetchImages({
        ...filter,
        page: filter.page + 1, // move to the next page to fetch more data
      }),
    );
  };
};
