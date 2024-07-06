// AuthRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const AuthRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated =  !!Cookies.get("token");

  return isAuthenticated ? Component : <Navigate to="/login" />;

};

export default AuthRoute;
