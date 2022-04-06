/**
 *
 * ClientList
 *
 */

 import React from 'react';

 import { formatDate } from '../../../helpers/date';
 import Button from '../../Common/Button';
 import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';
 
 const InternalAuditorList = props => {
   const { internalauditors, approveInternalAuditor, rejectInternalAuditor, deleteInternalAuditor } = props;
 
   return (
     <div className='client-list'>
       {internalauditors.map((internalauditor, index) => (
         <div key={index} className='client-box'>
           <div className='mb-3 p-4'>
             <label className='text-black'>Registered Regulator Information:</label>
             <p className='fw-2 text-truncate'>{internalauditor.business}</p>
             <label className='text-black'>Framework</label>
             <p className='text-truncate'>{internalauditor.framework}</p>
             <label className='text-black'>Name</label>
             <p className='text-truncate'>{internalauditor.name}</p>
             <label className='text-black'>Email</label>
             <p className='text-truncate'>
               {internalauditor.email ? internalauditor.email : 'N/A'}
             </p>
             <label className='text-black'>Phone Number</label>
             <p>{internalauditor.phoneNumber}</p>
             <label className='text-black'>Request date</label>
             <p>{formatDate(internalauditor.created)}</p>
 
             <hr />
 
             {internalauditor.status === 'Approved' ? (
               <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                 <div className='d-flex flex-row mx-0'>
                   <CheckIcon className='text-green' />
                   <p className='ml-2 mb-0'>Approved</p>
                 </div>
 
                 <Button
                   className='mt-3 mt-lg-0'
                   text='Delete'
                   icon={<TrashIcon width={15} />}
                   onClick={() => deleteInternalAuditor(internalauditor._id)}
                 />
               </div>
             ) : internalauditor.status === 'Rejected' ? (
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
                     onClick={() => approveInternalAuditor(internalauditor)}
                   />
                   <Button
                     className='mt-3 mt-lg-0'
                     text='Delete'
                     icon={<TrashIcon width={15} />}
                     onClick={() => deleteInternalAuditor(internalauditor._id)}
                   />
                 </div>
               </>
             ) : internalauditor.email ? (
               <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                 <div className='d-flex flex-column flex-lg-row mx-0'>
                   <Button
                     variant='dark'
                     className='text-uppercase'
                     size='md'
                     text='Approve'
                     onClick={() => approveInternalAuditor(internalauditor)}
                   />
                   <Button
                     variant='danger'
                     className='mt-3 mt-lg-0 ml-lg-2 text-uppercase'
                     size='md'
                     text='Reject'
                     onClick={() => rejectInternalAuditor(internalauditor)}
                   />
                 </div>
                 <Button
                   className='mt-3 mt-lg-0'
                   text='Delete'
                   icon={<TrashIcon width={15} />}
                   onClick={() => deleteInternalAuditor(internalauditor._id)}
                 />
               </div>
             ) : (
               <>
                 <p className='text-truncate'>
                   Client doesn't have email. Call at
                   <a
                     href={`tel:${internalauditor.phoneNumber}`}
                     className='text-primary'
                   >
                     {' '}
                     {internalauditor.phoneNumber}
                   </a>
                 </p>
                 <Button
                   className='w-100 w-lg-auto'
                   text='Delete'
                   icon={<TrashIcon width={15} />}
                   onClick={() => deleteInternalAuditor(internalauditor._id)}
                 />
               </>
             )}
           </div>
         </div>
       ))}
     </div>
   );
 };
 
 export default InternalAuditorList;
 