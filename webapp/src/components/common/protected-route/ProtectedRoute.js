import React from 'react';
import { Route,Redirect } from 'react-router-dom'

function ProtectedRoute({ component : Component,loggedIn , ...rest}) {
    return (
        <Route
            {...rest}
            render={props => {
                console.log(loggedIn)
                if(loggedIn){
                    return <Component {...props} {...rest}/>
                }
                else{
                    return <Redirect to={
                        {
                            pathname : '/',
                            state : {
                                from : props.location
                            }
                        }
                    }
                    />
                }
            }}
        />
    );
}

export default ProtectedRoute;
