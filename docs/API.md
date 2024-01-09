# API Service

All the API methods are available via `APIService` class.

## POST `setKey`

Save a key-value pair to the local storage. `is_secure` flag indicates whether the value should be encrypted or not.

### Payload:

```
{
    key: string
    value: string
    is_secure: boolean
}
```

## GET `getKey`

Retrieve a value from the local storage by key.

## DELETE `deleteKey`

Delete a value from the local storage by key.

## POST `registerDevice`

### Payload:

```
{
    platform: string # (IOS, ANDROID, OTHER)
}
```

Register device with remote API. This method is called on the first launch of the app.

## GET `getDevice`

Retrieve information about registered device from the remote API.

## POST `createWallet`

Create a new local wallet.

### Payload:

```
{
    mnemonic: string
}
```

## GET `getWallet`

Get information about local wallet.

## GET `getBalance`

Get information about current account balance.

## GET `getIpAddress`

Get current IP address.

## GET `getCountries`

Get list of countries from remote caching API.

## GET `getCities`

Get list of cities for specified country from remote caching API.

## GET `getServers`

Get list of servers for specified city from remote caching API.

## GET `getPlans`

Get available plans from blockchain.

## GET `getSubscriptions`

Get current account subscriptions from blockchain.

## POST `subscribeToPlan`

Subscribe to a plan.

### Payload:

```
{
    denom: string
    address: string
}
```

## GET `getSession`

Get current session information.

## POST `createSession`

Create a new session (cancelling active one, if specified).

### Payload:

```
{
    activeSession?: number,
    subscriptionID: number,
    node: string
}
```

## GET `fetchCredentials`

Fetch credentials for a session from remote node.

### Payload:
```
{
    url: string
    nodeProtocol: string
    address: string
    session: number
}
```

## GET `getStatus`

Get current connection status.

## POST `connect`

Connect to a server.

## POST `disconnect`

Disconnect from a server.
