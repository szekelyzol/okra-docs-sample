---
title: Identity overview
meta:
  description: This page explains how the Okra Identity API helps you verify users' identities by accessing the information stored with their financial institution.
breadcrumbs: false
---

# Identity API

The Okra Identity API helps you verify users' identities by accessing the information stored with their financial institution. The API retrieves a full KYC profile for an individual or corporate account across all banks in Nigeria.

For a complete guide on how the Identity API works and how you can use it, visit the [Identity guide](/account-data/identity).

## Operations

The Identity API has 2 types of operations: `verify` and `search`.

<Callout type="info">
Okra recommends that you use the `verify` operations to verify customers and retrieve their identity details **only for the first time**. These operations debit your Okra wallet after every successful verification. To avoid depleting your wallet, use the `search identity` operation for customers that you have already verified.
</Callout>

### `Verify` operations

Use any of the `verify` operations according to your business case. These operations can verify a new user and retrieve their identity details:

- The [`nuban-name-verify`](/reference/api/Identity#nuban-name-verify) operation retrieves a user’s full name using their NUBAN. This operation is ideal for use cases where a complete KYC profile is not necessary.
- The [`nin-verify`](/reference/api/Identity#nin-verify) operation verifies user's identity using their National Identification Number (NIN) issued by Nigeria's National Identity Management Commission (NIMC). Okra's NIN verification empowers you to address various KYC needs across diverse industries.

### `search` operation

Use the `search identity` operation to retrieve the identity profiles of already verified users. You can fetch your users’ identity profiles using their identity `ID`, NUBAN, BVN, NIN, and customer `ID`.

## Best practices

- To avoid duplicate API calls for the same user, Okra recommends that you leverage the Identity API using this simple process:

  <Steps>
    <Step title="Use search">

    Use the `search identity` operation to retrieve a user’s identity.
    
    <br/>

    For example, you can use the `search` endpoint and provide a NUBAN in your request as an initial step. The next step depends on the response you receive:
    
    <br/>

    - A successful response means that the user is already verified and the API returns the identity profile for you to use.
    - An unsuccessful response means that the BVN is not found and the user is not yet verified.
    </Step>
    <Step title="Use verify if needed">
    
    If you receive an unsuccesful response, use a `verify` operation to verify the new user and retrieve their identity details.
    
    <br/>

    This process is simple, but important. The `search` endpoint operation is free to use. `verify` endpoint operations are paid operations that debit your Okra wallet. To avoid depleting your wallet, use the `search` operation first to retrieve identity profiles for customers that you have already verified. You can track the customers that you have already verified using their `NIN`, `BVN`, `NUBAN`, identity `ID`, or their customer `ID`.
    </Step>
  </Steps>

- Okra recommends that you implement:
  - front-end validation to prevent your users from accidentally triggering multiple `verify` requests in short succession through the onboarding flow.
  - a queue to wait for the results of a successful identity verification request. This can prevent duplicate `verify` requests for the same user.

## Error handling

The Identity API follows Okra’s standard [API error conventions](/reference/troubleshooting/api-errors). There are some error responses that are unique to the Identity API.

### `503 timeout` errors

#### Common causes

The `verify` operations can return a `503 timeout` error when a data source returns a timeout response. Some identity verification processes that time out eventually do finish successfully, therefore Okra strongly recommends that you implement an automatic retry for your requests to the `verify` operations.

#### Troubleshooting

Add a short delay to your automatic retries to ensure that you handle `503 timeout` errors successfully.

#### Sample response

```json
{
    "status": "error",
    "message": "Our data source has returned a timeout response. Please retry the request. "
}
```

### `nuban-name-verify` timeout errors

#### Common causes

The `nuban-name-verify` operation can return timeout errors when a NUBAN can not be verified to retrieve the identity data within the given timeout range that Okra enforces. The causes of this timeout can be due to:

- provider downtime or provider timeout issues,
- or the BVN linked to the requested account cannot be verified.

When a BVN cannot be verified, the possible reasons are:

- the requested account is not linked to a BVN,
- or the BVN is fraudulent.

#### Troubleshooting

Add a 1 hour delay to your automatic retries to ensure that you handle these timeout errors successfully.

#### Sample responses

This error occurs when the NUBAN can not be verified to retrieve the identity data within the given timeout range:

```json
{
    "status": "error",
    "message": "Could not match the nuban account to a valid identity."
}
```

This error occurs when you repeat the same `nuban-name-verify` request within 1 hour with the same result:

```json
{
    "status": "error",
    "message": "Invalid identity, please try again in 1 hour."
}
```

<Callout type="info">
Okra always returns errors with a corresponding error code, or a descriptive error message. Visit the [Error documentation](/reference/troubleshooting) for a complete list of errors. If you encounter an error that is not documented, get in touch with [Okra’s support team](mailto:support@example.com).
</Callout>