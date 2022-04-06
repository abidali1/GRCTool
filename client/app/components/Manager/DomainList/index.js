/**
 *
 * DomainList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const DomainList = props => {
  const { domains } = props;

  return (
    <div className='c-list'>
      {domains.map((domain, index) => (
        <Link
          to={`/dashboard/domain/edit/${domain._id}`}
          key={index}
          className='d-block mb-3 p-4 domain-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{domain.name}</h4>
          </div>
          <p className='mb-2 domain-desc'>{domain.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default DomainList;
