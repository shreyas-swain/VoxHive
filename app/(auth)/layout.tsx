import React from "react";

const AuthenticationLayout = ({ children } : { children: React.ReactNode}) => {
    return ( 
        <div className="h-full flex justify-center items-center">{children}</div>
     );
}
 
export default AuthenticationLayout;