/**
 *
 * FrameworkList
 *
 */
import React from 'react';

import { Link } from 'react-router-dom';

const ImplementerFrameworkList = props => {
  const { frameworks} = props;

  return (

    <div className='b-list'>
       {frameworks.map((framework, index) => (        
         <>
  
              {framework.framework.map((framework, index)=>
             <Link
              to={``}
 
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

export default ImplementerFrameworkList;
