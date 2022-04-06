import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';

export const InternalAuditorFormChange = (name, value) => {

  let formData = {};
  formData[name] = value;

  return {
    type: INTERNALAUDITOR_FORM_CHANGE,
    payload: formData
  };

};

export const internalauditorSignupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };
};

export const IntAuditForUs = () => {
  return async (dispatch, getState) => {
    try {
      const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const rules = {
        name: 'required',
        email: 'required|email',
        phoneNumber: ['required', `regex:${phoneno}`],
        framework: 'required',
        business: 'required|min:10'
      };

      const internalauditor = getState().internalauditor.internalauditorFormData;
    //  const user = getState().account.user;
      const frameworks = getState().framework.frameworksSelect;

      const framework = unformatSelectOptions([internalauditor.framework]);

      const newInternalAuditor = {
        name: internalauditor.name,
        email: internalauditor.email,
        phoneNumber: internalauditor.phoneNumber, //modification
        // framework: unformatSelectOptions(implementer.framework),
        framework: internalauditor.framework,//temp solution 
        business: internalauditor.business,
      };

 

      const { isValid, errors } = allFieldsValidation(newInternalAuditor, rules, {
        'required.name': 'Name is required.',
        'required.email': 'Email is required.',
        'email.email': 'Email format is invalid.',
        'required.phoneNumber': 'Phone number is required.',
        'regex.phoneNumber': 'Phone number format is invalid.',
        'required.framework': 'Framework is required.',
        'required.business': 'Business is required.',
        'min.business': 'Business must be at least 10 characters.'
      });

 

      if (!isValid) {
        return dispatch({ type: SET_INTERNALAUDITOR_FORM_ERRORS, payload: errors });
      }

 

      dispatch({ type: SET_INTERNALAUDITOR_SUBMITTING, payload: true });
      dispatch({ type: SET_INTERNALAUDITOR_LOADING, payload: true });

 

      const response = await axios.post(
        '/api/internalauditor/internalauditor-request',
        newInternalAuditor
      );

 

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

 

      dispatch({ type: INTERNALAUDITOR_FORM_RESET });
      dispatch(success(successfulOptions));

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_INTERNALAUDITOR_SUBMITTING, payload: false });
      dispatch({ type: SET_INTERNALAUDITOR_LOADING, payload: false });
    }
  };
};

 

export const fetchInternalAuditors = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_INTERNALAUDITORS_LOADING, payload: true });
      const response = await axios.get(`/api/internalauditor/list`);

      dispatch({
        type: FETCH_INTERNALAUDITORS ,
        payload: response.data.internalauditors
      });

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_INTERNALAUDITORS_LOADING, payload: false });
    }

  };

};

 

export const approveInternalAuditor = internalauditor => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/internalauditor/approve/${internalauditor._id}`);
      dispatch(fetchInternalAuditors());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const rejectInternalAuditor = internalauditor => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/internalauditor/reject/${internalauditor._id}`);
      dispatch(fetchInternalAuditors());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const internalauditorSignUp = token => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        firstName: 'required',
        lastName: 'required'
      };

 

      const internalauditor = getState().internalauditor.signupFormData;
      const { isValid, errors } = allFieldsValidation(internalauditor, rules, {

        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.firstName': 'First Name is required.',
        'required.lastName': 'Last Name is required.'
      });

 

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

 

      await axios.post(`/api/internalauditor/signup/${token}`, internalauditor);

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

 

// delete regulator api

export const deleteInternalAuditor = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/internalauditor/delete/${id}`);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
       autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_INTERNALAUDITORS,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};