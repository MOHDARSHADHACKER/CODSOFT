import React from 'react';
import { Outlet, Route, Navigate } from 'react-router-dom';
import Login from '../components/login.component';


function PrivateRoute({ children, ...rest }) {
    // let navigate = useNavigate();
    return  localStorage.getItem('user')? <Outlet/> : <Navigate to="/login"/>;
        // <Route
        //     {...rest}
        //     render={({ location }) =>
        //         localStorage.getItem('user') ? (
        //             children
        //         ) : (
        //            <Login/>

        //             // navigate("/login")
        //             // <Redirect
        //             //     to={{
        //             //         pathname: "/login",
        //             //         state: { from: location }
        //             //     }}
        //             // />
        //         )
        //     }
        // />
    // )
}

export default PrivateRoute;