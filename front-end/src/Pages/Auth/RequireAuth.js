import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Axios } from "../../Api/axios";

export default function RequireAuth() {

    // User
    const [user, setUser] = useState("");

    // Navigate
    const navigate = useNavigate();

    // Get user data to check
    useEffect(() => {
        Axios.get(`/${USER}`).then((data) => setUser(data.data)).catch(() => navigate("/login", { replace: true }));
    }, []);


    // Token & Cookie
    const cookie = Cookie();
    const token = cookie.get('e-commerce');

    return token ? ( user === "" ? ( <LoadingSubmit /> ) : ( <Outlet /> ) ) : ( <Navigate to={'/login'} replace={true} /> );
  }