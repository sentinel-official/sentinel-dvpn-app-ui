import './App.scss'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import LaunchScreen from "./screens/Launch/LaunchScreen";

import OnboardingLayout from "./screens/Onboarding/OnboardingLayout";
import OnboardingStartScreen from "./screens/Onboarding/OnboardingStartScreen";
import OnboardingCreateScreen from "./screens/Onboarding/OnboardingCreateScreen";

import AppLayout from "./screens/App/AppLayout";
import HomeScreen from "./screens/App/HomeScreen";
import NodesCountriesScreen from "./screens/App/NodesCountriesScreen";
import AccountScreen from "./screens/App/AccountScreen";
import SettingsScreen from "./screens/App/SettingsScreen";
import NodesCitiesScreen from "./screens/App/NodesCitiesScreen";
import NodesServersScreen from "./screens/App/NodesServersScreen";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LaunchScreen/>}/>
                <Route path="/onboarding" element={<OnboardingLayout/>}>
                    <Route index element={<OnboardingStartScreen/>}/>
                    <Route path="create" element={<OnboardingCreateScreen/>}/>
                    <Route path="import" element={<LaunchScreen/>}/>
                </Route>
                <Route path="/app" element={<AppLayout/>}>
                    <Route index element={<HomeScreen/>}/>
                    <Route path="nodes">
                        <Route index element={<NodesCountriesScreen/>}/>
                        <Route path="countries/:countryId" element={<NodesCitiesScreen/>}/>
                        <Route path="countries/:countryId/cities/:cityId" element={<NodesServersScreen/>}/>
                    </Route>
                    <Route path="account" element={<AccountScreen/>}/>
                    <Route path="settings" element={<SettingsScreen/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
