/**
 *
 * MiniFramework
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const MiniFramework = props => {
  const { frameworks, toggleFramework } = props;

  const handleMenuItemClick = () => {
    toggleFramework();
  };

  return (
    <div className='mini-framework-list'>
      <div className='d-flex align-items-center justify-content-between min-framework-title'>
        <h4 className='mb-0'>Shop By Framework</h4>
        <Link
          to={'/frameworks'}
          className='redirect-link'
          role='menuitem'
          onClick={handleMenuItemClick}
        >
          See all
        </Link>
      </div>
      <div className='mini-framework-block'>
        {frameworks.map((framework, index) => (
          <div key={index} className='framework-item'>
            <Link
              to={`/shop/framework/${framework.slug}`}
              className='framework-link'
              role='menuitem'
              onClick={handleMenuItemClick}
            >
              {framework.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniFramework;
