import {
  FETCH_INTERNALAUDITORS,
  REMOVE_INTERNALAUDITORS,
  INTERNALAUDITOR_FORM_CHANGE,
  SET_INTERNALAUDITOR_FORM_ERRORS,
  INTERNALAUDITOR_FORM_RESET,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_INTERNALAUDITORS_LOADING,
  SET_INTERNALAUDITOR_SUBMITTING,
  SET_INTERNALAUDITOR_LOADING,
  SIGNUP_RESET
} from './constants';


const initialState = {
  internalauditors: [],
  internalauditorFormData: {

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
  isInternalAuditorSubmitting: false,
  isInternalAuditorLoading: false
};

 

const internalauditorReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_INTERNALAUDITORS:
      return {
        ...state,
        internalauditors: action.payload
      };

    case REMOVE_INTERNALAUDITORS:
      const index = state.internalauditors.findIndex(b => b._id === action.payload);

      return {
        ...state,
        internalauditors: [
          ...state.internalauditors.slice(0, index),
          ...state.internalauditors.slice(index + 1)
        ]
      };

    case INTERNALAUDITOR_FORM_CHANGE:
      return {
        ...state,
        internalauditorFormData: { ...state.internalauditorFormData, ...action.payload }
      };

    case SET_INTERNALAUDITOR_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };

    case INTERNALAUDITOR_FORM_RESET:
      return {
        ...state,
        internalauditorFormData: {
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

    case SET_INTERNALAUDITORS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_INTERNALAUDITOR_SUBMITTING:
      return {
        ...state,
        isInternalAuditorSubmitting: action.payload
      };

    case SET_INTERNALAUDITOR_LOADING:
      return {
        ...state,
        isInternalAuditorLoading: action.payload
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

 

export default internalauditorReducer;