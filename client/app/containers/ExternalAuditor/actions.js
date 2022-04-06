import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';

export const ExternalAuditorFormChange = (name, value) => {

  let formData = {};
  formData[name] = value;

  return {
    type: EXTERNALAUDITOR_FORM_CHANGE,
    payload: formData
  };

};

export const externalauditorSignupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };
};

export const ExtAuditForUs = () => {
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

      const externalauditor = getState().externalauditor.externalauditorFormData;
    //  const user = getState().account.user;
      const frameworks = getState().framework.frameworksSelect;

      const framework = unformatSelectOptions([externalauditor.framework]);

      const newexternalauditor = {
        name: externalauditor.name,
        email: externalauditor.email,
        phoneNumber: externalauditor.phoneNumber, //modification
        // framework: unformatSelectOptions(implementer.framework),
        framework: externalauditor.framework,//temp solution 
        business: externalauditor.business,
      };

 

      const { isValid, errors } = allFieldsValidation(newexternalauditor, rules, {
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
        return dispatch({ type: SET_EXTERNALAUDITOR_FORM_ERRORS, payload: errors });
      }

 

      dispatch({ type: SET_EXTERNALAUDITOR_SUBMITTING, payload: true });
      dispatch({ type: SET_EXTERNALAUDITOR_LOADING, payload: true });

 

      const response = await axios.post(
        '/api/externalauditor/externalauditor-request',
        newexternalauditor
      );

 

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

 

      dispatch({ type: EXTERNALAUDITOR_FORM_RESET });
      dispatch(success(successfulOptions));

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_EXTERNALAUDITOR_SUBMITTING, payload: false });
      dispatch({ type: SET_EXTERNALAUDITOR_LOADING, payload: false });
    }
  };
};

 

export const fetchExternalAuditors = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_EXTERNALAUDITORS_LOADING, payload: true });
      const response = await axios.get(`/api/externalauditor/list`);

      dispatch({
        type: FETCH_EXTERNALAUDITORS ,
        payload: response.data.externalauditors
      });

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_EXTERNALAUDITORS_LOADING, payload: false });
    }

  };

};

 

export const approveExternalAuditor = externalauditor => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/externalauditor/approve/${externalauditor._id}`);
      dispatch(fetchExternalAuditors());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const rejectExternalAuditor = externalauditor => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/externalauditor/reject/${externalauditor._id}`);
      dispatch(fetchExternalAuditors());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const externalauditorSignUp = token => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        firstName: 'required',
        lastName: 'required'
      };

 

      const externalauditor = getState().externalauditor.signupFormData;
      const { isValid, errors } = allFieldsValidation(externalauditor, rules, {

        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.firstName': 'First Name is required.',
        'required.lastName': 'Last Name is required.'
      });

 

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

 

      await axios.post(`/api/externalauditor/signup/${token}`, externalauditor);

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

export const deleteExternalAuditor = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/externalauditor/delete/${id}`);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
       autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_EXTERNALAUDITORS,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};