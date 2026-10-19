---
title: Going live with Okra
meta:
  description: This page takes you through your onboarding, and helps you go live with Okra.
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # Going live with Okra
    
    Once your integration is tested, you can switch to production and test some more with a 100 free API calls. Our engineers and sales team are ready to support you in launching your app.

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/get_started/going_live.svg" src_dark="/_assets/get_started/going_live.svg" />
  </Box>
</Grid>

---

## Final steps

When you have tested your integration in the sandbox environment and want to go live with your product, get in touch with the [Okra Sales team](mailto:sales@example.com).

The Sales team makes sure that you finished your onboarding and that your business needs are satisfied. The team then connects you with an Okra engineer who verifies that your integration is running optimally. Okra recommends that you take a look at the [integration best practices](/get-started/going-live#best-practices) before you switch to production.

Once your integration is verified, you need to:

- Top up your wallet and reach out to the [Okra Sales team](mailto:sales@example.com) to confirm your pricing plan.
- Switch API keys from sandbox to production in your app.
- Set the base URL of your application's requests to the [production environment](/reference#api-environments).
- Okra recommends that you only launch your product to a subset of your users. This can help you fine-tune your workflows before scaling up to a larger user base.

## Best practices

This section describes some of the key concepts and best practices that you can adopt for a smooth integration experience.


<details>
<summary><b>Understand how authentication works.</b></summary>
<p>

Okra’s API uses bearer authentication. There are 3 kinds of keys you must use in your implementation: the **client token,** the **public API key**, and the **secret API key**.

Visit the [API overview](/reference#authentication) understand more about your different API keys, and how you can retrieve them from the dashboard.

</p>

</details>


<details>
<summary><b>Understand the different API environments.</b></summary>
<p>

Okra’s API operates in two environments: **sandbox** and **production**.

- Sandbox is for development purposes and to test Okra’s features without affecting real data. All API calls in the sandbox environment are free.
- Production is used to access real-time data when your product is ready to live.

Make sure that you always match your API keys to the environment you are working in.

</p>

</details>


<details>
<summary><b>Handle API responses appropriately.</b></summary>
<p>

Make sure that your integration handles:

- Paginated responses.
- `null` values.
- `204 - No content` responses. Some API endpoints return this status code, with no content in the body of the response.
- `400`, `401`, `500`, and timeout errors. Okra recommends that you log the `request_id` of error responses in case you need to reach out to the Support team. This ID can help speed up the troubleshooting process.

Read more about how the handle responses from the Okra API in the [API reference](/reference).

</p>

</details>


<details>
<summary><b>Be prepared for non-breaking changes.</b></summary>
<p>

The Okra team is continuously working to improve the API. This means that changes in the API may happen. Make sure that any   potential non-breaking changes in Okra's API will not affect your integration. Some examples:

- New fields or a different field order in the response body
- Change in the number of characters in a string
- Adding new endpoints

</p>

</details>