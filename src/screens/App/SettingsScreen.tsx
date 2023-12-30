import legalDocIcon from '../../assets/images/legalDocIcon.svg';
import versionIcon from '../../assets/images/versionIcon.svg';
import dnsIcon from '../../assets/images/dnsIcon.svg';
const SettingsScreen = () => {
    return (
        <div className="settingsScreenContainer">
            <h1 className="header">Settings</h1>
            <div className="settingsSection">
                <h2>DVPN</h2>
                <div className="sectionRow">
                    <div className="primaryData">
                        <img src={dnsIcon}/>
                        <span>DNS</span>
                    </div>
                    <div className="secondaryData">
                        <span>Cloudflare DNS</span>
                    </div>
                </div>
            </div>
            <div className="settingsSection">
                <h2>Legal</h2>
                <a href="https://sentinel.co/legal/terms" target="_blank" className="sectionRow">
                    <div className="primaryData">
                        <img src={legalDocIcon}/>
                        <span>Terms of Service</span>
                    </div>
                </a>
                <a href="https://sentinel.co/legal/privacy" target="_blank" className="sectionRow">
                    <div className="primaryData">
                        <img src={legalDocIcon}/>
                        <span>Privacy Policy</span>
                    </div>
                </a>
                <div className="sectionRow">
                    <div className="primaryData">
                        <img src={versionIcon}/>
                        <span>App Version</span>
                    </div>
                    <div className="secondaryData">
                        <span>1.0</span>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default SettingsScreen;