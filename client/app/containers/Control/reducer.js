/*
 *
 * Control reducer
 *
 */

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
  SET_CONTROL_SHOP_FORM_ERRORS,
  RESET_CONTROL,
  RESET_CONTROL_SHOP,
  ADD_CONTROL,
  REMOVE_CONTROL,
  FETCH_CONTROLS_SELECT,
  SET_CONTROLS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS
} from './constants';

const initialState = {
  controls: [],
  storeControls: [],
  control: {
    _id: ''
  },
  storeControl: {},
  controlsSelect: [],
  controlFormData: {
    sku: '',
    name: '',
    description: '',
    quantity: 1,
    price: 1,
    image: {},
    isActive: true,
    taxable: { value: 0, label: 'No' },
    framework: {
      value: 0,
      label: 'No Options Selected'
    }
  },
  isLoading: false,
  controlShopData: {
    quantity: 1
  },
  formErrors: {},
  editFormErrors: {},
  shopFormErrors: {},
  advancedFilters: {
    name: 'all',
    category: 'all',
    framework: 'all',
    min: 1,
    max: 500,
    rating: 0,
    order: 0,
    pageNumber: 1,
    pages: 1,
    totalControls: 0
  }
};

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTROLS:
      return {
        ...state,
        controls: action.payload
      };
    case FETCH_STORE_CONTROLS:
      return {
        ...state,
        storeControls: action.payload
      };
    case FETCH_CONTROL:
      return {
        ...state,
        control: action.payload,
        editFormErrors: {}
      };
    case FETCH_STORE_CONTROL:
      return {
        ...state,
        storeControl: action.payload,
        controlShopData: {
          quantity: 1
        },
        shopFormErrors: {}
      };
    case SET_CONTROLS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_CONTROLS_SELECT:
      return { ...state, controlsSelect: action.payload };
    case ADD_CONTROL:
      return {
        ...state,
        controls: [...state.controls, action.payload]
      };
    case REMOVE_CONTROL:
      const index = state.controls.findIndex(b => b._id === action.payload);
      return {
        ...state,
        controls: [
          ...state.controls.slice(0, index),
          ...state.controls.slice(index + 1)
        ]
      };
    case CONTROL_CHANGE:
      return {
        ...state,
        controlFormData: {
          ...state.controlFormData,
          ...action.payload
        }
      };
    case CONTROL_EDIT_CHANGE:
      return {
        ...state,
        control: {
          ...state.control,
          ...action.payload
        }
      };
    case CONTROL_SHOP_CHANGE:
      return {
        ...state,
        controlShopData: {
          ...state.controlShopData,
          ...action.payload
        }
      };
    case SET_CONTROL_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_CONTROL_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_CONTROL_SHOP_FORM_ERRORS:
      return {
        ...state,
        shopFormErrors: action.payload
      };
    case RESET_CONTROL:
      return {
        ...state,
        controlFormData: {
          sku: '',
          name: '',
          description: '',
          quantity: 1,
          price: 1,
          image: {},
          isActive: true,
          taxable: { value: 0, label: 'No' },
          framework: {
            value: 0,
            label: 'No Options Selected'
          }
        },
        control: {
          _id: ''
        },
        formErrors: {}
      };
    case RESET_CONTROL_SHOP:
      return {
        ...state,
        controlShopData: {
          quantity: 1
        },
        shopFormErrors: {}
      };
    case SET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          ...state.advancedFilters,
          ...action.payload
        }
      };
    case RESET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          name: 'all',
          category: 'all',
          framework: 'all',
          min: 1,
          max: 500,
          rating: 0,
          order: 0,
          pageNumber: 1,
          pages: 1,
          totalControls: 0
        }
      };
    default:
      return state;
  }
};

export default controlReducer;
