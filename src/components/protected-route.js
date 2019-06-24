import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, componentProps, ...rest }) {
    return (
        <Route {...rest} render={props => {
            console.log(props);
            //Checks for user authentication
            if (true) {
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
