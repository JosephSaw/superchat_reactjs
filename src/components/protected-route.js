import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ component: Component, componentProps, ...rest }) {
    let isUserLoggedIn = useSelector(state => state.currentUser.loggedIn);

    return (
        <Route {...rest} render={props => {
            //Checks for user authentication
            if (isUserLoggedIn) {
                return <Component {...props}  {...componentProps} />
            } else {
                return (
                    <Redirect to={{
                        pathname: "/", state: {
                            from: props.location
                        }
                    }} />
                )
            }
        }} />

    )
}
