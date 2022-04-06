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
import InternalAuditorList from '../../components/Manager/InternalAuditorList';

class InternalAuditor extends React.PureComponent {
  componentDidMount() {
    this.props.fetchInternalAuditors();
  }

  render() {
    const {
      internalauditors,
      isLoading,
      approveInternalAuditor,
      rejectInternalAuditor,
      deleteInternalAuditor
    } = this.props;

    return (
      <div className='client-dashboard'>

        <SubPage title={'Internal Auditors'} isMenuOpen={null} />
        {isLoading ? (
          <LoadingIndicator inline />
        ) : internalauditors.length > 0 ? (
          <InternalAuditorList
          internalauditors={internalauditors}
            approveInternalAuditor={approveInternalAuditor}
            rejectInternalAuditor={rejectInternalAuditor}
            deleteInternalAuditor={deleteInternalAuditor}
          />
        ) : (
          <NotFound message='no regulators found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    internalauditors: state.internalauditor.internalauditors,
    isLoading: state.internalauditor.isLoading
  };
};

export default connect(mapStateToProps, actions)(InternalAuditor);
