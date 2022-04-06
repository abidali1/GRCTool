/*
 *
 * Control actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_CONTROLS,
  FETCH_STORE_CONTROLS,
  FETCH_CONTROL,
  FETCH_STORE_CONTROL,
  CONTROL_CHANGE,
  CONTROL_EDIT_CHANGE,
  CONTROL_SHOP_CHANGE,
  SET_CONTROL_FORM_ERRORS,
  SET_CONTROL_FORM_EDIT_ERRORS,
  RESET_CONTROL,
  ADD_CONTROL,
  REMOVE_CONTROL,
  FETCH_CONTROLS_SELECT,
  SET_CONTROLS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS
} from './constants';

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const controlChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: CONTROL_CHANGE,
    payload: formData
  };
};

export const controlEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CONTROL_EDIT_CHANGE,
    payload: formData
  };
};

export const controlShopChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CONTROL_SHOP_CHANGE,
    payload: formData
  };
};

export const resetControl = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_CONTROL });
  };
};

// fetch COTROL api
export const fetchControls = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_CONTROLS_LOADING, payload: true });
      const response = await axios.get(`/api/control`);

      dispatch({
        type: FETCH_CONTROLS,
        payload: response.data.controls
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_CONTROLS_LOADING, payload: false });
    }
  };
};

// fetch store controls by filterContols api
export const filterControls = (n, v) => {
  return async (dispatch, getState) => {
    try {
      n === undefined ? dispatch({ type: RESET_ADVANCED_FILTERS }) : '';

      const s = getState().control.advancedFilters;
      let payload = controlsFilterOrganizer(n, v, s);

      dispatch({ type: SET_ADVANCED_FILTERS, payload });
      dispatch({ type: SET_CONTROLS_LOADING, payload: true });

      const sortOrder = getSortOrder(payload.order);

      payload = { ...payload, sortOrder };

      const response = await axios.post(`/api/control/list`, payload);

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(payload, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalControls: response.data.totalControls
        })
      });
      dispatch({
        type: FETCH_STORE_CONTROLS,
        payload: response.data.controls
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_CONTROLS_LOADING, payload: false });
    }
  };
};

// fetch CONTROL api
export const fetchControl = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/control/${id}`);

      const inventory = response.data.control.quantity;

      const framework = response.data.control.framework;
      const isFramework = framework ? true : false;
      const frameworkData = formatSelectOptions(
        isFramework && [framework],
        !isFramework,
        'fetchControl'
      );

      response.data.control.framework = frameworkData[0];

      const control = { ...response.data.control, inventory };

      dispatch({
        type: FETCH_CONTROL,
        payload: control
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch store control api
export const fetchStoreControl = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_CONTROLS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/control/item/${slug}`);

      const inventory = response.data.control.quantity;
      const control = { ...response.data.control, inventory };

      dispatch({
        type: FETCH_STORE_CONTROL,
        payload: control
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_CONTROLS_LOADING, payload: false });
    }
  };
};

export const fetchFrameworkControls = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_CONTROLS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/control/list/framework/${slug}`);

      const s = getState().control.advancedFilters;
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(s, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalControls: response.data.totalControls
        })
      });
      dispatch({
        type: FETCH_STORE_CONTROLS,
        payload: response.data.controls
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_CONTROLS_LOADING, payload: false });
    }
  };
};

export const fetchControlsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/control/list/select`);

      const formattedControls = formatSelectOptions(response.data.controls);

      dispatch({
        type: FETCH_CONTROLS_SELECT,
        payload: formattedControls
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add control api
export const addControl = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        sku: 'required',
        name: 'required',
        description: 'required|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required',
        image: 'required'
      };

      const control = getState().control.controlFormData;
      const user = getState().account.user;
      const frameworks = getState().framework.frameworksSelect;

      const framework = unformatSelectOptions([control.framework]);

      const newControl = {
        sku: control.sku,
        name: control.name,
        description: control.description,
        price: control.price,
        quantity: control.quantity,
        image: control.image,
        isActive: control.isActive,
        taxable: control.taxable.value,
        framework:
          user.role !== 'ROLE_CLIENT'
            ? framework != 0
              ? framework
              : null
            : frameworks[1].value
      };

      const { isValid, errors } = allFieldsValidation(newControl, rules, {
        'required.sku': 'Sku is required.',
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quantity': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.taxable': 'Taxable is required.',
        'required.image': 'Please upload files with jpg, jpeg, png format.'
      });

      if (!isValid) {
        return dispatch({ type: SET_CONTROL_FORM_ERRORS, payload: errors });
      }
      const formData = new FormData();
      if (newControl.image) {
        for (const key in newControl) {
          if (newControl.hasOwnProperty(key)) {
            if (key === 'framework' && newControl[key] === null) {
              continue;
            } else {
              formData.set(key, newControl[key]);
            }
          }
        }
      }

      const response = await axios.post(`/api/control/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_CONTROL,
          payload: response.data.control
        });
        dispatch(resetControl());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update control api
export const updateControl = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required'
      };

      const control = getState().control.control;

      const framework = unformatSelectOptions([control.framework]);

      const newControl = {
        name: control.name,
        description: control.description,
        quantity: control.quantity,
        price: control.price,
        taxable: control.taxable,
        framework: framework != 0 ? framework : null
      };

      const { isValid, errors } = allFieldsValidation(newControl, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quantity': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.taxable': 'Taxable is required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_CONTROL_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/control/${control._id}`, {
        control: newControl
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        //dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate control api
export const activateControl = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/control/${id}/active`, {
        control: {
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

// delete control api
export const deleteControl = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/control/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_CONTROL,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// TODO: Need improvement
const controlsFilterOrganizer = (n, v, s) => {
  switch (n) {
    case 'domain':
      return {
        name: s.name,
        domain: v,
        framework: s.framework,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: 1 //s.pageNumber
      };
    case 'framework':
      return {
        name: s.name,
        category: s.category,
        framework: v,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber
      };
    case 'sorting':
      return {
        name: s.name,
        domain: s.domain,
        framework: s.framework,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: v,
        pageNumber: s.pageNumber
      };
    case 'price':
      return {
        name: s.name,
        domain: s.domain,
        framework: s.framework,
        min: v[0],
        max: v[1],
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber
      };
    case 'rating':
      return {
        name: s.name,
        domain: s.domain,
        framework: s.framework,
        min: s.min,
        max: s.max,
        rating: v,
        order: s.order,
        pageNumber: s.pageNumber
      };
    case 'pagination':
      return {
        name: s.name,
        domain: s.domain,
        framework: s.framework,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: v
      };
    default:
      return {
        name: s.name,
        domain: s.domain,
        framework: s.framework,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber
      };
  }
};

const getSortOrder = value => {
  let sortOrder = {};
  switch (value) {
    case 0:
      sortOrder._id = -1;
      break;
    case 1:
      sortOrder.price = -1;
      break;
    case 2:
      sortOrder.price = 1;
      break;

    default:
      break;
  }

  return sortOrder;
};
