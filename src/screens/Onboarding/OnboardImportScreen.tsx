import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import * as bip39 from '@scure/bip39';
import {wordlist} from '@scure/bip39/wordlists/english';

import {Clipboard} from 'ts-clipboard';
import APIService from "../../API/APIService";
import POSTBlockchainWalletRequest from "../../API/requests/POSTBlockchainWalletRequest";
import LoadingIndicator from "../../elements/LoadingIndicator/LoadingIndicator";

const OnboardingImportScreen = () => {

    const navigate = useNavigate();


    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [isWalletReady, setIsWalletReady] = useState(false)
    const [mnemonic, setMnemonic] = useState("")


    const updateMnemonic = (event: any) => {
        setMnemonic(event.target.value);
    }
    const setupWallet = () => {
        const payload: POSTBlockchainWalletRequest = {
            mnemonic: mnemonic
        }

        APIService.createWallet(payload).then((response: any) => {
            setIsWalletReady(true);
        }).catch((e: Error) => {
            setError("Failed to import mnemonic. Check, if you entered the correct mnemonic.");
            console.log(e);
        })
    }

    useEffect(() => {
        if (isWalletReady) {
            setLoading("Setting up wallet...");
            setTimeout(() => {
                setLoading("");
                navigate("/");
            }, 1000);
        }
    }, [isWalletReady]);

    useEffect(() => {
        if(error != "") {
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    }, [error]);

    return (
        <div className="onboardingMnemonicScreenContainer">
            <div className={error == '' ? "errorToast hidden" : "errorToast"}>
                {error}
            </div>

            <div className={loading == '' ? "loadingScreen hidden" : "loadingScreen blocking"}>
                <LoadingIndicator/>
                <span>{loading}</span>
            </div>

            <div className="header">
                <h1>Log in with<br/>existing mnemonic</h1>
                <p>
                    Please provide your unique 24 word key to access your account.
                </p>
            </div>

            <div className="mnemonicInput">
                <textarea placeholder="Your mnemonic" onChange={updateMnemonic}/>
            </div>

            <div className="content">
                <button onClick={setupWallet} className="button primary">Log In</button>
                <NavLink to={"/onboarding/create"} className="button secondary">I don't have an account</NavLink>
            </div>

        </div>
    )
};

export default OnboardingImportScreen;