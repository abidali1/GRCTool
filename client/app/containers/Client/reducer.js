/*
 *
 * Client reducer
 *
 */

import {
  FETCH_CLIENTS,
  REMOVE_CLIENTS,
  SELL_FORM_CHANGE,
  SET_SELL_FORM_ERRORS,
  SELL_FORM_RESET,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_CLIENTS_LOADING,
  SET_SELL_SUBMITTING,
  SET_SELL_LOADING,
  SIGNUP_RESET
} from './constants';

const initialState = {
  clients: [],
  sellFormData: {
    // framework: [],
    business: '',
    arabicname:'',
    englishname:'',
    accountsupervisorenglishname :'',
    accountsupervisorarabicname:'',
    accountsupervisorid:'',
    accountsupervisoremail:'',
    accountsupervisorphoneNumber:'',
    accountsupervisortelephoneNumber:'',
    csoenglishname:'',
    csoarabicname:'',
    csoid:'',
    csoemail:'',
    csophoneNumber:'',
    csotelephoneNumber:'',
    deputyenglishname:'',
    deputyarabicname:'',
    deputyid:'',
    deputyemail:'',
    deputyphoneNumber:'',
    deputytelephoneNumber:'',
    sector:'',
    branchnumber:'',
    website:'',
    officialemployee:'',
    contractoremployee:'',
    city:'',
    address:'',
    numdatacenter:'',
    datacenterlocation:'',
    appconnected:'',
    appinternal:'',
    devicenum:'',
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
  isSellSubmitting: false,
  isSellLoading: false
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };
    case REMOVE_CLIENTS:
      const index = state.clients.findIndex(b => b._id === action.payload);
      return {
        ...state,
        clients: [
          ...state.clients.slice(0, index),
          ...state.clients.slice(index + 1)
        ]
      };
    case SELL_FORM_CHANGE:
      return {
        ...state,
        sellFormData: { ...state.sellFormData, ...action.payload }
      };
    case SET_SELL_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SELL_FORM_RESET:
      return {
        ...state,
        sellFormData: {
    // framework: [],
    business: '',
    arabicname:'',
    englishname:'',
    accountsupervisorenglishname :'',
    accountsupervisorarabicname:'',
    accountsupervisorid:'',
    accountsupervisoremail:'',
    accountsupervisorphoneNumber:'',
    accountsupervisortelephoneNumber:'',
    csoenglishname:'',
    csoarabicname:'',
    csoid:'',
    csoemail:'',
    csophoneNumber:'',
    csotelephoneNumber:'',
    deputynglishname:'',
    deputyarabicname:'',
    deputyid:'',
    deputyemail:'',
    deputyphoneNumber:'',
    deputytelephoneNumber:'',
    sector:'',
    branchnumber:'',
    website:'',
    officialemployee:'',
    contractoremployee:'',
    city:'',
    address:'',
    numdatacenter:'',
    datacenterlocation:'',
    appconnected:'',
    appinternal:'',
    devicenum:'',
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
    case SET_CLIENTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_SELL_SUBMITTING:
      return {
        ...state,
        isSellSubmitting: action.payload
      };
    case SET_SELL_LOADING:
      return {
        ...state,
        isSellLoading: action.payload
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

export default clientReducer;
