/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import Admin from '../../components/Manager/Dashboard/Admin';
import Client from '../../components/Manager/Dashboard/Client';
import Implementer from '../../components/Manager/Dashboard/Implementer';
import ExternalAuditor from '../../components/Manager/Dashboard/ExternalAuditor';
import InternalAuditor from '../../components/Manager/Dashboard/InternalAuditor';
import Customer from '../../components/Manager/Dashboard/Customer';
import Regulator from '../../components/Manager/Dashboard/Regulator';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

import dashboardLinks from './links.json';

class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { user, isLoading, isMenuOpen, toggleDashboardMenu } = this.props;

    return (
      <>
        {isLoading ? (
          <LoadingIndicator inline />
        ) : user.role === 'ROLE_ADMIN' ? (
          <Admin
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_ADMIN']}
            toggleMenu={toggleDashboardMenu}
          />
        ) : user.role === 'ROLE_CLIENT' && user.client ? (
          <Client
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_CLIENT']}
            toggleMenu={toggleDashboardMenu}
          />
        ) : user.role === 'ROLE_REGULATOR' && user.regulator ? (
          <Regulator
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_REGULATOR']}
            toggleMenu={toggleDashboardMenu}
          />
        )
         : user.role === 'ROLE_IMPLEMENTER' && user.implementer ?(
          <Implementer
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_IMPLEMENTER']}
            toggleMenu={toggleDashboardMenu}
          />
        )
        : user.role === 'ROLE_INTERNALAUDITOR' && user.internalauditor ?(
          <InternalAuditor
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_INTERNALAUDITOR']}
            toggleMenu={toggleDashboardMenu}
          />
        )
        : user.role === 'ROLE_EXTERNALAUDITOR' && user.externalauditor ?(
          <ExternalAuditor
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_EXTERNALAUDITOR']}
            toggleMenu={toggleDashboardMenu}
          />
        )
        :
        
         (
          <Customer
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ROLE_MEMBER']}
            toggleMenu={toggleDashboardMenu}
          />
        )
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    isLoading: state.account.isLoading,
    isMenuOpen: state.dashboard.isMenuOpen
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
