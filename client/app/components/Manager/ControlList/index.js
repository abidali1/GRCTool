/**
 *
 * ControlList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const ControlList = props => {
  const { controls } = props;

  return (
    <div className='p-list'>
      {controls.map((control, index) => (
        <Link
          to={`/dashboard/control/edit/${control._id}`}
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
        >
          {/* <img
            className='item-image'
            src={`${
              control && control.imageUrl
                ? control.imageUrl
                : '/images/placeholder-image.png'
            }`}
          /> */}
          <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
            <h4 className='text-truncate'>{control.name}</h4>
            <p className='mb-2 text-truncate'>{control.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ControlList;
