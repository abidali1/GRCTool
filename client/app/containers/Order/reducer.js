/*
 *
 * Order reducer
 *
 */

import {
  FETCH_ORDERS,
  FETCH_SEARCHED_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS
} from './constants';

const initialState = {
  orders: [],
  searchedOrders: [],
  order: {
    _id: '',
    cartId: '',
    controls: [],
    totalTax: 0,
    total: 0,
    status: ''
  },
  isLoading: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case FETCH_SEARCHED_ORDERS:
      return {
        ...state,
        searchedOrders: action.payload
      };
    case FETCH_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case UPDATE_ORDER_STATUS:
      const itemIndex = state.order.controls.findIndex(
        item => item._id === action.payload.itemId
      );

      const newControls = [...state.order.controls];
      newControls[itemIndex].status = action.payload.status;
      return {
        ...state,
        order: {
          ...state.order,
          controls: newControls
        }
      };
    case SET_ORDERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: []
      };
    default:
      return state;
  }
};

export default orderReducer;
