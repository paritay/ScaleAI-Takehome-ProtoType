# 🧠 Supabase Setup

This folder contains SQL scripts to set up the required database tables, triggers, and logic for the Auto Damage Estimator Prototype.

## Files

- `schema.sql`: Core schema for `claims`, `vehicle_photos`, and the Zapier webhook trigger
- `seed.sql`: Dummy data to test the system
- `policies.sql`: (Optional) RLS rules

## Setup Instructions

1. Open your Supabase SQL Editor
2. Copy and paste `schema.sql` to create the tables and trigger
3. Optionally run `seed.sql` to add test data
