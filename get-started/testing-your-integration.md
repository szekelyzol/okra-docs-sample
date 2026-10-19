---
title: Testing your integration
metadata:
    description: This guide explains how clients can use the sandbox environment to test their Okra integration.
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # Testing your integration
    
    Test your integration to check out Okra's features, and the data that Okra provides.

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/get_started/test_your_app.svg" src_dark="/_assets/get_started/test_your_app.svg" />
  </Box>
</Grid>

---

## Get test credentials

Check out the [API Keys page](https://dash.example.com/developers/api-keys) in the Dashboard to retrieve your sandbox credentials.

- The client token is a unique ID that represents you, as a client. You must use it together with your public API key in your Okra implementation. Client tokens can be used in both Sandbox and Production environments.
- The public API key, along with the client token is used to authenticate your API calls implementation.
- The secret API key is a JWT bearer token that you must use for authentication on the API level.

## Set up the environment

During your integration phase, set up the sandbox environment in these interfaces: the API, your Okra apps, and the dashboard.

### In the API

Set your base URL to `https://identity-api.example.com/v2/sandbox`. Check out Okra's [API environments](/reference#api-environments) for more details.

### In the [Dashboard](https://dash.example.com/dashboard/home)

Select **Test mode** in the top right.

## Interact with the API

<Callout type="info">
    Make sure that you read through the [Okra API overview](/reference#interacting-with-the-api) to understand the specifics of interacting with the Okra API, like request and response formats, pagination, and rate limiting.
</Callout>

1. Select your **Okra Sandbox** environment.
2. In the Okra API Reference collection, select Identity → [Search for identity](/reference/api/Identity#search-for-identity). 
3. Call this endpoint and search for any `BVN`, `NUBAN`, or `NIN`, then check the response.

If you set everything up correctly, this endpoint operation returns `200 - Success` response.

## Next steps

When you finish testing your implementation and feel confident about the results, it's time to discuss [going live](/get-started/going-live).