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
          <Table responsive striped bordered hover>
             
                <tbody>
                <tr>
           <th key={index}>Implementer Name:</th> 
            </tr>  
                </tbody>
            
            <tbody>
              <tr>
             <td><p key={index} className='brand-desc mb-2'>{assignedImplementer.name}</p></td> 
          </tr>
            </tbody>
            <tbody>
            <tr>
             <th key={index}>Framework Name:</th>
           </tr>  
            </tbody>
          
              {assignedImplementer.framework.map((framework, index)=>
              <>
              <tbody>
               <tr>
               <td><p key={index} className='brand-desc mb-2'>{framework.name}</p>
                </td>
              </tr> 
              </tbody>
              
              </>
             )}
         
         
       </Table>
       </>
       ))}
       
     </div>
   );
 };
 
 export default AssignedImplementersList;