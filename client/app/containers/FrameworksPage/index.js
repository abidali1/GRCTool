/**
 *
 * FrameworkPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import FrameworkList from '../../components/Store/FrameworkList';

class FrameworksPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreFrameworks();
  }

  render() {
    const { frameworks } = this.props;

    return (
      <div className='frameworks-page'>
        <FrameworkList frameworks={frameworks} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    frameworks: state.framework.storeFrameworks
  };
};

export default connect(mapStateToProps, actions)(FrameworksPage);
