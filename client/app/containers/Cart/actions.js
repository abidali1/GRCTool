/*
 *
 * Cart actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  HANDLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL,
  SET_CART_ID,
  CLEAR_CART
} from './constants';

import {
  SET_CONTROL_SHOP_FORM_ERRORS,
  RESET_CONTROL_SHOP
} from '../Control/constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { toggleCart } from '../Navigation/actions';

// Handle Add To Cart
export const handleAddToCart = control => {
  return (dispatch, getState) => {
    control.quantity = Number(getState().control.controlShopData.quantity);
    control.totalPrice = control.quantity * control.price;
    control.totalPrice = parseFloat(control.totalPrice.toFixed(2));
    const inventory = getState().control.storeControls.inventory;

    const result = calculatePurchaseQuantity(inventory);

    const rules = {
      quantity: `min:1|max:${result}`
    };

    const { isValid, errors } = allFieldsValidation(control, rules, {
      'min.quantity': 'Quantity must be at least 1.',
      'max.quantity': `Quantity may not be greater than ${result}.`
    });

    if (!isValid) {
      return dispatch({ type: SET_CONTROL_SHOP_FORM_ERRORS, payload: errors });
    }

    dispatch({
      type: RESET_CONTROL_SHOP
    });

    dispatch({
      type: ADD_TO_CART,
      payload: control
    });
    dispatch(calculateCartTotal());
    dispatch(toggleCart());
  };
};

// Handle Remove From Cart
export const handleRemoveFromCart = control => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: control
    });
    dispatch(calculateCartTotal());
    // dispatch(toggleCart());
  };
};

export const calculateCartTotal = () => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.cartItems;

    let total = 0;

    cartItems.map(item => {
      total += item.price * item.quantity;
    });

    total = parseFloat(total.toFixed(2));

    dispatch({
      type: HANDLE_CART_TOTAL,
      payload: total
    });
  };
};

// set cart store from cookie
export const handleCart = () => {
  const cart = {
    cartItems: JSON.parse(localStorage.getItem('cart_items')),
    itemsInCart: JSON.parse(localStorage.getItem('items_in_cart')),
    cartTotal: localStorage.getItem('cart_total'),
    cartId: localStorage.getItem('cart_id')
  };

  return (dispatch, getState) => {
    if (cart.cartItems != undefined || cart.itemsInCart != undefined) {
      dispatch({
        type: HANDLE_CART,
        payload: cart
      });
    }
  };
};

export const handleCheckout = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `Please Login to proceed to checkout`,
      position: 'tr',
      autoDismiss: 1
    };

    dispatch(toggleCart());
    dispatch(push('/login'));
    dispatch(success(successfulOptions));
  };
};

// Continue shopping use case
export const handleShopping = () => {
  return (dispatch, getState) => {
    dispatch(push('/shop'));
    dispatch(toggleCart());
  };
};

// create cart id api
export const getCartId = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const cartItems = getState().cart.cartItems;
      const controls = getCartItems(cartItems);

      // create cart id if there is no one
      if (!cartId) {
        const response = await axios.post(`/api/cart/add`, { controls });

        dispatch(setCartId(response.data.cartId));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const setCartId = cartId => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_CART_ID,
      payload: cartId
    });
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    localStorage.removeItem('cart_items');
    localStorage.removeItem('items_in_cart');
    localStorage.removeItem('cart_total');
    localStorage.removeItem('cart_id');

    dispatch({
      type: CLEAR_CART
    });
  };
};

const getCartItems = cartItems => {
  const newCartItems = [];
  cartItems.map(item => {
    const newItem = {};
    newItem.quantity = item.quantity;
    newItem.price = item.price;
    newItem.taxable = item.taxable;
    newItem.control = item._id;
    newCartItems.push(newItem);
  });

  return newCartItems;
};

const calculatePurchaseQuantity = inventory => {
  if (inventory <= 25) {
    return 1;
  } else if (inventory > 25 && inventory <= 100) {
    return 5;
  } else if (inventory > 100 && inventory < 500) {
    return 25;
  } else {
    return 50;
  }
};
