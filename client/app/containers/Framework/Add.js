/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddFramework from '../../components/Manager/AddFramework';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  render() {
    const {
      history,
      frameworkFormData,
      formErrors,
      frameworkChange,
      addFramework
    } = this.props;

    return (
      <SubPage
        title='Add Framework'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddFramework
          frameworkFormData={frameworkFormData}
          formErrors={formErrors}
          frameworkChange={frameworkChange}
          addFramework={addFramework}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    frameworkFormData: state.framework.frameworkFormData,
    formErrors: state.framework.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
