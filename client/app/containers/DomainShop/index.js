/**
 *
 * DomainShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import ControlList from '../../components/Store/ControlList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class DomainShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterControls('domain', slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.filterControls('domain', slug);
    }
  }

  render() {
    const { controls, isLoading, authenticated, updateWishlist } = this.props;

    return (
      <div className='domain-shop'>
        {isLoading && <LoadingIndicator />}
        {controls && controls.length > 0 && (
          <ControlList
            controls={controls}
            authenticated={authenticated}
            updateWishlist={updateWishlist}
          />
        )}
        {!isLoading && controls && controls.length <= 0 && (
          <NotFound message='no controls found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    controls: state.control.storeControls,
    isLoading: state.control.isLoading,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(DomainShop);
