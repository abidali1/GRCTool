/*
 *
 * Client actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';

export const sellFormChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SELL_FORM_CHANGE,
    payload: formData
  };
};

export const clientSignupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };
};

export const sellWithUs = () => {
  return async (dispatch, getState) => {
    try {
      const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        //telephone need Validation 
      const rules = {
        arabicname: 'required',
        englishname:'required',
        accountsupervisorenglishname :'required',
        accountsupervisorarabicname:'required',
        accountsupervisorid:'required',
        accountsupervisoremail:'required',
        accountsupervisorphoneNumber:'required',
        accountsupervisortelephoneNumber:'required',
        csoenglishname:'required',
        csoarabicname:'required',
        csoid:'required',
        csoemail: 'required',
        csophoneNumber: 'required',
        csotelephoneNumber:'required',
        deputyenglishname:'required',
        deputyarabicname:'required',
        deputyid:'required',
        deputyemail:'required',
        deputyphoneNumber:'required',
        deputytelephoneNumber:'required',
        sector:'required',
        branchnumber:'required',
        website:'required',
        officialemployee:'required',
        contractoremployee:'required',
        city:'required',
        address:'required',
        numdatacenter:'required',
        datacenterlocation:'required',
        appconnected:'required',
        appinternal:'required',
        devicenum:'required',
        // framework: 'required',
        business: 'required'
      };

      const client = getState().client.sellFormData;
      // const frameworks = getState().framework.frameworksSelect;

      // const framework = unformatSelectOptions([regulator.framework]);

      const newClient = {
        arabicname: client.arabicname,
        englishname:client.englishname,
        accountsupervisorenglishname:client.accountsupervisorenglishname,
        accountsupervisorarabicname:client.accountsupervisorarabicname,
        accountsupervisorid:client.accountsupervisorid,
        accountsupervisoremail:client.accountsupervisoremail,
        accountsupervisorphoneNumber:client.accountsupervisorphoneNumber,
        accountsupervisortelephoneNumber:client.accountsupervisorphoneNumber,
        csoenglishname:client.csoenglishname,
        csoarabicname:client.csoarabicname,
        csoid:client.csoid,
        csoemail:client.csoemail,
        csophoneNumber:client.csophoneNumber,
        csotelephoneNumber:client.csotelephoneNumber,
        deputyenglishname:client.deputyenglishname,
        deputyarabicname:client.deputyarabicname,
        deputyid:client.deputyid,
        deputyemail:client.deputyemail,
        deputyphoneNumber:client.deputyphoneNumber,
        deputytelephoneNumber:client.deputytelephoneNumber,
        sector:client.sector,
        branchnumber:client.branchnumber,
        website:client.website,
        officialemployee:client.officialemployee,
        contractoremployee:client.contractoremployee,
        city:client.city,
        address:client.address,
        numdatacenter:client.numdatacenter,
        datacenterlocation:client.datacenterlocation,
        appconnected:client.appconnected,
        appinternal:client.appinternal,
        devicenum:client.devicenum,
        // email: client.email,
        // phoneNumber: client.phoneNumber, //modification
        // framework: unformatSelectOptions(client.framework),
        business: client.business,
      };
      const { isValid, errors } = allFieldsValidation(newClient, rules, {
        'required.name': 'Name is required.',
        'required.email': 'Email is required.',
        'email.email': 'Email format is invalid.',
        'required.phoneNumber': 'Phone number is required.',
        'regex.phoneNumber': 'Phone number format is invalid.',
        'required.framework': 'Framework is required.',
        'accountsupervisorenglishname':'required',
        'accountsupervisorarabicname':'required',
        'accountsupervisorid':'required',
        'accountsupervisoremail':'required',
        'accountsupervisorphoneNumber':'required',
        'accountsupervisortelephoneNumber':'required',

        'required.arabicname':' arabicname is required',
        'required.englishname':'englishname',
        'required.csoenglishname':'csoenglishname',
        'required.csoarabicname':'csoarabicname',
        'required.csoid':'scoid',
        'required.csoemail':'csoemail|email',
        'required.business': 'Business is required.',
        'min.business': 'Business must be at least 10 characters.',
        'required.csophoneNumber':  'Email is required.',
        'regex.csophoneNumber': 'Phone number format is invalid.',
        'required.csotelephoneNumber': 'Email is required.',
        'regex.csotelephoneNumber': 'Phone number format is invalid.',
        'required.deputynglishname':'required',
        'required.deputyarabicname':'required',
        'required.deputyid':'required',
        'required.deputyemail':'required|email',
        'required.deputyphoneNumber':['required',`regex:${phoneno}`],
        'required.deputytelephoneNumber':['required',`regex:${phoneno}`],
        'required.sector':'required',
        'required.branchnumber':'required',
        'required.website':'required',
        'required.officialemployee':'required',
        'required.contractoremployee':'required',
        'required.city':'required',
        'required.address':'required',
        'required.numdatacenter':'required',
        'required.datacenterlocation':'required',
        'required.appconnected':'required',
        'required.appinternal':'required',
        'required.devicenum':'required',
      });

      if (!isValid) {
        return dispatch({ type: SET_SELL_FORM_ERRORS, payload: errors });
      }

      dispatch({ type: SET_SELL_SUBMITTING, payload: true });
      dispatch({ type: SET_SELL_LOADING, payload: true });

      const response = await axios.post(
        '/api/client/seller-request',
        newClient
      );

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch({ type: SELL_FORM_RESET });
      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_SELL_SUBMITTING, payload: false });
      dispatch({ type: SET_SELL_LOADING, payload: false });
    }
  };
};

export const fetchClients = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_CLIENTS_LOADING, payload: true });

      const response = await axios.get(`/api/client/list`);

      dispatch({
        type: FETCH_CLIENTS,
        payload: response.data.clients
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_CLIENTS_LOADING, payload: false });
    }
  };
};

export const approveClient = client => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/client/approve/${client._id}`);

      dispatch(fetchClients());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const rejectClient = client => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/client/reject/${client._id}`);

      dispatch(fetchClients());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const clientSignUp = token => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        firstName: 'required',
        lastName: 'required'
      };

      const client = getState().client.signupFormData;

      const { isValid, errors } = allFieldsValidation(client, rules, {
        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.firstName': 'First Name is required.',
        'required.lastName': 'Last Name is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

      await axios.post(`/api/client/signup/${token}`, client);

      const successfulOptions = {
        title: `You have signed up successfully! Please sign in with the email and password. Thank you!`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(signOut());
      dispatch(success(successfulOptions));
      dispatch(push('/login'));
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      const title = `Please try to signup again!`;
      handleError(error, dispatch, title);
    }
  };
};

// delete client api
export const deleteClient = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/client/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_CLIENTS,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
