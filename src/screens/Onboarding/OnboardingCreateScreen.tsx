import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import * as bip39 from '@scure/bip39';
import {wordlist} from '@scure/bip39/wordlists/english';

import {Clipboard} from 'ts-clipboard';
import APIService from "../../API/APIService";
import POSTBlockchainWalletRequest from "../../API/requests/POSTBlockchainWalletRequest";

const OnboardingCreateScreen = () => {

    const navigate = useNavigate();

    const [mnemonic, setMnemonic] = useState("")
    const [revealMnemonic, setRevealMnemonic] = useState(false)

    const [isWalletReady, setIsWalletReady] = useState(false)

    useEffect(() => {
        setMnemonic(bip39.generateMnemonic(wordlist, 256))
    }, []);

    const copyToClipboard = () => {
        Clipboard.copy(mnemonic);
    }

    const setupWallet = () => {
        const payload: POSTBlockchainWalletRequest = {
            mnemonic: mnemonic
        }

        APIService.createWallet(payload).then((response: any) => {
            setIsWalletReady(true);
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        })
    }

    useEffect(() => {
        if (isWalletReady) {
            navigate("/app");
        }
    }, [isWalletReady]);

    return (
        <div className="onboardingCreateScreenContainer">
            <div className="header">
                <h1>Your unique<br/>mnemonic</h1>
                <p>
                    Copy down this unique 24 word key somewhere safe. This key will be needed to access your wallet
                    in case you get logged out or need to use your wallet outside this application.
                </p>
            </div>

            <div className={revealMnemonic ? "mnemonic" : "mnemonic blurred"}>
                {mnemonic.split(" ").map((word, index) => {
                    return (
                        <span id={"word_" + index}>{word}</span>
                    )
                })}
            </div>

            <div className="content">
                {
                    revealMnemonic ?
                        (<button onClick={copyToClipboard} className="button secondary">Copy Mnemonic</button>) :
                        (<button onClick={() => {
                            setRevealMnemonic(true);
                        }} className="button primary">Reveal Mnemonic</button>)
                }

                <button onClick={setupWallet}
                        className={revealMnemonic ? "button primary" : "button secondary"}>Continue
                </button>
            </div>

        </div>
    )
};

export default OnboardingCreateScreen;