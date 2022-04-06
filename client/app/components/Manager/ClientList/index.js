/**
 *
 * ClientList
 *
 */

import React from 'react';

import { formatDate } from '../../../helpers/date';
import Button from '../../Common/Button';
import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';

const ClientList = props => {
  const { clients, approveClient, rejectClient, deleteClient } = props;

  return (
    <div className='client-list'>
      {clients.map((client, index) => (
        <div key={index} className='client-box'>
          <div className='mb-6 p-4'>
          <label className='text-black'>Organization English Name</label>
            <p className='fw-2 text-truncate'>{client.englishname}</p>
            <label className='text-black'>Organization Arabic Name</label>
            <p className='text-truncate'>{client.arabicname}</p>
            <hr/>
            <h2>Account Supervisor Details
            </h2>
            <label className='text-black'>Account Supervisor English Name</label>
            <p className='text-truncate'>{client.accountsupervisorenglishname}</p>

            <label className='text-black'>Account Supervisor Arabic Name</label>
            <p className='text-truncate'>{client.accountsupervisorarabicname}</p>

            <label className='text-black'>Account Supervisor ID</label>
            <p className='text-truncate'>{client.ccountsupervisorid}</p>

            <label className='text-black'>Account Supervisor Email</label>
            <p className='text-truncate'>
              {client.accountsupervisoremail ? client.accountsupervisoremail : 'N/A'}
            </p>
            <label className='text-black'>Account Supervisor Phone Number</label>
            <p>{client.accountsupervisorphoneNumber}</p>

            <label className='text-black'>Account Supervisor Telephone Number</label>
            <p>{client.accountsupervisortelephoneNumber}</p>

            <h2>Account Supervisor Details
            </h2>
            <label className='text-black'>Chief Security Officer English Name</label>
            <p className='text-truncate'>{client.csoenglishname}</p>

            <label className='text-black'>Chief Security Officer Arabic Name</label>
            <p className='text-truncate'>{client.csoarabicname}</p>

            <label className='text-black'>Chief Security Officer Email</label>
            <p className='text-truncate'>
              {client.csoemail ? client.csoemail : 'N/A'}
            </p>

            <label className='text-black'> Chief Security Officer Phone Number</label>
            <p>{client.csophoneNumber}</p>

            <label className='text-black'>Business</label>
            <p className='fw-2 text-truncate'>{client.business}</p>

            <label className='text-black'>Sector</label>
            <p className='text-truncate'>{client.sector}</p>

            <label className='text-black'>Request date</label>
            <p>{formatDate(client.created)}</p>

            <hr />

            {client.status === 'Approved' ? (
              <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                <div className='d-flex flex-row mx-0'>
                  <CheckIcon className='text-green' />
                  <p className='ml-2 mb-0'>Approved</p>
                </div>

                <Button
                  className='mt-3 mt-lg-0'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteClient(client._id)}
                />
              </div>
            ) : client.status === 'Rejected' ? (
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
                    onClick={() => approveClient(client)}
                  />
                  <Button
                    className='mt-3 mt-lg-0'
                    text='Delete'
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteClient(client._id)}
                  />
                </div>
              </>
            ) : client.accountsupervisoremail ? (
              <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                <div className='d-flex flex-column flex-lg-row mx-0'>
                  <Button
                    variant='dark'
                    className='text-uppercase'
                    size='md'
                    text='Approve'
                    onClick={() => approveClient(client)}
                  />
                  <Button
                    variant='danger'
                    className='mt-3 mt-lg-0 ml-lg-2 text-uppercase'
                    size='md'
                    text='Reject'
                    onClick={() => rejectClient(client)}
                  />
                </div>
                <Button
                  className='mt-3 mt-lg-0'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteClient(client._id)}
                />
              </div>
            ) : (
              <>
                <p className='text-truncate'>
                  Client doesn't have email. Call at
                  <a
                    href={`tel:${client.scophoneNumber}`}
                    className='text-primary'
                  >
                    {' '}
                    {client.csophoneNumber}
                  </a>
                </p>
                <Button
                  className='w-100 w-lg-auto'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteClient(client._id)}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
