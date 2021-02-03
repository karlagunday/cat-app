import {
  FETCH_FILTERED_CATS_REQUEST,
  FETCH_FILTERED_CATS_SUCCESS,
  FETCH_FILTERED_CATS_FAILURE,
  CLEAR_CATS,
  SET_TO_END_OF_PAGE,
  SET_CURRENT_CAT,
  GO_BACK_TO_LIST,
  SHOW_ERROR,
} from './catActionTypes';
import Cat from '../../api/cat';

// action when a request for cats is made
export const fetchFilteredCatsRequest = (filter) => {
  return {
    type: FETCH_FILTERED_CATS_REQUEST,
    payload: {
      filter: filter,
    },
  };
};

// action when the API responds with the list of cats successfully
export const fetchFilteredCatsSuccess = (cats) => {
  return {
    type: FETCH_FILTERED_CATS_SUCCESS,
    payload: {
      cats: cats,
    },
  };
};

// action when the API fails to respond
export const fetchFilteredCatsFailure = (error) => {
  return {
    type: FETCH_FILTERED_CATS_FAILURE,
    payload: {
      error: error,
    },
  };
};

// action when the cat list is cleared
export const clearCats = () => {
  return {
    type: CLEAR_CATS,
  };
};

// action when the list has reached the end of the page
export const setToEndOfPage = () => {
  return {
    type: SET_TO_END_OF_PAGE,
  };
};

// action when the a single cat is selected to be rendered
export const setCurrentCat = (cat) => {
  return {
    type: SET_CURRENT_CAT,
    payload: {
      currentCat: cat,
    },
  };
};

// action when user is going back from single page to list page
export const goBackToList = (cat) => {
  return {
    type: GO_BACK_TO_LIST,
  };
};

// action when user is going back from single page to list page
export const showError = (error) => {
  return {
    type: SHOW_ERROR,
    payload: {
      error: error,
    },
  };
};

/**
 * Retrieves a list of unique cats based on filter criteria
 * @param {Object} filter filter criteria to search resuslts with
 */
export const fetchCats = (filter) => {
  return function (dispatch, getState) {
    // make sure filters are updated on state
    dispatch(fetchFilteredCatsRequest(filter));

    // retrieve cats based on the filter provided
    return new Cat()
      .search(filter)
      .then((cats) => {
        // update state with the list of filtered cats
        // since the API is inconsistent, eg it returns duplicates
        // and returns the same results compared to the first page
        // if there are no more results to be loaded,
        // we need to filter those to make sure the results are accurate
        const currentCats = getState().cats;
        let ids = {};
        let filteredCats = []; // use a dedicated array to retain sort

        // determine new cats
        // if doing an initial fetch, this will return every fetched cat
        [...currentCats, ...cats].forEach((cat) => {
          if (!ids[cat.id]) {
            ids[cat.id] = true;
            filteredCats.push(cat);
          }
        });

        // if the resulting cats are of the same length as of the current one,
        // we'll assume it reached the end of the page and should no longer render any further
        if (currentCats.length === filteredCats.length) {
          dispatch(setToEndOfPage());
        } else {
          dispatch(fetchFilteredCatsSuccess(filteredCats));
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };
};

// fetches more cats for the current filter criteria
export const showMoreCats = () => {
  return function (dispatch, getState) {
    const { filter } = getState(); // @TODO - update to have state separated for `cat`
    return dispatch(
      fetchCats({
        ...filter,
        page: filter.page + 1, // move to the next page to fetch more data
      }),
    );
  };
};
