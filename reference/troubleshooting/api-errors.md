---
title: API errors
meta:
  description: An overview of all the API errors on the client and server side
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # API errors
    
    An overview of all the errors you might encounter when interacting with the Okra API.

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/troubleshooting/api_errors.svg" src_dark="/_assets/troubleshooting/api_errors.svg" />
  </Box>
</Grid>

---

### Overview

The Okra API uses standard HTTP response codes for success and failure notifications. In general:

- 2xx codes indicate success,
- 4xx codes indicate developer or user-related failures,
- 5xx codes indicate Okra-related issues.

| API              | SINGLE_LINK  |
| :--------------- | :----------- |
| SOCKET_ID        | USSD         |
| SLA              | SUSPENDED    |
| RATE_LIMIT       | FLAGGED_USER |
| ENV              | EMPTY_QUEUE  |
| QUEUE_FAILED     | MAX_RETRY    |
| DUPLICATED_QUEUE | FAILED_QUEUE |
| PLAN             | SELECTOR     |
| EXPIRED          | CUSTOM       |
| KILL             | NO_RECORD_ID |

### Breakdown of an Okra error

| Name      | Description                                                                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`  | The HTTP status code associated with the error. This will only be returned in the response body when the error information is provided via a webhook.                  |
| `message` | A user-friendly representation of the error code. null if the error is not related to user action.<br/>This may change over time and is not safe for programmatic use. |
| `data`    | Response data from the API, including the details of the successful or failed response.                                                                                |
| `method`  | The method that performs the error function                                                                                                                            |
| `code`    | The particular error code                                                                                                                                              |
| `type`    | A broad categorization of the error. Safe for programmatic use. Possible values: `SUSPENDED`, `EMPTY_QUEUE`, `FLAGGED_USER`, `NO_RECORD_ID`, `RATE_LIMIT`              |

### API errors

| Error Code | Description                                                                                                                                    |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| 404        | The API Route you're using doesn't exist. Check our documentation and confirm the route.                                                       |
| 400        | The API call failed. Please check the message payload.                                                                                         |
| 429        | Too many requests. You can try again in 60 seconds. Check out more on [Rate Limits](/reference#rate-limiting) |
| 503        | Returned whenever a request takes more than 1 minute to complete.                                                                              |
| 5XX        | Something went wrong on our side.                                                                                                              |

<Callout type="success">
    The `503` timeout error is returned by these endpoints:

  - [`/products/nin-verify`](/reference/api/Identity#nin-verify)
  - [`/products/nuban-name-verify`](/reference/api/Identity#nuban-name-verify)

Some identity verification processes that time out eventually finish successfully. We strongly recommend that you implement an automatic retry for your requests to these endpoints. Add a short delay to your automatic retries to ensure that you handle 503 timeout errors successfully.
</Callout>

#### `503` error response

```json
{
  "status": "error",
  "message": "Our data source has returned a timeout response. Please retry the request. "
}
```
