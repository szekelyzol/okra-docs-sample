---
title: "Okra IDs"
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # Okra IDs
    
    Dive deep into the different IDs that Okra uses and learn how you can ensure data continuity in your app.

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/okra_api/okra_ids.svg" src_dark="/_assets/okra_api/okra_ids.svg" />
  </Box>
</Grid>

---

This guide helps you understand the most important IDs that the Okra API uses, and offer some general best practices on how you can ensure data continuity in you applications.

The Okra API uses universal unique identifiers (`uuid`s) to identify specific data properties and records. These IDs are used across all endpoints to refer to the same information. For example, you can verify a customer's identity profile using [NIN verify](/reference/api/Identity#nin-verify), and grab the customer's `id` from the response. You can then use the same customer `id` to [retrieve the customer's KYC profile](/reference/api/Identity#search-for-identity) when you need it.

## Customer ID

|Description                                            |Used in                                                                                                           |Best practices                                                                                                                                                                                                                                                                                                                                           |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|This ID uniquely identifies a single user.|- API request and response payloads <br /> - the Okra Dashboard|Okra recommends that you save customer IDs in your DB. This enables you to identify users in your workflows, and to retrieve data for specific users through endpoints like [Search identity](/reference/api/Identity#search-for-identity).|



## Account ID

|Description                                                                        |Used in                                                                                    |Best practices                                                                                                                                                                                                                                       |
|-----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|This ID uniquely identifies a user's connected account, and the bank it belongs to.|- API request and response payloads|Okra recommends that you save account IDs in your DB.|

## Bank ID

|Description                                                                                                                                                            |Used in                            |Best practices                                                                                                                                                                                                                                                                                                                               |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|This ID uniquely identifies the bank where the customer has an account. Visit Okra's [Coverage](/account-data/account-data-coverage) page for the list of bank IDs.|- API request and response payloads|Okra recommends that you save bank IDs in your DB.  
  
Use bank IDs to retrieve data from endpoints like [NUBAN name verify](/reference/api/Identity#nuban-name-verify).

## Need help?

1. If you encounter any errors during your integration journey, check out the [Error documentation](/reference/troubleshooting).
2. If you have any questions about Okra's products or way of working, get in touch with the [Support team](mailto:support@example.com).
3. If you bump into technical issues during your integration, you can open a ticket on Okra's [Support portal](https://support.example.com/portal/en/newticket?departmentId=957403000000006907).