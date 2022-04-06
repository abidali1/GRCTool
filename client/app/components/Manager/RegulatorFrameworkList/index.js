/**
 *
 * FrameworkList
 *
 */
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const RegulatorFrameworkList = props => {
  const { rFrameworks } = props;

   return (
    <div className='b-list'>
      {rFrameworks.map((rFramework, index) => (        
        <>
          {/* <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4>Regulator Name:</h4>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-2'>
            <p className='brand-desc mb-2'>{rFramework.name}</p>
          </div>
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4>Regulator Email:</h4>
          </div>
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <p className='brand-desc mb-2'>{rFramework.email}</p>
          </div>
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4>Framework name:</h4>
          </div> */}
             {rFramework.framework.map((framework, index)=>
            <Link
             to={`/dashboard/framework/${framework._id}`}

              key={index}
             className='d-block mb-3 p-4 brand-box'
              >
             Name: <p key={index}>{framework.name}</p>
              Description:<p>{framework.description}</p>
              </Link>
             )}
          
          {/* <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4>Framework description:</h4>
          </div>
          <div className='d-flex align-items-center justify-content-between mb-2'>
             {rFramework.framework.map((framework, index)=>
            <p key={index}>{framework.description}</p>
             )}
          </div> */}
    </>
      ))}
    </div>
  );

};

export default RegulatorFrameworkList;