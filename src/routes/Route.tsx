import React, { ComponentType } from 'react';
import { useAuth } from '../hooks/AuthContext';

import { Redirect, RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute } from "react-router-dom";

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: ComponentType
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    const { user } = useAuth()

    return (
        <ReactDOMRoute 
        {...rest} 
        render={({location}) => {
        return isPrivate === !!user ? (
                <Component /> 
                ) : (
                <Redirect to={{ pathname: isPrivate ? "/" : "/dashboard", state: { from: location } }}  />
            );
  }} />);
}

export default Route;