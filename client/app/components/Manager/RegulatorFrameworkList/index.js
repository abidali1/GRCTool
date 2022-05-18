/**
 *
 * Regulator Framework List
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
          

    </>
      ))}
    </div>
  );

};

export default RegulatorFrameworkList;