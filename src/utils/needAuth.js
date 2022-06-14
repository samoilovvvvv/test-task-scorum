import React from 'react';

import RequireAuth from '../components/RequireAuth';

export const needAuth = (component) => (
  <RequireAuth>
    {component}
  </RequireAuth>
);