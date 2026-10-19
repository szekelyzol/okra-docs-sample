---
title: Identity
meta:
  description: Learn how Okra provides KYC data for identity verification
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # Identity
    
    Get the most of your business by instantly retrieving full bank-vetted identity profiles from users’ bank accounts.

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/account_data/identity.svg" src_dark="/_assets/account_data/identity.svg" />
  </Box>
</Grid>

---

## Overview

Identity verification is an essential security step when authenticating users. Okra's real-time data service reduces risk and fraud by providing identity profiles directly from financial institutions. Okra’s Identity API allows users with online or mobile banking to validate their financial data ownership, enabling you to safely unlock your services.

## How it works

The Okra Identity API helps you verify users' identities by accessing the information stored with their financial institution. The API retrieves a full KYC profile for an individual or corporate entity across all banks in Nigeria. You can access a user's full name, phone number, email address, mailing address, and many other details. Use this data to pre-fill account details and verify that the information provided by your user is correct.

The Identity API helps you to make the most of your business case by instantly retrieving a full identity profile, and enables you to authenticate your users’ accounts in real time.

Depending on your use case, the API can return data points like these:

- BVN
- BVN identity photo
- DTI (Debt-to-Income score)
- Mother’s maiden name
- Full name or company name
- Gender
- Date of birth
- Email addresses
- Mailing addresses
- Phone numbers
- Photo IDs

Okra's Identity API enables you to improve your product and decision-making processes. It can be used for identity verification for loan or credit decisioning, age or name verification, checking company background, and similar use cases.

## How to use

This guide explains how you can retrieve your users' identity details with the Identity API’s `verify` and `search` endpoint operations. Okra recommends that you leverage the Identity API using this simple process:

1. **Use the [`search`](/reference/api/Identity#search-for-identity) operation to retrieve a user’s identity.**

   For example, you can use the `search` endpoint and provide a NUBAN in your request as an initial step. The next step depends on the response you receive:

   - A successful response means that the user is already verified and the API returns the identity profile for you.
   - An unsuccessful response means that the NUBAN is not found and the user is not yet verified.
2. **If you receive an unsuccesful response, use a `verify` operation to verify the new user and retrieve their identity details.**

Visit the **[API reference](/reference/identity-api#operations)** for the complete list of Identity endpoint operations, and the recommended best practices on how to make the most of the Identity API.

## Sample objects

These are sample requests and responses for `verify` operations:

<CodeSelect title="Verify operation samples">
``` Request
curl -X POST https://identity-api.example.com/v2/products/nuban-name-verify
-H 'Content-Type: application/json'
-d '{
  "nuban" : "06*****4",
  "bank" : "5d6fe57a4******210bbeb1"
}'
```
``` Response
{
   "success":true,
   "message":"Account Retrieved successfully",
   "data":{
      "identity":{
         "name":"Phoebe Buffay",
         "nuban":"06*****4"
      },
      "receipt":{
         "status":true,
         "msg":"Receipt has been successfully created",
         "data":{
            "receipt":{
               "charge_breakdown":{
                  "vat":0
               },
               "breakdown":{
                  "billable_product":{
                     "effective_credits":0,
                     "credits":1.2,
                     "status":true,
                     "addon_products":[
                        
                     ],
                     "product":"identity"
                  },
                  "discount":0,
                  "billable_products":[
                     {
                        "effective_cost":0,
                        "cost":1.2,
                        "status":true,
                        "addon_products":[
                           
                        ],
                        "_id":"1530ef70eef4f5003ca8276a",
                        "archived":false,
                        "product":"identity"
                     }
                  ],
                  "source":"api",
                  "limit":"3"
               },
               "billingStatus":true,
               "paid":true,
               "method":"wallet",
               "charge":0.7,
               "wallet_balance":2079.1,
               "addons":[
                  
               ],
               "_id":"1530ef70eef4f5003ca82769",
               "plan_term":"prepaid",
               "owner":"1da6358130a943486f33dced",
               "type":"api-call",
               "billable_product":"identity",
               "currency":"Okra Credits",
               "record":"1530ef6deef4f5003ca82756",
               "customer":"1530edc5c58381003baf71ff",
               "current_project":"1ff62b99aea7a57a5c3baa01",
               "billable_service":"nuban-name-verify",
               "created_at":"2023-10-19T08:57:20.447Z",
               "last_updated":"2023-10-19T08:57:20.447Z"
            }
         }
      }
   }
}
```
</CodeSelect>

Visit the **[API reference](/reference/identity-api)** for a complete list of operations and sample responses.

