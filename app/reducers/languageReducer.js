import {CHANGE_LANGUAGE} from '../actions/actions';

const initialState = {
  language: 'en',
};

const languageReducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_LANGUAGE') {
    /*return {
      ...state,
      language: action.language,
    };*/
    return Object.assign({}, state, {
      language: action.language,
    });
  }
  return state;
};

export default languageReducer;
