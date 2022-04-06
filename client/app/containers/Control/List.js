/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import ControlList from '../../components/Manager/ControlList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchControls();
  }

  render() {
    const { history, controls, isLoading } = this.props;

    return (
      <>
        <SubPage
          title='Controls'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/control/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : controls.length > 0 ? (
            <ControlList controls={controls} />
          ) : (
            <NotFound message='no controls found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    controls: state.control.controls,
    isLoading: state.control.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
