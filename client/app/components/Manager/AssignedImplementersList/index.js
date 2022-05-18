/**
 *
 * Assigned Implementer Framework List
 *
 */
 import React from 'react';
 import { Row, Col, Table } from 'reactstrap';

 const AssignedImplementersList = props => {
   const { assignedImplementers } = props;
 
    return (
     <div className='b-list'>
       {assignedImplementers.map((assignedImplementer, index) => (        
         <>
          <Table responsive>
              <Table striped bordered hover>
            <tr>
           <th>Implementer Name:</th> 
            </tr>
            
            <tr>
             <td><p key={index} className='brand-desc mb-2'>{assignedImplementer.name}</p></td> 
          </tr>
          <tr>
             <th>Framework Name:</th>
           </tr>
              {assignedImplementer.framework.map((framework, index)=>
              <>
              <tr>
               <td><p key={index} className='brand-desc mb-2'>{framework.name}</p>
                </td>

              </tr>
              </>
             )}
         
          </Table>
       </Table>
       </>
       ))}
       
     </div>
   );
 };
 
 export default AssignedImplementersList;