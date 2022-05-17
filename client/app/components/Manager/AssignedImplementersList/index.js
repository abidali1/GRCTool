/**
 *
 * Assigned Implementer Framework List
 *
 */
 import React from 'react';
 import { Row, Col } from 'reactstrap';

 const AssignedImplementersList = props => {
   const { assignedImplementers } = props;
 
    return (
     <div className='b-list'>
       {assignedImplementers.map((assignedImplementer, index) => (        
         <>
           <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4>Implementer Name:</h4>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-2'>
            <p className='brand-desc mb-2'>{assignedImplementer.name}</p>
          </div>
              {assignedImplementer.framework.map((framework, index)=>
              <>
                     <div className='d-flex align-items-center justify-content-between mb-2'>
                     <h4>Framework Name:</h4>
                     </div>
                     <div className='d-flex align-items-center justify-content-between mb-2'>
                     <p className='brand-desc mb-2'>{framework.name}</p>
                   </div> 
              </>
             )}
         </>
       ))}
     </div>
   );
 };
 
 export default AssignedImplementersList;