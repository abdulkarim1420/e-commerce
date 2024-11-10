import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./bars.css"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Navigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from 'cookie-universal';

export default function TopBar() {

    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const [name, setName] = useState("");
    const cookie = Cookie();

    // Get user data to get name
    useEffect(() => {
        Axios.get(`/${USER}`).
        then((data) => setName(data.data.name))
        .catch(() => Navigate("/login", { replace: true }));
    }, []);

    // Logout
    async function handleLogout() {
        try {
            const res = await Axios.get(`/${LOGOUT}`);
            window.location.pathname = "/login";
            cookie.remove('e-commerce');
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div className="top-bar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-5">
                <h3>E-Commerce</h3>
                <FontAwesomeIcon cursor={"pointer"} icon={faBars} onClick={() => setIsOpen(prev => !prev)} />
            </div>
            <div>
                <DropdownButton id="dropdown-basic-button" title={name}>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    )
  }