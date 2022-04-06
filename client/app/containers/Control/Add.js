import React from 'react';

 

import { connect } from 'react-redux';

import actions from '../../actions';
import AddControl from '../../components/Manager/AddControl';

import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {

  componentDidMount() {
    this.props.fetchFrameworksSelect();
  }
  render() {
    const {

      history,
      user,
      controlFormData,
      formErrors,
      frameworks,
      controlChange,
      addControl,
      image
    } = this.props;

    return (
      <SubPage
        title='Add control'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddControl
          user={user}
          controlFormData={controlFormData}
          formErrors={formErrors}
          frameworks={frameworks}
          controlChange={controlChange}
          addControl={addControl}
        />

      </SubPage>
    );
  }

}

const mapStateToProps = state => {

  return {
    user: state.account.user,
    controlFormData: state.control.controlFormData,
    formErrors: state.control.formErrors,
    frameworks: state.framework.frameworksSelect

  };

};

export default connect(mapStateToProps, actions)(Add);