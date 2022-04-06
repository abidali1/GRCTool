/**
 *
 * AddToWishList
 *
 */

import React from 'react';

import { HeartIcon } from '../../Common/Icon';

class AddToWishList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { control, updateWishlist, authenticated } = this.props;

    return (
      <div className='add-to-wishlist'>
        {authenticated === true ? (
          <input
            type='checkbox'
            id={`checkbox_${control.sku}`}
            name={control._id}
            className='checkbox'
            onChange={e => updateWishlist(e)}
            defaultChecked={control.isLiked ? control.isLiked : false}
          />
        ) : (
          <input
            type='checkbox'
            id={`checkbox_${this.props.control.sku}`}
            name={control._id}
            className='disabled-checkbox'
            onChange={e => updateWishlist(e)}
            defaultChecked={control.isLiked ? control.isLiked : false}
          />
        )}
        <label htmlFor={`checkbox_${control.sku}`} type='submit'>
          <HeartIcon className='heart-svg' />
        </label>
      </div>
    );
  }
}

export default AddToWishList;
