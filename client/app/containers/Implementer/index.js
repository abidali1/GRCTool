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
import ImplementerList from '../../components/Manager/ImplementerList';

class Implementer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchImplementers();
  }

  render() {
    const {
      implementers,
      isLoading,
      approveImplementer,
      rejectImplementer,
      deleteImplementer
    } = this.props;

    return (
      <div className='client-dashboard'>

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
          <NotFound message='no regulators found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    implementers: state.implementer.implementers,
    isLoading: state.implementer.isLoading
  };
};

export default connect(mapStateToProps, actions)(Implementer);
