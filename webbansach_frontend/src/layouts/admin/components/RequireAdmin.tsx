import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JWTPayLoad {
    isAdmin: boolean,
    isStaff: boolean,
    isUser: boolean
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            const token = localStorage.getItem('token');

            //In case user has not logged in
            if (!token) {
                navigate("/login");
                return;
            } else {
                //decode token
                const decodedToken = jwtDecode(token) as JWTPayLoad;
                console.log(decodedToken);

                //get admin's infor
                const isAdmin = decodedToken.isAdmin;

                //check not to be admin 
                if (!isAdmin) {
                    navigate("/");
                    return;
                }
            }
        }, [navigate]);
        return <WrappedComponent {...props} />
    }
    return WithAdminCheck;
}

export default RequireAdmin