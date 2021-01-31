import {
  SET_IMAGE_FILTER,
  FETCH_FILTERED_IMAGES_REQUEST,
  FETCH_FILTERED_IMAGES_SUCCESS,
  FETCH_FILTERED_IMAGES_FAILURE,
  CLEAR_IMAGES,
  SET_TO_END_OF_PAGE,
} from './imageActionTypes';

const initialState = {
  loading: false,
  images: [],
  error: '',
  filter: {}, // by default, no filter is applied
  page: 0,
  limit: 10,
  endOfPage: false,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE_FILTER:
      // set the current filter
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload.filter,
        },
      };
    case FETCH_FILTERED_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        filter: {
          ...state.filter,
          ...action.payload.filter,
        },
      };
    case FETCH_FILTERED_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload.images,
      };
    case FETCH_FILTERED_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        images: [],
        error: action.payload.error,
      };
    case CLEAR_IMAGES:
      return {
        ...state,
        images: [],
        endOfPage: false, // clearing the images will reset page back to beginning
      };
    case SET_TO_END_OF_PAGE:
      return {
        ...state,
        loading: false,
        endOfPage: true,
      };
    default:
      return state;
  }
};

export default imageReducer;
