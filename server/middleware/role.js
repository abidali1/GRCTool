const ROLES = {
  Admin: 'ROLE_ADMIN',
  Customer: 'ROLE_MEMBER',
  Client: 'ROLE_CLIENT',
  Regulator: 'ROLE_REGULATOR',
  Implementer: 'ROLE_IMPLEMENTER',
  ExternalAuditor: 'ROLE_EXTERNALAUDITOR',
  InternalAuditor: 'ROLE_INTERNALAUDITOR',
  
};

const checkRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const hasRole = roles.find(role => req.user.role === role);
  if (!hasRole) {
    return res.status(403).send('You are not allowed to make this request.');
  }

  return next();
};

const role = { ROLES, checkRole };

module.exports = role;
