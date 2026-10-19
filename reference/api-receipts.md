---
title: "API receipts"
breadcrumbs: false
---

<Grid cols="2" gap="3">
  <Box>
    # API receipts
    
    Okra uses receipts to provide confirmation and details about your payments for the services and products that you use.

    <br></br>
  </Box>
  <Box height="auto">
    <Image src="/_assets/okra_api/api_receipts.svg" src_dark="/_assets/okra_api/api_receipts.svg" />
  </Box>
</Grid>

---

Receipts are important because they provide transparency about the services that you get for your payments. Use them to monitor billing information, check balances, and confirm the accuracy of charges for the specific products that you use.

### How it works

The Okra API returns a `receipt` object in the response every time you make a successful request to any of the paid endpoints.

Check out the response schemas for these endpoints by clicking on the `200` responses to understand the data you receive:

- [Nuban name verify](/reference/api/Identity#nuban-name-verify)
- [NIN verify](/reference/api/Identity#nin-verify)

### Sample response

This is an example `receipt` object:

```json Receipt object
{
  "receipt": {
    "charge_breakdown": {
      "vat": 0
    },
    "breakdown": {
      "billable_product": {
        "effective_credits": 0,
        "credits": 1.2,
        "status": true,
        "addon_products": [],
        "product": "identity"
      },
      "discount": 0,
      "billable_products": [
        {
          "effective_cost": 0,
          "cost": 1.2,
          "status": true,
          "addon_products": [],
          "_id": "151192560881d80039671f04",
          "archived": false,
          "product": "identity"
        }
      ],
      "source": "api",
      "limit": "3"
    },
    "billingStatus": true,
    "paid": true,
    "method": "wallet",
    "charge": 1.2,
    "wallet_balance": 2462.7,
    "addons": [],
    "_id": "151192560881d80039671f03",
    "plan_term": "prepaid",
    "owner": "1da6358130a943486f33dced",
    "type": "api-call",
    "billable_product": "identity",
    "currency": "Okra Credits",
    "record": "1511924f0881d80039671ed9",
    "customer": "148066e0ba2052002ec63265",
    "current_project": "1ff62b99aea7a57a5c3baa01",
    "billable_service": "nuban-name-verify",
    "created_at": "2023-09-25T13:59:50.382Z",
    "last_updated": "2023-09-25T13:59:50.382Z"
  }
}
```
