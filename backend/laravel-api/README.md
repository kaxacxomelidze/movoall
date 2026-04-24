# MOVO Laravel API

This folder is reserved for the Laravel backend API.

## First database

SQLite will be used first for fastest setup.

```bash
cd backend/laravel-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Planned API modules

- Auth: phone OTP, email, Google, Apple placeholder
- Riders
- Drivers
- Taxi rides
- Cargo deliveries
- MOVO Air bookings
- Payments
- Receipts
- Safety events
- Realtime ride status

## First API endpoints

```text
POST /api/auth/email/login
POST /api/auth/email/register
POST /api/rides/estimate
POST /api/rides/request
POST /api/rides/{ride}/assign-driver
POST /api/rides/{ride}/status
POST /api/cargo/request
POST /api/air/request
GET  /api/driver/requests
POST /api/driver/requests/{ride}/accept
POST /api/driver/rides/{ride}/complete
```
