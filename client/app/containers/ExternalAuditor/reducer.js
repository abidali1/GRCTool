import {
  FETCH_EXTERNALAUDITORS,
  REMOVE_EXTERNALAUDITORS,
  EXTERNALAUDITOR_FORM_CHANGE,
  SET_EXTERNALAUDITOR_FORM_ERRORS,
  EXTERNALAUDITOR_FORM_RESET,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_EXTERNALAUDITORS_LOADING,
  SET_EXTERNALAUDITOR_SUBMITTING,
  SET_EXTERNALAUDITOR_LOADING,
  SIGNUP_RESET
} from './constants';


const initialState = {
  externalauditors: [],
  externalauditorFormData: {

    name: '',
    email: '',
    phoneNumber: '',

    framework: [], //modification
    // business: ''
  },
  formErrors: {},

  signupFormData: {

    email: '',
    firstName: '',
    lastName: '',
    password: ''

  },

  signupFormErrors: {},
  isLoading: false,
  isExternalAuditorSubmitting: false,
  isExternalAuditorLoading: false
};

 

const externalauditorReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_EXTERNALAUDITORS:
      return {
        ...state,
        externalauditors: action.payload
      };

    case REMOVE_EXTERNALAUDITORS:
      const index = state.externalauditors.findIndex(b => b._id === action.payload);

      return {
        ...state,
        externalauditors: [
          ...state.externalauditors.slice(0, index),
          ...state.externalauditors.slice(index + 1)
        ]
      };

    case EXTERNALAUDITOR_FORM_CHANGE:
      return {
        ...state,
        externalauditorFormData: { ...state.externalauditorFormData, ...action.payload }
      };

    case SET_EXTERNALAUDITOR_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };

    case EXTERNALAUDITOR_FORM_RESET:
      return {
        ...state,
        externalauditorFormData: {
          name: '',
          email: '',
          phoneNumber: '', //modification
          framework: [],
          business: ''
        },
        formErrors: {}
      };

    case SIGNUP_CHANGE:
      return {
        ...state,
        signupFormData: { ...state.signupFormData, ...action.payload }
      };

    case SET_SIGNUP_FORM_ERRORS:
      return {
        ...state,
        signupFormErrors: action.payload
      };

    case SET_EXTERNALAUDITORS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_EXTERNALAUDITOR_SUBMITTING:
      return {
        ...state,
        isExternalAuditorSubmitting: action.payload
      };

    case SET_EXTERNALAUDITOR_LOADING:
      return {
        ...state,
        isExternalAuditorLoading: action.payload
      };

    case SIGNUP_RESET:

      return {
        ...state,
        signupFormData: {
          email: '',
          firstName: '',
          lastName: '',
          password: ''
        }
      };
    default:
      return state;
  }
};

 

export default externalauditorReducer;