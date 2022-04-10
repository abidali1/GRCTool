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

class AssessmentProcess extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchAssessments();
  }

  render() {
    const {
      assessments,
      isLoading,
    } = this.props;

    return (
      <div className='client-dashboard'>

        {/* <SubPage title={'Regulators'} isMenuOpen={null} /> */}
        {/* {isLoading ? (
          <LoadingIndicator inline />
        ) : implementers.length > 0 ? (
          <RegulatorList
            assessments={assessments}
          />
        ) : (
          <NotFound message='no regulators found.' />
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    implementers: state.implementer.implementers,
    isLoading: state.regulator.isLoading
  };
};

export default connect(mapStateToProps, actions)(AssessmentProcess);
