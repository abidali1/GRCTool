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
import RegulatorList from '../../components/Manager/RegulatorList';

class Regulator extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRegulators();
  }

  render() {
    const {
      regulators,
      isLoading,
      approveRegulator,
      rejectRegulator,
      deleteRegulator
    } = this.props;

    return (
      <div className='client-dashboard'>

        <SubPage title={'Regulators'} isMenuOpen={null} />
        {isLoading ? (
          <LoadingIndicator inline />
        ) : regulators.length > 0 ? (
          <RegulatorList
            regulators={regulators}
            approveRegulator={approveRegulator}
            rejectRegulator={rejectRegulator}
            deleteRegulator={deleteRegulator}
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
    regulators: state.regulator.regulators,
    isLoading: state.regulator.isLoading
  };
};

export default connect(mapStateToProps, actions)(Regulator);
