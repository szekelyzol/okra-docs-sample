---
title: Identity migration
meta:
  description: Learn how you can migrate your product to Okra's revamped Identity API.
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # Identity migration guide
    
    Learn how you can migrate your product to use Okra's revamped Identity API.

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/account_data/migration.svg" src_dark="/_assets/account_data/migration.svg" />
  </Box>
</Grid>

---

## Overview

In a recent update, we have released an updated version of the Identity API. This new version introduces three new API endpoints that replace all of the previous Identity API endpoints.

Since this is a breaking change, we have created this guide to help you with your migration to the new Identity API.

To ensure a smooth transition to the new endpoints, we are rolling out a phased migration process, enabling you to keep the old Identity endpoints active for a certain period. 

## List of changes

This secion gives you a summary of what has changed in this update.

### New endpoints

Okra now provides identity verification using NIN and NUBAN through these endpoints:

- [`/products/nin-verify`](/reference/api/Identity#nin-verify)
- [`/products/nuban-name-verify`](/reference/api/Identity#nuban-name-verify)

Operations that retrieve already verified identity profiles are now merged into a single search endpoint:

- [`/products/identity/search`](/reference/api/Identity#search-for-identity)

### New server URL

The base server URL for the Identity API is now `https://identity-api.example.com/v2/`

### Updated response structure

Check out a <code>200 - successful</code> response to understand the scope of the changes:

  The API now returns these fields in a `200 - successful` response:

  ```Response example
  {
    "success": {boolean},
    "message": {string},
    "data": {object}
  }
  ```
  * Note that the status indicator field `success` now uses `boolean` data format.
  
  The `data` object now returns only the `identity` and `receipt` objects:

  ```Response example
  {
    "data": {
      "identity": {object},
      "receipt": {object}
    }
  }
  ```
  * Note that the contents of the `identity` objects may vary between endpoints. Check out the [API reference](/reference/api/Identity) to see the exact response schemas.

### Deprecations

<Callout type="warning">

  All `verify` routes from the previous version of the Identity API are now deprecated.
</Callout>

- `/products/kyc/nuban-name-verify`
- `/products/kyc/customer-verify`
- `/products/kyc/nin-verify`

<Callout type="warning">

  All `get` identity operations are now also deprecated in favor of the new `search` endpoint.
</Callout>

- Get by identity `ID`
- Get by BVN
- Get by NUBAN
- Get by NIN
- Get by Phone number
- Get by customer `ID`
- Get for a single user
- Get for all users

## Migrate to the new endpoints

You can follow these steps to ensure that your implementation of Okra's Identity API works as expected.

<Steps>
  <Step title="Update server URL">
  
  Update the server URL for any function that uses the Identity API to the new URL:
  
  <br/>
  
  - `https://identity-api.example.com/v2/`

  <br/>

  </Step>

  <Step title="Update endpoint paths">
  
  Make sure that you update the endpoint paths that you use when calling the Identity API. The new routes are:

  <br/>

  - [`/products/nin-verify`](/reference/api/Identity#nin-verify)
  - [`/products/nuban-name-verify`](/reference/api/Identity#nuban-name-verify)
  - [`/products/identity/search`](/reference/api/Identity#search-for-identity)

  <br/>
  
  <Callout type="info">
      All `get` identity operations from the previous version of the Identity API are now merged into the new `search` endpoint. Use this endpoint to retrieve the identity profiles of already verified users.
  </Callout>

  </Step>

  <Step title="Check request and response schemas">

  All new identity endpoints come with updated request and response schemas. This means that the requests you need to send and the response data you receive may be different in the new version.

  <br/>
  
<Callout type="warning">
    While you can directly map functionalities between the old and new endpoints, the request and response schemas for these endpoints are not identical. Check out the [API reference](/reference/identity-api) and make sure that these changes do not affect your implementation.
</Callout>
  
  </Step>

  </Steps>

## Need help?

If you have any questions or need assistance during this transition, feel free to [reach out to our support team](mailto:support@example.com)!