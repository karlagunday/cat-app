import {
  FETCH_FILTERED_IMAGES_REQUEST,
  FETCH_FILTERED_IMAGES_SUCCESS,
  FETCH_FILTERED_IMAGES_FAILURE,
  CLEAR_IMAGES,
  SET_TO_END_OF_PAGE,
  SET_CURRENT_IMAGE,
  GO_BACK_TO_LIST,
  SHOW_ERROR,
} from './imageActionTypes';

// defiines how the state looks initially
const initialState = {
  loading: false,
  images: [],
  error: '',
  filter: {}, // by default, no filter is applied
  page: 0,
  limit: 10,
  endOfPage: false,
  currentImage: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    // resolves the action when a fetch request is made
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

    // resolves the action when images have been successfully fetched from the API
    case FETCH_FILTERED_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        images: action.payload.images,
      };

    // resolves the action when fetching of images fails
    case FETCH_FILTERED_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        images: [],
        error: action.payload.error,
      };

    // resolves the action when clearning images from the list
    case CLEAR_IMAGES:
      return {
        ...state,
        images: [],
        endOfPage: false, // clearing the images will reset page back to beginning
      };

    // resolves the action when the list has reached the end of the page
    case SET_TO_END_OF_PAGE:
      return {
        ...state,
        loading: false,
        endOfPage: true,
      };

    // resolves the action when the list has reached the end of the page
    case SET_CURRENT_IMAGE:
      return {
        ...state,
        currentImage: action.payload.currentImage,
      };

    // resolves the action when user goes back from the single page to the list page
    case GO_BACK_TO_LIST:
      return {
        ...state,
        currentImage: null,
      };

    // resolves the action when an error occurs
    // `error` should be of format: `{ message: 'Human-readable error', details: 'Erro message thrown'}`
    case SHOW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default imageReducer;
