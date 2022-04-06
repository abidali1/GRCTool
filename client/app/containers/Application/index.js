/**
 *
 * Application
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

// routes
import Login from '../Login';
import Signup from '../Signup';
import ClientSignup from '../ClientSignup';
import RegulatorSignup from '../RegulatorSignup';
import HomePage from '../Homepage';
import Dashboard from '../Dashboard';
import Navigation from '../Navigation';
import Authentication from '../Authentication';
import Notification from '../Notification';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import Shop from '../Shop';
import FrameworksPage from '../FrameworksPage';
import ControlPage from '../ControlPage';
import Sell from '../Sell';
import Implement from '../Implement';
import Regulate from '../Regulate'
import Contact from '../Contact';
import OrderSuccess from '../OrderSuccess';
import OrderPage from '../OrderPage';
import AuthSuccess from '../AuthSuccess';
import implementerSignup from '../ImplementerSignup';
import InternalauditorSignup from '../InternalauditorSignup';
import externalauditorSignup from '../externalauditorSignup';
import Footer from '../../components/Common/Footer';
import Page404 from '../../components/Common/Page404';

class Application extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.fetchProfile();
    }

    this.props.handleCart();

    document.addEventListener('keydown', this.handleTabbing);
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  handleTabbing(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');
    }
  }

  handleMouseDown() {
    document.body.classList.remove('user-is-tabbing');
  }

  render() {
    return (
      <div className='application'>
        <Notification />
        <Navigation />
        <main className='main'>
                        <Route exact path='/' component={HomePage} />

          <Container>
            <div className='wrapper'>
              <Switch>
                <Route path='/shop' component={Shop} />
                <Route path='/sell' component={Sell} />
                <Route path='/addimplementer' component={Implement} />
                <Route path='/regulate' component={Regulate} />
                <Route path='/contact' component={Contact} />
                <Route path='/frameworks' component={FrameworksPage} />
                <Route path='/control/:slug' component={ControlPage} />
                <Route path='/order/success/:id' component={OrderSuccess} />
                <Route path='/order/:id' component={OrderPage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Signup} />
                <Route
                  path='/client-signup/:token'
                  component={ClientSignup}
                />
                <Route
                  path='/regulator-signup/:token'
                  component={RegulatorSignup}
                /> 
                <Route
                  path='/implementer-signup/:token'
                  component={implementerSignup}
                /> 
                <Route
                  path='/internalauditor-signup/:token'
                  component={InternalauditorSignup}
                /> 
                <Route
                  path='/externalauditor-signup/:token'
                  component={externalauditorSignup}
                /> 
                <Route path='/forgot-password' component={ForgotPassword} />
                <Route
                  path='/reset-password/:token'
                  component={ResetPassword}
                />
                <Route path='/auth/success' component={AuthSuccess} />
                <Route
                  path='/dashboard'
                  component={Authentication(Dashboard)}
                />
                <Route path='/404' component={Page404} />
                <Route path='*' component={Page404} />
              </Switch>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    controls: state.control.storeControls
  };
};

export default connect(mapStateToProps, actions)(Application);
