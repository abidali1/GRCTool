/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddDomain from '../../components/Manager/AddDomain';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchControlsSelect();
  }

  render() {
    const {
      history,
      controls,
      domainFormData,
      formErrors,
      domainChange,
      addDomain
    } = this.props;

    return (
      <SubPage
        title='Add Domain'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddDomain
          controls={controls}
          domainFormData={domainFormData}
          formErrors={formErrors}
          domainChange={domainChange}
          addDomain={addDomain}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    controls: state.control.controlsSelect,
    domainFormData: state.domain.domainFormData,
    formErrors: state.domain.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
