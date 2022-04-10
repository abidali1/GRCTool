/**
 *
 * actions.js
 * actions configuration
 */

import { bindActionCreators } from 'redux';

import * as application from './containers/Application/actions';
import * as authentication from './containers/Authentication/actions';
import * as homepage from './containers/Homepage/actions';
import * as signup from './containers/Signup/actions';
import * as login from './containers/Login/actions';
import * as forgotPassword from './containers/ForgotPassword/actions';
import * as navigation from './containers/Navigation/actions';
import * as cart from './containers/Cart/actions';
import * as newsletter from './containers/Newsletter/actions';
import * as dashboard from './containers/Dashboard/actions';
import * as account from './containers/Account/actions';
import * as address from './containers/Address/actions';
import * as resetPassword from './containers/ResetPassword/actions';
import * as users from './containers/Users/actions';
import * as control from './containers/Control/actions';
import * as domain from './containers/Domain/actions';
import * as framework from './containers/Framework/actions';
import * as menu from './containers/NavigationMenu/actions';
import * as shop from './containers/Shop/actions';
import * as client from './containers/Client/actions';
import * as regulator from './containers/Regulator/actions';
import * as contact from './containers/Contact/actions';
import * as assessmentprocess from './containers/AssessmentProcess/actions';
import * as order from './containers/Order/actions';
import * as review from './containers/Review/actions';
import * as wishlist from './containers/WishList/actions';
import * as implementer from './containers/Implementer/actions';
import * as externalauditor from './containers/ExternalAuditor/actions';
import * as internalauditor from './containers/InternalAuditor/actions'
export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...application,
      ...authentication,
      ...homepage,
      ...signup,
      ...login,
      ...forgotPassword,
      ...navigation,
      ...assessmentprocess,
      ...cart,
      ...newsletter,
      ...dashboard,
      ...account,
      ...address,
      ...resetPassword,
      ...users,
      ...control,
      ...domain,
      ...framework,
      ...menu,
      ...shop,
      ...client,
      ...regulator,
      ...implementer,
      ...internalauditor,
      ...externalauditor,
      ...contact,
      ...order,
      ...review,
      ...wishlist
    },
    dispatch
  );
}
