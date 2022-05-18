/*
 *
 * Regulator
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import ImplementerFrameworkList from '../../components/Manager/ImplementerFrameworkList';

class ImplementerDashboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchImplementerframeworks();
  }

  render() {
    const {
      frameworks,
      // user,
      isLoading
    } = this.props;

    return (
<div className='brand-dashboard'>
        <SubPage title={'Implementer Dashboard'} isMenuOpen={null}>
          {isLoading ? (
            <LoadingIndicator inline />
          ) : frameworks.length > 0 ? (
            <ImplementerFrameworkList
            frameworks={frameworks}
            />
          ) : (
            <NotFound message='nothing found.' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    frameworks: state.implementer.frameworks,
    isLoading: state.implementer.isLoading
  };
};

export default connect(mapStateToProps, actions)(ImplementerDashboard);
