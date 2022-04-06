/*
 *
 * Framework reducer
 *
 */

import {
  FETCH_FRAMEWORKS,
  FETCH_STORE_FRAMEWORKS,
  FETCH_FRAMEWORK,
  FRAMEWORK_CHANGE,
  FRAMEWORK_EDIT_CHANGE,
  SET_FRAMEWORK_FORM_ERRORS,
  SET_FRAMEWORK_FORM_EDIT_ERRORS,
  ADD_FRAMEWORK,
  REMOVE_FRAMEWORK,
  FETCH_FRAMEWORKS_SELECT,
  RESET_FRAMEWORK,
  SET_FRAMEWORKS_LOADING
} from './constants';

const initialState = {
  frameworks: [],
  storeFrameworks: [],
  framework: {
    name: '',
    description: '',
    domains:{
      domainNo:'',
      domainName:'',
      domainDescription:'',
      controls:{
        mainControl: '',
        controlDescription:'',
        subControls:{
          subControlNo:'',
          subControlDescription:''
        }
    }
    }
  },
  frameworksSelect: [],
  frameworkFormData: {
    name: '',
    description: '',
    domains:[],
    isActive: true
  },
  formErrors: {},
  editFormErrors: {},
  isLoading: false
};

const frameworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FRAMEWORKS:
      return {
        ...state,
        frameworks: action.payload
      };
    case FETCH_STORE_FRAMEWORKS:
      return {
        ...state,
        storeFrameworks: action.payload
      };
    case FETCH_FRAMEWORK:
      return {
        ...state,
        framework: action.payload,
        editFormErrors: {}
      };
    case FETCH_FRAMEWORKS_SELECT:
      return {
        ...state,
        frameworksSelect: action.payload
      };
    case ADD_FRAMEWORK:
      return {
        ...state,
        frameworks: [...state.frameworks, action.payload]
      };
    case REMOVE_FRAMEWORK:
      const index = state.frameworks.findIndex(b => b._id === action.payload);
      return {
        ...state,
        frameworks: [
          ...state.frameworks.slice(0, index),
          ...state.frameworks.slice(index + 1)
        ]
      };
    case FRAMEWORK_CHANGE:
      return {
        ...state,
        frameworkFormData: {
          ...state.frameworkFormData,
          ...action.payload
        }
      };
    case FRAMEWORK_EDIT_CHANGE:
      return {
        ...state,
        framework: {
          ...state.framework,
          ...action.payload
        }
      };
    case SET_FRAMEWORK_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_FRAMEWORK_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_FRAMEWORKS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_FRAMEWORK:
      return {
        ...state,
        frameworkFormData: {
          name: '',
          description: '',
          isActive: true
        },
        formErrors: {}
      };
    default:
      return state;
  }
};

export default frameworkReducer;
