import {NavLink, Outlet} from "react-router-dom";

import onboardingStartScreenKeyIcon from "../../assets/images/onboardingStartScreenKeyIcon.svg";


const OnboardingStartScreen = () => {
    return (
        <div className="onboardingStartScreenContainer">
            <div className="header">
                <h1>Welcome<br/>to Sentinel</h1>
                <p>Join anonymously using existing mnemonic or create a new one.</p>
            </div>

            <div className="content">
                <div className="image">
                    <img src={onboardingStartScreenKeyIcon}/>
                </div>
                <h2>How it works?</h2>
                <p>
                    Anonymous sign-up will allow you to create a Sentinel DVPN wallet without providing any information.
                    This wallet can be loaded and used by you to purchase VPN services in the application.
                </p>

                <NavLink to={"/onboarding/create"} className="button primary">Create New Wallet</NavLink>
                <NavLink to={"/onboarding/import"} className="button secondary">Use existing mnemonic</NavLink>
            </div>
        </div>
    )
};

export default OnboardingStartScreen;