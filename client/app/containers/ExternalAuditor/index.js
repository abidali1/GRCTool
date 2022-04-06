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
import ExternalAuditorList from '../../components/Manager/ExternalAuditorList';
import InternalAuditorList from '../../components/Manager/InternalAuditorList';
import ImplementerList from '../../components/Manager/ImplementerList'
class ExternalAuditor extends React.PureComponent {
  componentDidMount() {
    this.props.fetchExternalAuditors();
    this.props.fetchInternalAuditors();
    this.props.fetchImplementers();
  }

  render() {
    const {
      externalauditors,
      internalauditors,
      implementers,
      isLoading,
      approveInternalAuditor,
      rejectInternalAuditor,
      deleteInternalAuditor,
      approveImplementer,
      rejectImplementer,
      deleteImplementer,
      approveExternalAuditor,
      rejectExternalAuditor,
      deleteExternalAuditor,

    } = this.props;

    return (
      <div className='client-dashboard'>

        <SubPage title={'External Auditor'} isMenuOpen={null} />
        {isLoading ? (
          <LoadingIndicator inline />
        ) : externalauditors.length > 0 ? (
          <ExternalAuditorList
            externalauditors={externalauditors}
            approveExternalAuditor={approveExternalAuditor}
            rejectExternalAuditor={rejectExternalAuditor}
            deleteExternalAuditor={deleteExternalAuditor}
          />
        ) : (
          <NotFound message='no external auditors found.' />
        )}
        <SubPage title={'Internal Auditor'} isMenuOpen={null} />
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
          <NotFound message='no internal auditors found.' />
        )}
                <SubPage title={'Implementers'} isMenuOpen={null} />
        {isLoading ? (
          <LoadingIndicator inline />
        ) : implementers.length > 0 ? (
          <ImplementerList
            implementers={implementers}
            approveImplementer={approveImplementer}
            rejectImplementer={rejectImplementer}
            deleteImplementer={deleteImplementer}
          />
        ) : (
          <NotFound message='no implementers found.' />
        )}
      </div>

    );
  }
}


const mapStateToProps = state => {
  return {
    externalauditors: state.externalauditor.externalauditors,
    internalauditors:state.internalauditor.internalauditors,
    implementers: state.implementer.implementers,
    isLoading: state.implementer.isLoading,
    isLoading:state.internalauditor.isLoading,
    isLoading: state.externalauditor.isLoading
  };
};

export default connect(mapStateToProps, actions)(ExternalAuditor);
