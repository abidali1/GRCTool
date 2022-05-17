/*
 *
 * Regulator Framework List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import RegulatorFrameworkList from '../../components/Manager/RegulatorFrameworkList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class RegulatorFrameworks extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRegulatorFrameworks();
  }

  render() {
    const {isRFrameworkLoading, rFrameworks} = this.props;

    return (
      <div className='brand-dashboard'>
        <SubPage title={'Regulators Frameworks'} isMenuOpen={null}>
          {isRFrameworkLoading ? (
            <LoadingIndicator inline />
          ) : rFrameworks.length > 0 ? (
            <RegulatorFrameworkList
            rFrameworks={rFrameworks}
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
    rFrameworks: state.regulator.rFrameworks,
    isRFrameworkLoading: state.regulator.isRegulatorFrameworkLoading,
  };
};

export default connect(mapStateToProps, actions)(RegulatorFrameworks);