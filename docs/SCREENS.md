# Screens & Navigation Logic

## Screens

Entry point to the app is located in `App.tsx` file. It is a simple component that renders `BrowserRouter`
from `react-router-dom` library. This component is responsible for rendering all the screens in the app. It also
provides a navigation prop to all the screens in the app.

Initially, the app renders `LaunchScreen` component. This component is responsible for loading current state data from
local API and identifying whether wallet is created locally on the device. If wallet is created, it navigates to the
app. If not — to onboarding process.

The two remaining parts of the app are divided into two layouts: `AppLayout` and `OnboardingLayout`. The first one is
responsible for rendering the app itself when wallet is already there and onboarding was completed. The second one is
onboarding, which is shown only on the first launch.

All `AppLayout` screens are being served with `/app` path prefix.
All `OnboardingLayout` screens are being served with `/onboarding` path prefix.

## Navigation Logic

### Onboarding

* `/onboarding` — Onboarding Start Screen. It is the first screen that user sees when he launches the app for the first
  time.
* `/onboarding/create` — Mnemonic Creation Screen. It is the screen where user can create a new mnemonic.
* `/onboarding/import` — Mnemonic Import Screen. It is the screen where user can import an existing mnemonic.

### App

#### Home

* `/app` — Home Screen. It is the screen where user can see current connection state, balance and selected node.

#### Node Selection
* `/app/nodes` — Node Selection Screen with list of countries. It is the screen where user can select a country to
  connect to. Selection is then used at `/app/nodes/:countryId` screen.
* `/app/nodes/:countryId` — Node Selection Screen with list of cities. It is the screen where user can select a city to
  connect to. Selection is then used at `/app/nodes/:countryId/cities/:cityId` screen.
* `/app/nodes/:countryId/cities/:cityId` — Node Selection Screen with list of nodes. It is the screen where user can
  select a node to connect to.

#### Account
* `/app/account` — Account Screen. It is the screen where user can see current balance and wallet details such as wallet
  address and QR code.

#### Settings
* `/app/settings` — Settings Screen. It is the screen where user can see current settings and access ToS and PP.
