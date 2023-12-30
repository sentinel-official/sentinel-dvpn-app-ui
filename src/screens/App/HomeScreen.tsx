import Map from 'react-map-gl';

import timeIcon from '../../assets/images/timeIcon.svg';
import balanceIcon from '../../assets/images/balanceIcon.svg';
import homeScreenInfoIcon from '../../assets/images/homeScreenInfoIcon.svg';
import ReactCountryFlag from "react-country-flag";
import {useEffect, useState} from "react";
import APIService from "../../API/APIService";
import SelectedNode from "../../models/SelectedNode";
import {useNavigate} from "react-router-dom";
import LoadingIndicator from "../../elements/LoadingIndicator/LoadingIndicator";
import APIPlanSubscription from "../../API/models/APIPlanSubscription";
import POSTBlockchainWalletRequest from "../../API/requests/POSTBlockchainWalletRequest";
import POSTBlockchainPlanSubscribeRequest from "../../API/requests/POSTBlockchainPlanSubscribeRequest";
import POSTBlockchainWalletSessionRequest from "../../API/requests/POSTBlockchainWalletSessionRequest";
import POSTBlockchainFetchCredentialsResponse from "../../API/responses/POSTBlockchainFetchCredentialsResponse";
import POSTBlockchainFetchCredentialsRequest from "../../API/requests/POSTBlockchainFetchCredentialsRequest";

