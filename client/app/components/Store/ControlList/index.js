/**
 *
 * ControlList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import AddToWishList from '../AddToWishList';

const ControlList = props => {
  const { controls, updateWishlist, authenticated } = props;

  return (
    <div className='control-list'>
      {controls.map((control, index) => (
        <div key={index} className='mb-3 mb-md-0'>
          <div className='control-container'>
            <div className='item-box'>
              <div className='add-wishlist-box'>
                <AddToWishList
                  control={control}
                  updateWishlist={updateWishlist}
                  authenticated={authenticated}
                />
              </div>

              <div className='item-link'>
                <Link
                  to={`/control/${control.slug}`}
                  className='d-flex flex-column h-100'
                >
                  <div className='item-image-container'>
                    <div className='item-image-box'>
                      <img
                        className='item-image'
                        src={`${
                          control.imageUrl
                            ? control.imageUrl
                            : '/images/placeholder-image.png'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='item-body'>
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{control.name}</h1>
                      {control.framework && Object.keys(control.framework).length > 0 && (
                        <p className='by'>
                          By <span>{control.framework.name}</span>
                        </p>
                      )}
                      <p className='item-desc mb-0'>{control.description}</p>
                    </div>
                  </div>
                  <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer'>
                    <p className='price mb-0'>${control.price}</p>
                    {control.totalReviews > 0 && (
                      <p className='mb-0'>
                        <span className='fs-16 fw-1 mr-1'>
                          {parseFloat(control?.averageRating).toFixed(1)}
                        </span>
                        <span
                          className={`fa fa-star ${
                            control.totalReviews !== 0 ? 'checked' : ''
                          }`}
                          style={{ color: '#ffb302' }}
                        ></span>
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ControlList;
