/*
 *
 * Assigned Implementers To Framework List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AssignedImplementersList from '../../components/Manager/AssignedImplementersList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class AssignedImplementers extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAssignedImplementers();
  }

  render() {
    const {isAssignedImpLoading, assignedImplementers} = this.props;

    return (
      <div className='brand-dashboard'>
        <SubPage title={'Assigned Frameworks'} isMenuOpen={null}>
          {isAssignedImpLoading ? (
            <LoadingIndicator inline />
          ) : assignedImplementers.length > 0 ? (
            <AssignedImplementersList
            assignedImplementers={assignedImplementers}
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
    assignedImplementers: state.implementer.assignedImplementers,
    isAssignedImpLoading: state.implementer.isAssignedImplementerLoading,
  };
};

export default connect(mapStateToProps, actions)(AssignedImplementers);