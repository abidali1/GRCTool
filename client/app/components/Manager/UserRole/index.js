/**
 *
 * UserRole
 *
 */

import React from 'react';

const UserRole = props => {
  const { className, user } = props;

  return (
    <>
      {user.role === 'ROLE_ADMIN' ? (
        <span className={`role admin ${className}`}>Admin</span>
      ) : user.role === 'ROLE_CLIENT' ? (
        <span className={`role client ${className}`}>Client</span>
      ) : user.role === 'ROLE_REGULATOR' ? (
        <span className={`role regulator ${className}`}>Regulator</span>
      ): user.role === 'ROLE_IMPLEMENTER' ? (
        <span className={`role implementer ${className}`}>Implementer</span>
      ) : user.role === 'ROLE_EXTERNALAUDITOR' ? (
        <span className={`role externalauditor ${className}`}>External Auditor</span>
      ) : user.role === 'ROLE_INTERNALAUDITOR' ? (
        <span className={`role internalauditor ${className}`}>Internal Auditor</span>
      ) : (
        <span className={`role member ${className}`}>Member</span>
      )}
    </>
  );
};

UserRole.defaultProps = {
  className: ''
};

export default UserRole;
