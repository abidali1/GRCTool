/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import DomainList from '../../components/Manager/DomainList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchDomains();
  }

  render() {
    const { history, domains, isLoading } = this.props;

    return (
      <>
        <SubPage
          title='Domains'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/domain/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : domains.length > 0 ? (
            <DomainList domains={domains} />
          ) : (
            <NotFound message='no domains found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    domains: state.domain.domains,
    isLoading: state.domain.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
