# MOVO Android

MOVO is an Android-only taxi platform with two separate connected apps:

- Rider Android app
- Driver Android app
- Laravel API backend

Design reference: uploaded Figma PDF export with Rider, Driver, MOVO Air, Cargo, safety, auth, receipt, and trip flows.

## Stack

- Frontend: React Native Expo, Android only
- Backend: PHP Laravel API
- First database: SQLite
- Later database: MySQL/PostgreSQL
- Maps: Mapbox first, Yandex Maps later
- Languages: Georgian, English, Russian
- Currency: GEL / ₾

## Structure

```text
apps/
  rider-android/
  driver-android/
backend/
  laravel-api/
packages/
  shared/
docs/
```

## First build target

The first milestone is an installable Android APK for the Rider app, then Driver APK, then real backend connection between both apps.
