import React from 'react';

import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const location = useLocation();

  if (!isAuth || isAuth === false) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;