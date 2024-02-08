# Project Name

## Project Setup

This is a Next.js application

`npm i`
`npm run dev`

## Backend Mock Setup

This project includes a mock setup for handling anomaly records within a digital service monitoring platform, akin to the detailed configuration and monitoring capabilities found in enterprise-level services like AWS.

### Mock Data

The mock data represents anomaly records for a digital service. Each record includes an ID, organization ID, customer ID, a timestamp, the metric being recorded, its value, and a read status to track whether the anomaly has been reviewed.

```json
[
  {
    "id": "1",
    "orgId": "123",
    "timestamp": "2022-01-01T09:00:00Z",
    "customerId": "123456",
    "metric": "pageViews",
    "value": 100,
    "read": false
  },
  {
    "id": "2",
    "orgId": "123",
    "timestamp": "2022-01-01T10:00:00Z",
    "customerId": "123456",
    "metric": "errorRates",
    "value": 5,
    "read": false
  },
  {
    "id": "3",
    "orgId": "123",
    "timestamp": "2022-01-01T11:00:00Z",
    "customerId": "123456",
    "metric": "responseTimes",
    "value": 450,
    "read": false
  }
]

### State Management with Zustand

Since overengineer was encouraged, I decided to use Zustand for managing global state in the application. Zustand provides a straightforward and minimalistic approach to state management, allowing us to efficiently implement features like real-time notifications updates across the application without the complexity and boilerplate code often associated with other state management libraries.

### Testing

I added simple tests that you can run it using `npm run test`

### Future

In a real world scenario, I'd add more loading-messages/error messages when there are errors and responsivness :) 
# mparticle-challenge
