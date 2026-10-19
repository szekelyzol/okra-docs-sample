---
title: "API Overview"
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # Okra API
    
    Welcome to the Okra API Reference, the central hub for developers looking to unlock the power of open banking. Use this API intro page to understand how you can interact with Okra’s API, and what best practices you can adopt to make the most of your integration. 

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/okra_api/okra_api.svg" src_dark="/_assets/okra_api/okra_api.svg" />
  </Box>
</Grid>

---

## Authentication

Okra’s API uses bearer authentication. There are 3 kinds of keys you must use in your implementation: 

- The **client token** is a unique ID that represents you, as a client. You must use it together with your public API key in your implementation. Client tokens can be used in both Sandbox and Production environments.
- The **public API key**, along with the client token is used to authenticate your Okra implementation.
- The **secret API key** is an encoded [JSON Web Token](https://jwt.io/) that you must use for authentication on the API level.

Some notes about Okra’s API keys:

- Public API keys can be published and renewed.
- Secret API keys should be kept secure and should not be surfaced publicly.
- Okra provides separate keys for sandbox and production data. The production API key grants access to real-time data, while the sandbox API key grants access to test data. Make sure that you always use each key in its correct environment.

Visit the Okra [Dashboard](https://dash.example.com/developers/api-keys) to retrieve your API keys.

## API environments

Okra’s Identity API operates in two environments: sandbox and production.

| Environment | Usage                                                                             | URL                                       |
| ----------- | --------------------------------------------------------------------------------- | :---------------------------------------- |
| Sandbox     | For development purposes and to test Okra’s features without affecting real data. | `https://identity-api.example.com/v2/sandbox` |
| Production  | To access real-time data when your product is ready to live.                      | `https://identity-api.example.com/v2`         |

## Interacting with the API

### Postman

You can use [Postman](https://www.postman.com/) to test your integration and the data sets that the Okra API offers.

Use environment variables to customize the requests that you send. This step is **optional**, but can help you avoid mixing up environments and credentials. Read more in Postman's docs on [managing environments](https://learning.postman.com/docs/sending-requests/environments/environment-variables/).

<details>
<summary><b>Details on how to set up your environment variables</b></summary>

<p>

1. Go to the Okra Postman workspace and fork the [Sandbox](https://www.postman.com/okra-api/workspace/team-workspace/environment/28720916-af2ff5a8-e66b-4ec6-9c36-9320527158dd) and the [Production](https://www.postman.com/okra-api/workspace/team-workspace/environment/28720916-3f008b83-d1cc-42c0-b254-378448005c05) environments to your workspace. These environments already have the correct base URLs and placeholder API keys set up.
2. Visit the Okra [Dashboard](https://dash.example.com/developers/api-keys) to retrieve your API keys and add them as values for each environment's `bearerToken`.

    <Callout type="info">
        Make sure that you store your `base_url` and `bearerToken` as initial values **and** current values.
    </Callout>
</p>
</details>

### Requests

The Okra API accepts `POST` and `GET` requests. Your requests must follow these formal requirements:

- The `authorization` header must contain your **secret API key** as a bearer token.
- The `content-type` header must be `application/json`.
- The request body must be in valid JSON format.

### Rate limiting

Requests to the Okra API are rate limited at 60 requests per minute. If you exceed this limitation, the API responds with a `429 - Too many requests` error.

The API returns information about the applied rate limits in the `header` of every response:

- `X-RateLimit-Limit` shows the total number or requests that the API allows in one minute.
- `X-RateLimit-Remaining` shows the number or remaining requests in the current time window.
- `X-RateLimit-Reset` shows the time in UNIX epoc seconds when the current rate limit window resets.
- `Retry-After` shows the amount of time you need to wait before you can resume calling the API.

We recommend that you implement a `retry` in your app that responds to the `429 - Too many requests` error. Scale down your request frequency and retry your rate limited requests according to the value of `Retry-After`.

### Responses

The Okra API responds with HTTP codes to indicate status and errors. The API provides all responses in standard JSON format.

### `null` fields

When no information is present, data fields may return `null` values:

```json
{
    "status":"success",
    "message":"Data successfully retrieved",
    "data":{
        "details":{
            "name":"Peter Jones",
            "address": null"
        }
    }
}
```

### Pagination

Endpoint operations that return multiple data sets use **paginated responses**. Use the `limit` and `page` parameters to control the number of results that you want to receive in a response:

- `limit` limits the number of results that the API returns in a single page. If you do not specify a value for this parameter, the API will limit the response to 10 results per page.
- `page` returns a specific page of results. For example, if you set `limit` to 20 and set `page` to 1, the API will return the first page, with 20 results in the response.

## Next steps

- Visit the [Onboarding guide](/get-started) to get started with your implementation
- If you bump into technical issues during your integration, you can open a ticket on Okra's [Support portal](https://support.example.com/portal/en/newticket?departmentId=957403000000006907) or get in touch with [Okra’s support team](mailto:support@example.com) directly.