const HomeScreen = () => {

    const navigate = useNavigate();


    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [isAskingForSubscription, setIsAskingForSubscription] = useState(false);
    const [planPrice, setPlanPrice] = useState(0);
    const [providerAddress , setProviderAddress] = useState("");


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

    const updatePlanData = () => {
        const currentPlanPrice = localStorage.getItem("planPrice");
        const currentProviderAddress = localStorage.getItem("providerAddress");

        if (currentPlanPrice) {
            setPlanPrice(Number(currentPlanPrice));
        }

        if (currentProviderAddress) {
            setProviderAddress(currentProviderAddress);
        }

        APIService.getPlans().then((response: any) => {
            response.data.plans.forEach((plan: any) => {
                if (plan.id == 6) {

                    localStorage.setItem("providerAddress", plan.providerAddress);
                    setProviderAddress(plan.providerAddress);

                    plan.prices.forEach((price: any) => {
                        if (price.denom == "udvpn") {
                            const newPlanPrice = Number(price.amount) / 1000000;
                            localStorage.setItem("planPrice", String(newPlanPrice));
                            setPlanPrice(newPlanPrice);
                        }
                    })
                }
            })
        }).catch((e: Error) => {
            setError("Failed to fetch plan data");
            setLoading("");
        })
    }

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
            setError("Failed to fetch balance data");
            setLoading("");
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
            setError("Failed to fetch IP address");
            setLoading("");
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
            // @ts-ignore
            if(e.response.status != 404) {
                setError("Failed to fetch dVPN node data");
                setLoading("");
            }
        })
    }

    const updateIsConnected = () => {
        APIService.getStatus().then((response: any) => {
            setIsConnected(response.data.isConnected);
        }).catch((e: Error) => {
            setError("Failed to retrieve connection status");
            setLoading("");
        })
    }

    const renewSubscription = () => {
        setIsAskingForSubscription(false);
        setLoading("Subscribing to the plan...");

        const payload: POSTBlockchainPlanSubscribeRequest = {
            denom: 'udvpn',
            address: localStorage.getItem("providerAddress")!
        }

        APIService.subscribeToPlan(6, payload).then((response: any) => {
            connect();
        }).catch((e: Error) => {
            setError("Failed to subscribe to the plan");
            setLoading("");
        })

    }

    const connect = () => {
        const walletAddress = localStorage.getItem("walletAddress")!;
        let subscription: APIPlanSubscription | undefined;


        const establishConnection = (payload: any) => {
            setLoading("Establishing connection...");

            APIService.connect({
                data: payload,
            }).then((response: any) => {
                if(response.data.isConnected) {
                    setIsConnected(true);
                    setLoading("");
                }
            }).catch((e: Error) => {
                setError("Failed to establish connection");
                setLoading("");
            })
        }

        const fetchCredentials = (sessionId: number, subscriptionId: number) => {
            setLoading("Requesting credentials...");

            const payload: POSTBlockchainFetchCredentialsRequest = {
                url: selectedNode.server!.remote_url,
                nodeProtocol: selectedNode.server!.protocol!,
                address: walletAddress,
                session: sessionId
            }

            APIService.fetchCredentials(payload).then((response: any) => {
                establishConnection(response.data);
            }).catch((e: Error) => {
                setError("Failed to fetch credentials");
                setLoading("");
            })
        }

        const createSession = (subscriptionId: number, activeSession?: number) => {
            setLoading("Starting new session...");

            const payload: POSTBlockchainWalletSessionRequest = {
                activeSession: activeSession,
                subscriptionID: subscriptionId,
                node: selectedNode.server?.address!
            }

            APIService.createSession(walletAddress, payload).then((response: any) => {
                checkSession(subscriptionId, true);
            }).catch((e: Error) => {
                setError("Failed to create session");
                setLoading("");
            })
        }

        const checkSession = (subscriptionId: number, secondTime?: boolean) => {
            setLoading(secondTime ? "Verifying session..." : "Looking for active sessions...");

            APIService.getSession(walletAddress).then((response: any) => {
                if (
                    response.data.status == "STATUS_ACTIVE" &&
                    response.data.subscriptionId == String(subscriptionId) &&
                    response.data.nodeAddress == selectedNode.server?.address!
                ) {
                    if(secondTime) {
                        fetchCredentials(Number(response.data.id), subscriptionId);
                    } else {
                        createSession(subscriptionId, Number(response.data.id));
                    }
                } else {
                    createSession(subscriptionId, Number(response.data.id));
                }

            }).catch((e: Error) => {
                // @ts-ignore
                if(e.response.status == 404) {
                    createSession(subscriptionId);
                } else {
                    setError("Failed to check session");
                    setLoading("");
                }
            })
        }

        const promptToSubscribe = () => {
            setLoading("");
            setIsAskingForSubscription(true);
        }

        setLoading("Checking your subscriptions...");

        APIService.getSubscriptions(walletAddress).then((response: any) => {
            const subscriptions = response.data.planSubscriptions;
            if (subscriptions) {
                subscription = subscriptions.find((subscription: any) => {
                    return subscription.planId == "6";
                });

                if (subscription) {
                    checkSession(Number(subscription.base.id));
                } else {
                    promptToSubscribe();
                }
            } else {
                promptToSubscribe();
            }
        }).catch((e: Error) => {
            setError("Failed to fetch subscriptions");
            setLoading("");
        })
    }

    const disconnect = () => {
        setLoading("Disconnecting...");

        APIService.disconnect().then((response: any) => {
            if(response.data.isConnected == false) {
                setIsConnected(false);
                setLoading("");
            }
        }).catch((e: Error) => {
            setError("Failed to disconnect");
            setLoading("");
        });
    }

    const switchNode = () => {
        navigate("/app/nodes")
    }

    useEffect(() => {
        updateBalance();
        updatePlanData();
        updateIpAddress();
        updateSelectedNode();
        updateIsConnected();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            updateIpAddress();
        }, 1000);

    }, [
        isConnected
    ]);

    useEffect(() => {
        if(error != "") {
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    }, [error]);

    return (
        <div className="homeScreenContainer">

            <div className={error == '' ? "errorToast hidden" : "errorToast"}>
                {error}
            </div>

            <div className={loading == '' ? "loadingScreen hidden" : "loadingScreen blocking"}>
                <LoadingIndicator/>
                <span>{loading}</span>
            </div>

            <div className={isAskingForSubscription ? "subscribePopUpWrapper" : "subscribePopUpWrapper hidden"}>
                <div className="subscribePopUp">
                    <img src={timeIcon}/>
                    <h1>Your subscription has expired</h1>
                    <p>Renew your on-chain subscription to enjoy Sentinel dVPN.</p>
                    <button className="button primary" onClick={renewSubscription}>Renew for {planPrice} DVPN</button>
                    <button className="button secondary" onClick={() => {
                        setIsAskingForSubscription(false);
                    }}>Cancel
                    </button>
                </div>
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
                                <button className="button primary" onClick={connect}
                                        disabled={selectedNode.countryCode == ""}>Connect
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default HomeScreen;