/*
 *
 * Domain actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const domainChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: DOMAIN_CHANGE,
    payload: formData
  };
};

export const domainEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: DOMAIN_EDIT_CHANGE,
    payload: formData
  };
};

export const domainSelect = value => {
  return {
    type: DOMAIN_SELECT,
    payload: value
  };
};

export const resetDomain = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_DOMAIN });
  };
};

// fetch store categories api
export const fetchStoreDomains= () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/domain/list`);

      dispatch({
        type: FETCH_STORE_DOMAINS,
        payload: response.data.domains
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch categories api
export const fetchDomains = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_DOMAINS_LOADING, payload: true });
      const response = await axios.get(`/api/domain`);

      dispatch({
        type: FETCH_DOMAINS,
        payload: response.data.domains
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_DOMAINS_LOADING, payload: false });
    }
  };
};

// fetch domain api
export const fetchDomain = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/domain/${id}`);

      response.data.domain.controls = formatSelectOptions(
        response.data.domain.controls
      );

      dispatch({
        type: FETCH_DOMAIN,
        payload: response.data.domain
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add domain api
export const addDomain = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200',
        controls: 'required'
      };

      const domain = getState().domain.domainFormData;

      const newDomain = {
        name: domain.name,
        description: domain.description,
        controls: unformatSelectOptions(domain.controls)
      };

      const { isValid, errors } = allFieldsValidation(newDomain, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.controls': 'controls are required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_DOMAIN_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/domain/add`, newDomain);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_DOMAIN,
          payload: response.data.domain
        });
        dispatch(resetDomain());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update domain api
export const updateDomain = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200',
        controls: 'required'
      };

      const domain = getState().domain.domain;

      const newDomain = {
        name: domain.name,
        description: domain.description,
        controls: domain.controls && unformatSelectOptions(domain.controls)
      };

      const { isValid, errors } = allFieldsValidation(newDomain, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.controls': 'controls are required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_DOMAIN_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/domain/${domain._id}`, {
        domain: newDomain
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(resetDomain());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate domain api
export const activateDomain = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/domain/${id}/active`, {
        domain: {
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

// delete domain api
export const deleteDomain = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/domain/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_DOMAIN,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
