/*
 *
 * Domain reducer
 *
 */

import {
  FETCH_DOMAINS,
  FETCH_STORE_DOMAINS,
  FETCH_DOMAIN,
  DOMAIN_CHANGE,
  DOMAIN_EDIT_CHANGE,
  SET_DOMAIN_FORM_ERRORS,
  SET_DOMAIN_FORM_EDIT_ERRORS,
  ADD_DOMAIN,
  REMOVE_DOMAIN,
  SET_DOMAINS_LOADING,
  RESET_DOMAIN
} from './constants';

const initialState = {
  domains: [],
  storeDomains: [],
  domain: {
    _id: ''
  }, 
  domainFormData: {
    name: '',
    description: '',
    controls: [],
    isActive: true
  },
  formErrors: {},
  editFormErrors: {},
  isLoading: false
};

const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOMAINS:
      return {
        ...state,
        domains: action.payload
      };
    case FETCH_STORE_DOMAINS:
      return {
        ...state,
        storeDomains: action.payload
      };
    case FETCH_DOMAIN:
      return {
        ...state,
        domain: action.payload
      };
    case ADD_DOMAIN:
      return {
        ...state,
        domains: [...state.domains, action.payload]
      };
    case REMOVE_DOMAIN:
      const index = state.domains.findIndex(b => b._id === action.payload);
      return {
        ...state,
        domains: [
          ...state.domains.slice(0, index),
          ...state.domains.slice(index + 1)
        ]
      };
    case DOMAIN_CHANGE:
      return {
        ...state,
        domainFormData: { ...state.domainFormData, ...action.payload }
      };
    case DOMAIN_EDIT_CHANGE:
      return {
        ...state,
        domain: {
          ...state.domain,
          ...action.payload
        }
      };
    case SET_DOMAIN_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_DOMAIN_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_DOMAINS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_DOMAIN:
      return {
        ...state,
        domainFormData: {
          name: '',
          description: '',
          controls: [],
          isActive: true
        },
        domain: {
          _id: ''
        },
        formErrors: {},
        editFormErrors: {}
      };
    default:
      return state;
  }
};

export default domainReducer;
