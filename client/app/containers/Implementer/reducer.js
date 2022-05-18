import {
  FETCH_IMPLEMENTERS,
  FETCH_IMPLEMENTERS_SELECT,
  FETCH_IMPLEMENTERS_FRAMEWORKS,
  REMOVE_IMPLEMENTERS,
  IMPLEMENTER_FORM_CHANGE,
  SET_IMPLEMENTER_FORM_ERRORS,
  IMPLEMENTER_FORM_RESET,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_IMPLEMENTERS_LOADING,
  SET_IMPLEMENTER_SUBMITTING,
  SET_IMPLEMENTER_LOADING,
  SET_ASSIGNED_IMPLEMENTERS_LOADING,
  SIGNUP_RESET,
  
  FETCH_IMPLEMENTER_FRAMEWORKS,
  SET_IMPLEMENTER_FRAMEWORKS_LOADING ,

} from './constants';


const initialState = {
  implementers: [],
  frameworks: [],
  implementersSelect:[],
  assignedImplementers: [],
  implementerFormData: {

    name: '',
    email: '',
    phoneNumber: '',

   // framework: [], //modification
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
  isImplementerSubmitting: false,
  isImplementerLoading: false,
  isAssignedImplementerLoading: false
  
};

 

const implementerReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_IMPLEMENTERS:
      return {
        ...state,
        implementers: action.payload
      };

      case FETCH_IMPLEMENTERS_FRAMEWORKS:
        return {
          ...state,
          assignedImplementers: action.payload
        };

    case REMOVE_IMPLEMENTERS:
      const index = state.implementers.findIndex(b => b._id === action.payload);

      return {
        ...state,
        implementers: [
          ...state.implementers.slice(0, index),
          ...state.implementers.slice(index + 1)
        ]
      };

    case IMPLEMENTER_FORM_CHANGE:
      return {
        ...state,
        implementerFormData: { ...state.implementerFormData, ...action.payload }
      };

    case SET_IMPLEMENTER_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };

    case IMPLEMENTER_FORM_RESET:
      return {
        ...state,
        implementerFormData: {
          name: '',
          email: '',
          phoneNumber: '', //modification
         // framework: [],
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

    case SET_IMPLEMENTERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_IMPLEMENTER_SUBMITTING:
      return {
        ...state,
        isImplementerSubmitting: action.payload
      };

    case SET_IMPLEMENTER_LOADING:
      return {
        ...state,
        isImplementerLoading: action.payload
      };

      case SET_ASSIGNED_IMPLEMENTERS_LOADING:
      return {
        ...state,
        isAssignedImplementerLoading: action.payload
      };

      case FETCH_IMPLEMENTERS_SELECT:
        return {
          ...state,
          implementersSelect: action.payload
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
      
    case FETCH_IMPLEMENTER_FRAMEWORKS:
      return {
        ...state,
        frameworks: action.payload
      };

    case SET_IMPLEMENTER_FRAMEWORKS_LOADING:
      return {
        ...state,
        isImpLoading: action.payload
      };


    default:
      return state;
  }
};


export default implementerReducer;