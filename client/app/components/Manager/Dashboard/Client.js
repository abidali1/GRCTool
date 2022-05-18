/*
 *
 * Customer
 *
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Address from '../../../containers/Address';
import Control from '../../../containers/Control';
import Framework from '../../../containers/Framework';
import Order from '../../../containers/Order';
import Wishlist from '../../../containers/WishList';
import Support from '../../../containers/Support';
import FrameworkToImplement from '../../../containers/FrameworkToImplement';
import Implementer from '../../../containers/Implementer'
import Implement from '../../../containers/Implement';
import ExternalAuditor from '../../../containers/ExternalAuditor';
import ExtAudit from '../../../containers/ExtAudit';
import InternalAuditor from '../../../containers/InternalAuditor';
import IntAudit from '../../../containers/IntAudit'
const Customer = props => {
  return (
    <div className='client'>
      <Row>
        <Col xs='12' md='5' xl='3'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='9'>
          <div className='panel-body'>
            <Switch>
              <Route exact path='/dashboard' component={Account} />
              <Route path='/dashboard/security' component={AccountSecurity} />
              {/* <Route path='/dashboard/address' component={Address} /> */}
              <Route path='/dashboard/control' component={Control} />
              <Route path='/dashboard/framework' component={Framework} />
              {/* <Route path='/dashboard/orders' component={Order} />
              <Route path='/dashboard/wishlist' component={Wishlist} /> */}
              <Route path='/dashboard/support' component={Support} />
              {/* <Route path='/dashboard/implementer' component={Implementer} /> */}
              <Route path='/dashboard/addimplementer' component={Implement} />
              <Route path='/dashboard/startimplementaion' component={FrameworkToImplement}/>
              {/* <Route path='/dashboard/internalauditor' component={InternalAuditor} /> */}
              <Route path='/dashboard/addinternalauditor' component={IntAudit} />
              <Route path='/dashboard/registeredaccount' component={ExternalAuditor} />
              <Route path='/dashboard/addexternalauditor' component={ExtAudit} />
              <Route path='*' component={Page404} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
