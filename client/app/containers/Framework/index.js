/*
 *
 * framework
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';

import List from './List';
import Add from './Add';
import Edit from './Edit';
import View from './View';
import Page404 from '../../components/Common/Page404';

class Framework extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='brand-dashboard'>
        <Switch>
          <Route exact path='/dashboard/framework' component={List} />
          <Route exact path='/dashboard/framework/edit/:id' component={Edit} />
          <Route exact path='/dashboard/framework/:id' component={View} />

          {user.role === 'ROLE_ADMIN' && (
            <Route exact path='/dashboard/framework/add' component={Add} />
          )}
          {/* {user.role === 'ROLE_CLIENT' && (
            <Route exact path='/dashboard/framework/add' component={Add} />
          )} */}
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Framework);
