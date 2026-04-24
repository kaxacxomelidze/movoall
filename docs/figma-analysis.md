# MOVO Figma/PDF Analysis

The uploaded design export contains 168 pages. It is not organized as a clean implementation folder, so development will use this document as a screen map and cleanup plan.

## Main Rider flows

### Auth / onboarding

- Phone number entry
- OTP verification
- Name entry
- Terms and privacy agreement
- Welcome screen
- Location permission
- Saved addresses

### Taxi ride

- Home map
- Select pickup and destination
- Recent and saved places
- Ride class selection
- Price locked / guaranteed ride messaging
- Confirm ride
- Assigning driver
- Driver arriving
- Driver arrived with verification code
- On trip
- Cancel ride reasons
- Call driver
- Driver details
- Chat/support
- Safety tools
- Completed ride
- Feedback/tip
- Trip receipt

### Cargo

- Cargo requirement form
- Pickup and delivery addresses
- Sender/recipient phones
- Delivery protection code
- Parcel details and weight
- Courier notes
- Delivery guidelines

### MOVO Air

- City-to-city route
- Airport departure/destination
- MOVO Air selection
- MOVO Air info page
- Unavailable route state
- On-trip Air screen
- Air receipt variant

## Driver app planned flows

The exported PDF includes many Rider screens first. Driver app will be implemented as a separate Android app connected to the same backend.

Planned Driver MVP:

- Driver login
- Online/offline dashboard
- Incoming ride request
- Accept/decline ride
- Navigate to pickup
- Arrived at pickup
- Start ride after verification code
- Complete ride
- Earnings
- Profile

## Implementation priority

1. Shared design system
2. Rider app auth/onboarding
3. Rider map and taxi booking flow
4. Cargo flow
5. MOVO Air flow
6. Laravel API + SQLite
7. Driver app
8. Realtime Rider/Driver connection
9. APK builds
