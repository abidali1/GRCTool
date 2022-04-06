/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditFramework from '../../components/Manager/EditFramework';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    const frameworkId = this.props.match.params.id;
    this.props.fetchFramework(frameworkId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const frameworkId = this.props.match.params.id;
      this.props.fetchFramework(frameworkId);
    }
  }

  render() {
    const {
      history,
      framework,
      formErrors,
      frameworkEditChange,
      updateFramework,
      deleteFramework,
      activateFramework
    } = this.props;

    return (
      <SubPage
        title='Edit Framework'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        {framework?._id ? (
          <EditFramework
            framework={framework}
            frameworkChange={frameworkEditChange}
            formErrors={formErrors}
            updateFramework={updateFramework}
            deleteFramework={deleteFramework}
            activateFramework={activateFramework}
          />
        ) : (
          <NotFound message='no framework found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    framework: state.framework.framework,
    formErrors: state.framework.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
