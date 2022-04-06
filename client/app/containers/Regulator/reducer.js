import {
  FETCH_REGULATORS,
  FETCH_REGULATOR_FRAMEWORKS,
  REMOVE_REGULATORS,
  REGULATOR_FORM_CHANGE,
  SET_REGULATOR_FORM_ERRORS,
  REGULATOR_FORM_RESET,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_REGULATORS_LOADING,
  SET_REGULATOR_SUBMITTING,
  SET_REGULATOR_LOADING,
  SIGNUP_RESET,
  SET_REGULATOR_FRAMEWORKS_LOADING
} from './constants';


const initialState = {
  regulators: [],
  rFrameworks: [], //for regulator framework list
  regulatorFormData: {

    name: '',
    email: '',
    phoneNumber: '',

    framework: [], //modification
    business: ''
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
  isRegulatorSubmitting: false,
  isRegulatorLoading: false,
  isRegulatorFrameworkLoading: false
};

 

const regulatorReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_REGULATORS:
      return {
        ...state,
        regulators: action.payload
      };

      case FETCH_REGULATOR_FRAMEWORKS:
      return {
        ...state,
        rFrameworks: action.payload
      };

    case REMOVE_REGULATORS:
      const index = state.regulators.findIndex(b => b._id === action.payload);

      return {
        ...state,
        regulators: [
          ...state.regulators.slice(0, index),
          ...state.regulators.slice(index + 1)
        ]
      };

    case REGULATOR_FORM_CHANGE:
      return {
        ...state,
        regulatorFormData: { ...state.regulatorFormData, ...action.payload }
      };

    case SET_REGULATOR_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };

    case REGULATOR_FORM_RESET:
      return {
        ...state,
        regulatorFormData: {
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

    case SET_REGULATORS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

      case SET_REGULATOR_FRAMEWORKS_LOADING:
      return {
        ...state,
        isRegulatorFrameworkLoading: action.payload
      };

    case SET_REGULATOR_SUBMITTING:
      return {
        ...state,
        isRegulatorSubmitting: action.payload
      };

    case SET_REGULATOR_LOADING:
      return {
        ...state,
        isRegulatorLoading: action.payload
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

 

export default regulatorReducer;