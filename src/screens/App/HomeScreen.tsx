import Map from 'react-map-gl';

import balanceIcon from '../../assets/images/balanceIcon.png';
import homeScreenInfoIcon from '../../assets/images/homeScreenInfoIcon.svg';
import ReactCountryFlag from "react-country-flag";
import {useEffect, useState} from "react";
import APIService from "../../API/APIService";
import SelectedNode from "../../models/SelectedNode";
import {useNavigate} from "react-router-dom";
import LoadingIndicator from "../../elements/LoadingIndicator/LoadingIndicator";
import APINodeSubscription from "../../API/models/APINodeSubscription";
import POSTBlockchainWalletRequest from "../../API/requests/POSTBlockchainWalletRequest";
import POSTBlockchainNodeSubscribeRequest from "../../API/requests/POSTBlockchainNodeSubscribeRequest";

const HomeScreen = () => {

    const navigate = useNavigate();


    const [loading, setLoading] = useState('');

    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState(0);
    const [ipAddress, setIpAddress] = useState("");
    const [selectedNode, setSelectedNode] = useState<SelectedNode>({
        countryCode: "",
        cityName: "",
        server: null
    })

    const [mapLocation, setMapLocation] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 7
    })

    const updateBalance = () => {
        const walletAddress = localStorage.getItem("walletAddress")!;
        const currentBalance = localStorage.getItem("currentBalance") ?? "0";

        setBalance(Number(currentBalance));

        APIService.getBalance(walletAddress).then((response: any) => {
            response.data.balances.forEach((balance: any) => {
                if (balance.denom == "udvpn") {
                    const newBalance = Number(balance.amount) / 1000000;
                    localStorage.setItem("currentBalance", String(newBalance));
                    setBalance(newBalance);
                }
            });
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        })
    }

    const updateIpAddress = () => {
        const currentIpAddress = localStorage.getItem("currentIpAddress") ?? "";
        const currentLocation = localStorage.getItem("currentLocation") ?? "0;0";

        setIpAddress(currentIpAddress);
        setMapLocation({
            latitude: Number(currentLocation.split(";")[0]),
            longitude: Number(currentLocation.split(";")[1]),
            zoom: 7
        });

        APIService.getIpAddress(localStorage.getItem("deviceToken")!).then((response: any) => {
            localStorage.setItem("currentIpAddress", response.data.data.ip);
            setIpAddress(response.data.data.ip);

            localStorage.setItem("currentLocation", response.data.data.latitude + ";" + response.data.data.longitude);
            setMapLocation({
                latitude: response.data.data.latitude,
                longitude: response.data.data.longitude,
                zoom: 7
            });
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        });
    }

    const updateSelectedNode = () => {
        const selectedNodeJSON = localStorage.getItem("selectedNode");

        if (selectedNodeJSON) {
            const selectedNode = JSON.parse(selectedNodeJSON);
            setSelectedNode(selectedNode);
        }

        APIService.getKey("selectedNode").then((response: any) => {
            setSelectedNode(JSON.parse(response.data.value));
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        })
    }

    const updateIsConnected = () => {

    }

    const connect = () => {
        const walletAddress = localStorage.getItem("walletAddress")!;
        let subscription: APINodeSubscription | undefined;

        const subscribeToNode = () => {
            //setLoading("Subscribing to the node...");

            const payload: POSTBlockchainNodeSubscribeRequest = {
                denom: 'udvpn',
                hours: 1,
                gigabytes: 0
            }

            APIService.subscribeToNode(selectedNode.server!.address, payload).then((response: any) => {
                console.log(response.data)
            }).catch((e: Error) => {
                //TODO: Unresolvable error
                console.log(e);
            })
        }

        const checkSession = () => {
            setLoading("Looking for active sessions...");
        }

        setLoading("Checking your subscriptions...");

        APIService.getSubscriptions(walletAddress).then((response: any) => {
            const subscriptions = response.data.nodeSubscriptions;
            if (subscriptions) {
                subscription = subscriptions.find((subscription: any) => {
                    return subscription.nodeAddress == selectedNode.server!.address;
                });

                if (subscription) {
                    checkSession();
                } else {
                    subscribeToNode();
                }
            } else {
                subscribeToNode();
            }
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        })
    }

    const disconnect = () => {
        setIsConnected(false)
    }

    const switchNode = () => {
        navigate("/app/nodes")
    }

    useEffect(() => {
        updateBalance();
        updateIpAddress();
        updateSelectedNode();
    }, []);

    return (
        <div className="homeScreenContainer">
            <div className={loading == '' ? "loadingScreen hidden" : "loadingScreen blocking"}>
                <LoadingIndicator/>
                <span>{loading}</span>
            </div>

            <div className="map">
                <Map
                    {...mapLocation}
                    mapboxAccessToken="pk.eyJ1IjoiYmFzZWRhcHBzIiwiYSI6ImNsbjMza2I0NjBmYjgycm5rODM4d2I4ODEifQ.Mr0qLSfbCOoChGbAHvOo8g"
                    initialViewState={mapLocation}
                    style={{width: "100%", height: "100%"}}
                    mapStyle="mapbox://styles/basedapps/clorr29u400oq01qybkxo563d"
                />
            </div>
            <div className="overlay">
                <div className="balanceContainer">
                    <div className="balanceIcon">
                        <img src={balanceIcon}/>
                    </div>
                    <div className="balanceText">
                        <h1>Your balance</h1>
                        <span>{balance} DVPN</span>
                    </div>
                </div>
                <div className="connectionContainer">
                    <div className="selectedNodeContainer">

                        {
                            selectedNode.countryCode ? (
                                <div className="selectedNodeLocation">
                                    <ReactCountryFlag countryCode={selectedNode.countryCode} svg/>
                                    <span>{selectedNode.cityName + ", " + selectedNode.countryCode}</span>
                                </div>
                            ) : (
                                <div className="selectedNodeLocation">
                                    <span className="muted">Server is not selected</span>
                                </div>
                            )
                        }


                        <div className="currentIP">
                            <span className="key">Your IP:</span>
                            <span className="value">{ipAddress}</span>
                        </div>

                        {
                            isConnected == false ? (
                                <div className="unprotectedNotification">
                                    <img src={homeScreenInfoIcon}/>
                                    <span>You're not protected</span>
                                </div>
                            ) : null
                        }
                    </div>
                    {
                        isConnected ? (
                            <div className="actions">
                                <button className="button secondary" onClick={disconnect}>Disconnect</button>
                                <button className="button primary" onClick={switchNode}>Switch Node</button>
                            </div>
                        ) : (
                            <div className="actions">
                                <button className="button primary" onClick={connect}>Connect</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default HomeScreen;