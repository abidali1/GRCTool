/*
 *
 * Client
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import ClientList from '../../components/Manager/ClientList';

class Client extends React.PureComponent {
  componentDidMount() {
    this.props.fetchClients();
  }

  render() {
    const {
      clients,
      isLoading,
      approveClient,
      rejectClient,
      deleteClient
    } = this.props;

    return (
      <div className='client-dashboard'>
        <SubPage title={'Clients'} isMenuOpen={null} />
        {isLoading ? (
          <LoadingIndicator inline />
        ) : clients.length > 0 ? (
          <ClientList
            clients={clients}
            approveClient={approveClient}
            rejectClient={rejectClient}
            deleteClient={deleteClient}
          />
        ) : (
          <NotFound message='no clients found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.client.clients,
    isLoading: state.client.isLoading
  };
};

export default connect(mapStateToProps, actions)(Client);
