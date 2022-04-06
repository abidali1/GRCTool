/**
 *
 * FrameworkList
 *
 */
import React from 'react';

import { Link } from 'react-router-dom';

const FrameworkList = props => {
  const { frameworks, user} = props;

  return (

    <div className='b-list'>
      
      {frameworks.map((framework, index) => (
        
        <Link
          // to={`/dashboard/framework/edit/${framework._id}`}
          to={`/dashboard/framework/${framework._id}`}

          key={index}
          className='d-block mb-3 p-4 brand-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{framework.name}</h4>
          </div>
          <p className='brand-desc mb-2'>{framework.description}</p>

          {framework?.regulator && framework?.regulator?._id !== user?.regulator && (
            <div className='d-flex'>
              <label>By</label>
              <p className='brand-merchant mb-0 ml-2 text-primary'>
                {framework.regulator.name}
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default FrameworkList;
