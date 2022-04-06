/*
 *
 * Framework List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import FrameworkList from '../../components/Manager/FrameworkList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFrameworks();
  }



  render() {
    const { history, frameworks, isLoading, user} = this.props;

    return (
      <>
        <SubPage
          title={user.role === 'ROLE_ADMIN'||'ROLE_CLIENT'||'ROLE_REGULATOR' ? 'Frameworks' : 'Framework'}
          actionTitle={user.role === 'ROLE_ADMIN' && 'Add'}
          handleAction={() => history.push('/dashboard/framework/add')}
        >
          {isLoading && user.role === 'ROLE_ADMIN' ? (
            <LoadingIndicator inline />
          ) : frameworks.length > 0 ? (
            <FrameworkList frameworks={frameworks} user={user}  />
          ) : (
            <NotFound message='no frameworks found.' />
          )} 
       
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    frameworks: state.framework.frameworks,
    isLoading: state.framework.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
