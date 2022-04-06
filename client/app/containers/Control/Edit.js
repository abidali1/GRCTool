/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditControl from '../../components/Manager/EditControl';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetControl();
    const controlId = this.props.match.params.id;
    this.props.fetchControl(controlId);
    this.props.fetchFrameworksSelect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetControl();
      const controlId = this.props.match.params.id;
      this.props.fetchControl(controlId);
    }
  }

  render() {
    const {
      history,
      user,
      control,
      formErrors,
      frameworks,
      controlEditChange,
      updateControl,
      deleteControl,
      activateControl
    } = this.props;

    return (
      <SubPage
        title='Edit Control'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        {control?._id ? (
          <EditControl
            user={user}
            control={control}
            formErrors={formErrors}
            frameworks={frameworks}
            controlChange={controlEditChange}
            updateControl={updateControl}
            deleteControl={deleteControl}
            activateControl={activateControl}
          />
        ) : (
          <NotFound message='no control found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    control: state.control.control,
    formErrors: state.control.editFormErrors,
    frameworks: state.framework.frameworksSelect
  };
};

export default connect(mapStateToProps, actions)(Edit);
