/*
 *
 * domain
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';

import List from './List';
import Add from './Add';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';

class Domain extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='domain-dashboard'>
        <Switch>
          <Route exact path='/dashboard/domain' component={List} />
          <Route exact path='/dashboard/domain/edit/:id' component={Edit} />
          {/* {user.role === 'ROLE_ADMIN' && ( */}
          <Route exact path='/dashboard/domain/add' component={Add} />
          {/* )} */}
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

export default connect(mapStateToProps, actions)(Domain);
