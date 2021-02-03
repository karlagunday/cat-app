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

// defiines how the state looks initially
const initialState = {
  loading: false,
  cats: [],
  error: '',
  filter: {}, // by default, no filter is applied
  page: 0,
  limit: 10,
  endOfPage: false,
  currentCat: null,
};

const catReducer = (state = initialState, action) => {
  switch (action.type) {
    // resolves the action when a fetch request is made
    case FETCH_FILTERED_CATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        filter: {
          ...state.filter,
          ...action.payload.filter,
        },
      };

    // resolves the action when cats have been successfully fetched from the API
    case FETCH_FILTERED_CATS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        cats: action.payload.cats,
      };

    // resolves the action when fetching of cats fails
    case FETCH_FILTERED_CATS_FAILURE:
      return {
        ...state,
        loading: false,
        cats: [],
        error: action.payload.error,
      };

    // resolves the action when clearning cats from the list
    case CLEAR_CATS:
      return {
        ...state,
        cats: [],
        endOfPage: false, // clearing the cats will reset page back to beginning
      };

    // resolves the action when the list has reached the end of the page
    case SET_TO_END_OF_PAGE:
      return {
        ...state,
        loading: false,
        endOfPage: true,
      };

    // resolves the action when the list has reached the end of the page
    case SET_CURRENT_CAT:
      return {
        ...state,
        currentCat: action.payload.currentCat,
      };

    // resolves the action when user goes back from the single page to the list page
    case GO_BACK_TO_LIST:
      return {
        ...state,
        currentCat: null,
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

export default catReducer;
