import {
  SET_IMAGE_FILTER,
  FETCH_FILTERED_IMAGES_REQUEST,
  FETCH_FILTERED_IMAGES_SUCCESS,
  FETCH_FILTERED_IMAGES_FAILURE,
} from './imageActionTypes';
import Image from '../../api/image';

export const setImageFilter = (filter) => {
  return {
    type: SET_IMAGE_FILTER,
    payload: {
      filter: filter,
    },
  };
};

export const fetchFilteredImagesRequest = (filter) => {
  return {
    type: FETCH_FILTERED_IMAGES_REQUEST,
    payload: {
      filter: filter,
    },
  };
};

export const fetchFilteredImagesSuccess = (images) => {
  return {
    type: FETCH_FILTERED_IMAGES_SUCCESS,
    payload: {
      images: images,
    },
  };
};

export const fetchFilteredImagesFailure = (error) => {
  return {
    type: FETCH_FILTERED_IMAGES_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const fetchImages = (filter) => {
  return function (dispatch) {
    // make sure filters are updated on state
    dispatch(fetchFilteredImagesRequest(filter));

    // retrieve images based on the filter provided
    new Image()
      .search(filter)
      .then((images) => {
        // update state with the list of filtered images
        dispatch(fetchFilteredImagesSuccess(images));
      })
      .catch((error) => {
        dispatch(
          // update state with the error message
          fetchFilteredImagesSuccess('This is an error message'),
        );
      });
  };
};
