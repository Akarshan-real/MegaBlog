import { useEffect, useState, type ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Allowable = {
    children: ReactNode,
    authentication: boolean
};

const Protected = ({ children, authentication = true }: Allowable) => {
    const navigate = useNavigate();
    const authStatus = useSelector((state : any) => state.auth.status);
    const loading = useSelector((state: any) => state.ux.loading);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        if (!loading) {
            if (authentication && authStatus !== authentication) {
                navigate("/login");
            }
            else if (!authentication && authStatus !== authentication) {
                navigate("/");
            }
        }
        setLoader(false);
    }, [authStatus, navigate, authentication, loading])
    
    if (loader) {
        return (<><h1>Loading...</h1></>);
    };
    return (<>{children}</>);
}

export default Protected
