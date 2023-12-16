import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import launchScreenLogo from '../../assets/images/launchScreenLogo.png';

import APIService from "../../API/APIService";
import POSTProxyDeviceRequest from "../../API/requests/POSTProxyDeviceRequest";
import POSTRegistryRequest from "../../API/requests/POSTRegistryRequest";

const LaunchScreen = () => {
    const navigate = useNavigate();

    const [isDeviceTokenSet, setIsDeviceTokenSet] = useState(false);
    const [isWalletChecked, setIsWalletChecked] = useState(false);
    const [isWalletCreated, setIsWalletCreated] = useState(false);

    const loadApp = async () => {
        APIService.getKey("deviceToken").then((response: any) => {
            localStorage.setItem("deviceToken", response.data.value);
            setIsDeviceTokenSet(true);
        }).catch((e: Error) => {
            const payload: POSTProxyDeviceRequest = {
                platform: "OTHER"
            };

            APIService.registerDevice(payload).then((response: any) => {
                const deviceToken = response.data.data.token;

                const payload: POSTRegistryRequest = {
                    key: "deviceToken",
                    value: deviceToken,
                    is_secure: true
                }

                APIService.setKey(payload).then((response: any) => {
                    localStorage.setItem("deviceToken", deviceToken);
                    setIsDeviceTokenSet(true);
                }).catch((e: Error) => {
                    alert(e.message);
                    //TODO: Unresolvable error
                    console.log(e);
                });
            }).catch((e: Error) => {
                alert(e.message);
                //TODO: Unresolvable error
                console.log(e);
            });
        });
    }

    const getWallet = async () => {
        APIService.getWallet().then((response: any) => {
            localStorage.setItem("walletAddress", response.data.address);

            setIsWalletChecked(true);
            setIsWalletCreated(true);
        }).catch((e: Error) => {
            setIsWalletChecked(true);
            setIsWalletCreated(false);
        })
    }

    useEffect(() => {
        (async () => {
            await loadApp()
            await getWallet();
        })();
    }, []);


    useEffect(() => {
        if(isDeviceTokenSet && isWalletChecked) {
            navigate(isWalletCreated ? "/app" : "/onboarding")
        }
    }, [
        isDeviceTokenSet,
        isWalletChecked,
        isWalletCreated
    ]);

    return (
        <div className="launchScreenContainer">
            <div className="wrapper">
                <img src={launchScreenLogo} className="logo"/>
                <h1>Welcome to Sentinel VPN</h1>
                <p>Join Sentinel and enjoy the unlimited possibilities of a decentralized VPN</p>
            </div>
        </div>
    );
};

export default LaunchScreen;