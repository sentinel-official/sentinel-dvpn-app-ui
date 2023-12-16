import {NavLink, Outlet, useNavigate} from "react-router-dom";

import tabHomeIcon from "../../assets/images/tabHomeIcon.svg";
import tabNodesIcon from "../../assets/images/tabNodesIcon.svg";
import tabAccountIcon from "../../assets/images/tabAccountIcon.svg";
import tabSettingsIcon from "../../assets/images/tabSettingsIcon.svg";

const AppLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="appLayoutContainer">
            <div className="tabContent">
                <Outlet/>
            </div>
            <div className="tabBar">
                <div className="tabs">
                    <NavLink to="/app" className={window.location.pathname == "/app" ? "selected" : ""}>
                        <img src={tabHomeIcon}/>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/app/nodes" className={window.location.pathname.startsWith("/app/nodes") ? "selected" : ""}>
                        <img src={tabNodesIcon}/>
                        <span>Nodes</span>
                    </NavLink>
                    <NavLink to="/app/account" className={window.location.pathname.startsWith("/app/account") ? "selected" : ""}>
                        <img src={tabAccountIcon}/>
                        <span>Account</span>
                    </NavLink>
                    <NavLink to="/app/settings" className={window.location.pathname.startsWith("/app/settings") ? "selected" : ""}>
                        <img src={tabSettingsIcon}/>
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
};

export default AppLayout;