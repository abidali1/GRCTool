import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_REGULATORS,
  REMOVE_REGULATORS,
  REGULATOR_FORM_CHANGE,
  SET_REGULATOR_FORM_ERRORS,
  REGULATOR_FORM_RESET,
  SET_REGULATOR_FRAMEWORKS_LOADING,
  SIGNUP_CHANGE,
  FETCH_REGULATOR_FRAMEWORKS,
  SET_SIGNUP_FORM_ERRORS,
  SET_REGULATORS_LOADING,
  SET_REGULATOR_SUBMITTING,
  SET_REGULATOR_LOADING,
  SIGNUP_RESET
} from './constants';

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';

export const regulatorFormChange = (name, value) => {

  let formData = {};
  formData[name] = value;

  return {
    type: REGULATOR_FORM_CHANGE,
    payload: formData
  };

};

export const regulatorSignupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };

};

export const regWithUs = () => {
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

      const regulator = getState().regulator.regulatorFormData;
    //  const user = getState().account.user;
      const frameworks = getState().framework.frameworksSelect;

      const framework = unformatSelectOptions([regulator.framework]);

      const newRegulator = {
        name: regulator.name,
        email: regulator.email,
        phoneNumber: regulator.phoneNumber, //modification
        framework: unformatSelectOptions(regulator.framework),
        business: regulator.business,
      };

 

      const { isValid, errors } = allFieldsValidation(newRegulator, rules, {
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
        return dispatch({ type: SET_REGULATOR_FORM_ERRORS, payload: errors });
      }

 

      dispatch({ type: SET_REGULATOR_SUBMITTING, payload: true });
      dispatch({ type: SET_REGULATOR_LOADING, payload: true });

 

      const response = await axios.post(
        '/api/regulator/regulator-request',
        newRegulator
      );

 

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

 

      dispatch({ type: REGULATOR_FORM_RESET });
      dispatch(success(successfulOptions));

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_REGULATOR_SUBMITTING, payload: false });
      dispatch({ type: SET_REGULATOR_LOADING, payload: false });
    }
  };
};

 

export const fetchRegulators = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_REGULATORS_LOADING, payload: true });
      const response = await axios.get(`/api/regulator/list`);

      dispatch({
        type: FETCH_REGULATORS,
        payload: response.data.regulators
      });

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_REGULATORS_LOADING, payload: false });
    }

  };

};

export const fetchRegulatorFrameworks = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_REGULATOR_FRAMEWORKS_LOADING, payload: true });
//connect to the API
      const response = await axios.get(`/api/regulator/regulatorFrameworks`);
      
      dispatch({
        type: FETCH_REGULATOR_FRAMEWORKS,
        payload: response.data.rFrameworks
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_REGULATOR_FRAMEWORKS_LOADING, payload: false });
    }
  };
};

export const approveRegulator = regulator => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/regulator/approve/${regulator._id}`);
      dispatch(fetchRegulators());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const rejectRegulator = regulator => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/regulator/reject/${regulator._id}`);
      dispatch(fetchRegulators());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

 

export const regulatorSignUp = token => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        firstName: 'required',
        lastName: 'required'
      };

 

      const regulator = getState().regulator.signupFormData;
      const { isValid, errors } = allFieldsValidation(regulator, rules, {

        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.firstName': 'First Name is required.',
        'required.lastName': 'Last Name is required.'
      });

 

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

 

      await axios.post(`/api/regulator/signup/${token}`, regulator);

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

export const deleteRegulator = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/regulator/delete/${id}`);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
       autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_REGULATORS,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};