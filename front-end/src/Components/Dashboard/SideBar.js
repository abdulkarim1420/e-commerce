import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import "./bars.css"
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
import { WindowSize } from "../../Context/WindowContext";

export default function SideBar() {

    const menu = useContext(Menu);
    const isOpen = menu.isOpen;

    const WindowContext = useContext(WindowSize);
    const windowSize = WindowContext.windowSize;


    return (
        <div className="side-bar pt-3" style={{  width: isOpen ? "240px" : "fit-content",
         left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0}}>
            <NavLink to={'users'} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon icon={faUsers} style={{  padding: isOpen ? "10px 8px 10px 15px;" : "10px 13px" }} /><p className="m-0" style={{ display: isOpen ? "block" : "none" }}>Users</p></NavLink>

        </div>
    )
  }