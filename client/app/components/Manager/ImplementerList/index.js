/**
 *
 * ClientList
 *
 */

 import React from 'react';

 import { formatDate } from '../../../helpers/date';
 import Button from '../../Common/Button';
 import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';
 
 const ImplementerList = props => {
   const { implementers, approveImplementer, rejectImplementer, deleteImplementer } = props;
 
   return (
     <div className='client-list'>
       {implementers.map((implementer, index) => (
         <div key={index} className='client-box'>
           <div className='mb-3 p-4'>
             <label className='text-black'>Registered Regulator Information:</label>
             <p className='fw-2 text-truncate'>{implementer.business}</p>
             <label className='text-black'>Framework</label>
             <p className='text-truncate'>{implementer.framework}</p>
             <label className='text-black'>Name</label>
             <p className='text-truncate'>{implementer.name}</p>
             <label className='text-black'>Email</label>
             <p className='text-truncate'>
               {implementer.email ? implementer.email : 'N/A'}
             </p>
             <label className='text-black'>Phone Number</label>
             <p>{implementer.phoneNumber}</p>
             <label className='text-black'>Request date</label>
             <p>{formatDate(implementer.created)}</p>
 
             <hr />
 
             {implementer.status === 'Approved' ? (
               <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                 <div className='d-flex flex-row mx-0'>
                   <CheckIcon className='text-green' />
                   <p className='ml-2 mb-0'>Approved</p>
                 </div>
 
                 <Button
                   className='mt-3 mt-lg-0'
                   text='Delete'
                   icon={<TrashIcon width={15} />}
                   onClick={() => deleteImplementer(implementer._id)}
                 />
               </div>
             ) : implementer.status === 'Rejected' ? (
               <>
                 <div className='d-flex align-items-center mb-3'>
                   <RefreshIcon className='text-primary' />
                   <p className='fw-2 ml-3 mb-0'>Re Approve Client</p>
                 </div>
                 <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                   <Button
                     className='text-uppercase'
                     variant='primary'
                     size='md'
                     text='Approve'
                     onClick={() => approveImplementer(implementer)}
                   />
                   <Button
                     className='mt-3 mt-lg-0'
                     text='Delete'
                     icon={<TrashIcon width={15} />}
                     onClick={() => deleteImplementer(implementer._id)}
                   />
                 </div>
               </>
             ) : implementer.email ? (
               <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                 <div className='d-flex flex-column flex-lg-row mx-0'>
                   <Button
                     variant='dark'
                     className='text-uppercase'
                     size='md'
                     text='Approve'
                     onClick={() => approveImplementer(implementer)}
                   />
                   <Button
                     variant='danger'
                     className='mt-3 mt-lg-0 ml-lg-2 text-uppercase'
                     size='md'
                     text='Reject'
                     onClick={() => rejectImplementer(implementer)}
                   />
                 </div>
                 <Button
                   className='mt-3 mt-lg-0'
                   text='Delete'
                   icon={<TrashIcon width={15} />}
                   onClick={() => deleteImplementer(implementer._id)}
                 />
               </div>
             ) : (
               <>
                 <p className='text-truncate'>
                   Client doesn't have email. Call at
                   <a
                     href={`tel:${implementer.phoneNumber}`}
                     className='text-primary'
                   >
                     {' '}
                     {implementer.phoneNumber}
                   </a>
                 </p>
                 <Button
                   className='w-100 w-lg-auto'
                   text='Delete'
                   icon={<TrashIcon width={15} />}
                   onClick={() => deleteImplementer(implementer._id)}
                 />
               </>
             )}
           </div>
         </div>
       ))}
     </div>
   );
 };
 
 export default ImplementerList;
 