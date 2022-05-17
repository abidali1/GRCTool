import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_IMPLEMENTERS,
  REMOVE_IMPLEMENTERS,
  FETCH_IMPLEMENTERS_SELECT,
  IMPLEMENTER_FORM_CHANGE,
  SET_IMPLEMENTER_FORM_ERRORS,
  IMPLEMENTER_FORM_RESET,
  SIGNUP_CHANGE,
  SET_ASSIGNED_IMPLEMENTERS_LOADING,
  FETCH_IMPLEMENTERS_FRAMEWORKS,
  SET_SIGNUP_FORM_ERRORS,
  SET_IMPLEMENTERS_LOADING,
  SET_IMPLEMENTER_SUBMITTING,
  SET_IMPLEMENTER_LOADING,
  SIGNUP_RESET
} from './constants';

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';

export const ImplementerFormChange = (name, value) => {

  let formData = {};
  formData[name] = value;

  return {
    type: IMPLEMENTER_FORM_CHANGE,
    payload: formData
  };

};

export const implementerSignupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };
};

export const implementForUs = () => {
  return async (dispatch, getState) => {
    try {
      const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const rules = {
        name: 'required',
        email: 'required|email',
        phoneNumber: ['required', `regex:${phoneno}`],
       // framework: 'required',
        business: 'required|min:10'
      };

      const implementer = getState().implementer.implementerFormData;
    //  const user = getState().account.user;
    //  const frameworks = getState().framework.frameworksSelect;

    //  const framework = unformatSelectOptions([implementer.framework]);

      const newImplementer = {
        name: implementer.name,
        email: implementer.email,
        phoneNumber: implementer.phoneNumber, //modification
        // framework: unformatSelectOptions(implementer.framework),
       // framework: implementer.framework,//temp solution 
        business: implementer.business,
      };

 

      const { isValid, errors } = allFieldsValidation(newImplementer, rules, {
        'required.name': 'Name is required.',
        'required.email': 'Email is required.',
        'email.email': 'Email format is invalid.',
        'required.phoneNumber': 'Phone number is required.',
        'regex.phoneNumber': 'Phone number format is invalid.',
       // 'required.framework': 'Framework is required.',
        'required.business': 'Business is required.',
        'min.business': 'Business must be at least 10 characters.'
      });

 

      if (!isValid) {
        return dispatch({ type: SET_IMPLEMENTER_FORM_ERRORS, payload: errors });
      }

 

      dispatch({ type: SET_IMPLEMENTER_SUBMITTING, payload: true });
      dispatch({ type: SET_IMPLEMENTER_LOADING, payload: true });

 

      const response = await axios.post(
        '/api/implementer/implementer-request',
        newImplementer
      );

 

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

 

      dispatch({ type: IMPLEMENTER_FORM_RESET });
      dispatch(success(successfulOptions));

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_IMPLEMENTER_SUBMITTING, payload: false });
      dispatch({ type: SET_IMPLEMENTER_LOADING, payload: false });
    }
  };
};

 

export const fetchImplementers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_IMPLEMENTERS_LOADING, payload: true });
      const response = await axios.get(`/api/implementer/list`);

      dispatch({
        type: FETCH_IMPLEMENTERS ,
        payload: response.data.implementers
      });

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_IMPLEMENTERS_LOADING, payload: false });
    }

  };

};

export const fetchImplementersSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/implementer/list/select`);

      const formattedImplementers = formatSelectOptions(response.data.implementers, true);

      dispatch({
        type: FETCH_IMPLEMENTERS_SELECT,
        payload: formattedImplementers
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// --NEW--
export const fetchAssignedImplementers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_ASSIGNED_IMPLEMENTERS_LOADING, payload: true });
//connect to the API
      const response = await axios.get(`/api/implementer/assignedImplementers`);
      
      dispatch({
        type: FETCH_IMPLEMENTERS_FRAMEWORKS,
        payload: response.data.assignedImplementers
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_ASSIGNED_IMPLEMENTERS_LOADING, payload: false });
    }
  };
};


export const approveImplementer = implementer => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/implementer/approve/${implementer._id}`);
      dispatch(fetchImplementers());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const rejectImplementer = implementer => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/implementer/reject/${implementer._id}`);
      dispatch(fetchImplementers());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const implementerSignUp = token => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        firstName: 'required',
        lastName: 'required'
      };

 

      const implementer = getState().implementer.signupFormData;
      const { isValid, errors } = allFieldsValidation(implementer, rules, {

        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.firstName': 'First Name is required.',
        'required.lastName': 'Last Name is required.'
      });

 

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

 

      await axios.post(`/api/implementer/signup/${token}`, implementer);

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

export const deleteImplementer = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/implementer/delete/${id}`);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
       autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_IMPLEMENTERS,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};