/*
 *
 * reducers.js
 * reducers configuration
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notifications } from 'react-notification-system-redux';

// import reducers
import applicationReducer from './containers/Application/reducer';
import homepageReducer from './containers/Homepage/reducer';
import signupReducer from './containers/Signup/reducer';
import loginReducer from './containers/Login/reducer';
import forgotPasswordReducer from './containers/ForgotPassword/reducer';
import navigationReducer from './containers/Navigation/reducer';
import authenticationReducer from './containers/Authentication/reducer';
import cartReducer from './containers/Cart/reducer';
import newsletterReducer from './containers/Newsletter/reducer';
import dashboardReducer from './containers/Dashboard/reducer';
import accountReducer from './containers/Account/reducer';
import addressReducer from './containers/Address/reducer';
import resetPasswordReducer from './containers/ResetPassword/reducer';
import usersReducer from './containers/Users/reducer';
import controlReducer from './containers/Control/reducer';
import domainReducer from './containers/Domain/reducer';
import frameworkReducer from './containers/Framework/reducer';
import navigationMenuReducer from './containers/NavigationMenu/reducer';
import shopReducer from './containers/Shop/reducer';
import clientReducer from './containers/Client/reducer';
import regulatorReducer from './containers/Regulator/reducer'
import contactReducer from './containers/Contact/reducer';
import orderReducer from './containers/Order/reducer';
import reviewReducer from './containers/Review/reducer';
import wishListReducer from './containers/WishList/reducer';
import implementer from './containers/Implementer/reducer';
import implementerReducer from './containers/Implementer/reducer';
import externalauditorReducer from './containers/ExternalAuditor/reducer';
import internalauditorReducer from './containers/InternalAuditor/reducer';
const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    application: applicationReducer,
    homepage: homepageReducer,
    signup: signupReducer,
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    navigation: navigationReducer,
    authentication: authenticationReducer,
    cart: cartReducer,
    newsletter: newsletterReducer,
    dashboard: dashboardReducer,
    account: accountReducer,
    address: addressReducer,
    resetPassword: resetPasswordReducer,
    users: usersReducer,
    control: controlReducer,
    domain: domainReducer,
    framework: frameworkReducer,
    menu: navigationMenuReducer,
    shop: shopReducer,
    client: clientReducer,
    regulator:regulatorReducer,
    implementer:implementerReducer,
    externalauditor:externalauditorReducer,
    internalauditor:internalauditorReducer,
    contact: contactReducer,
    order: orderReducer,
    review: reviewReducer,
    wishlist: wishListReducer
  });

export default createReducer;
