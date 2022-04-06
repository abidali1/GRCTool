/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditDomain from '../../components/Manager/EditDomain';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetDomain();
    const domainId = this.props.match.params.id;
    this.props.fetchDomain(domainId);
    this.props.fetchControlsSelect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetDomain();
      const domainId = this.props.match.params.id;
      this.props.fetchDomain(domainId);
    }
  }

  render() {
    const {
      history,
      controls,
      domain,
      formErrors,
      domainEditChange,
      updateDomain,
      deleteDomain,
      activateDomain
    } = this.props;

    return (
      <SubPage
        title='Edit Domain'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        {domain?._id ? (
          <EditDomain
            controls={controls}
            domain={domain}
            formErrors={formErrors}
            domainChange={domainEditChange}
            updateDomain={updateDomain}
            deleteDomain={deleteDomain}
            activateDomain={activateDomain}
          />
        ) : (
          <NotFound message='no domain found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    controls: state.control.productsSelect,
    domain: state.domain.domain,
    formErrors: state.domain.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
