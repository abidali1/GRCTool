/*
 *
 * Framework actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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
  SET_FRAMEWORKS_LOADING,
  RESET_FRAMEWORK
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const frameworkChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: FRAMEWORK_CHANGE,
    payload: formData
  };
};

export const frameworkEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: FRAMEWORK_EDIT_CHANGE,
    payload: formData
  };
};

// fetch store framework api
export const fetchStoreFrameworks = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/framework/list`);

      dispatch({
        type: FETCH_STORE_FRAMEWORKS,
        payload: response.data.frameworks
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch frameworks api
export const fetchFrameworks = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_FRAMEWORKS_LOADING, payload: true });

      const response = await axios.get(`/api/framework`);
      
      dispatch({
        type: FETCH_FRAMEWORKS,
        payload: response.data.frameworks
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_FRAMEWORKS_LOADING, payload: false });
    }
  };
};

// fetch framework api
export const fetchFramework = frameworkId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/framework/${frameworkId}`);

      dispatch({
        type: FETCH_FRAMEWORK,
        payload: response.data.framework
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch framework select api
export const fetchFrameworksSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/framework/list/select`);

      const formattedFrameworks = formatSelectOptions(response.data.frameworks, true);

      dispatch({
        type: FETCH_FRAMEWORKS_SELECT,
        payload: formattedFrameworks
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add framework api
export const addFramework = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200'
      };

      const framework = getState().framework.frameworkFormData;

      const { isValid, errors } = allFieldsValidation(framework, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_FRAMEWORK_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/framework/add`, framework);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_FRAMEWORK,
          payload: response.data.framework
        });

        dispatch(goBack());
        dispatch({ type: RESET_FRAMEWORK });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update framework api
export const updateFramework = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200'
      };

      const framework = getState().framework.framework;

      const newFramework = {
        name: framework.name,
        description: framework.description
      };

      const { isValid, errors } = allFieldsValidation(newFramework, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_FRAMEWORK_FORM_EDIT_ERRORS, payload: errors });
      }

      const response = await axios.put(`/api/framework/${framework._id}`, {
        framework: newFramework
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate framework api
export const activateFramework = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/framework/${id}/active`, {
        framework: {
          isActive: value
        }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete framework api
export const deleteFramework = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/framework/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_FRAMEWORK,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
