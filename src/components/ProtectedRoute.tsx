import React from 'react';
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  
  const isAuthenticated = () => {
    return localStorage.getItem('jwt_token') !== null;
  };

  return (
    <Route
      {...rest}
      render={props => // 'props' di sini memiliki tipe RouteComponentProps
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;