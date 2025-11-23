## hack-eps-frontend

Frontend application for the Hack EPS project — React + TypeScript + Vite + Chakra UI.

This README documents how to run the app locally and how to test the recent farm changes (new fields: inventory and average weight).

## Quick Start

Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Open the app in your browser (Vite will show the local URL, usually `http://localhost:5173`).

## New/Important Features

- These fields are available in the UI:
  - Add Farm modal and Edit Farm modal include inputs for Inventory and Avg Weight.
  - Farm list/table shows Inventory and Avg Weight columns.
  - Map popups (entity cards) display Inventory and Avg Weight if present.

## How to test create / edit (frontend)

1. Start the dev server:

```powershell
npm run dev
```

2. Open the Farms page in the app.
3. Click `Add Farm` and fill the form including `Inventory (pigs)` and `Avg Weight (kg)`. Submit.
4. Click a farm and open `Edit` to change the Inventory or Avg Weight — save and confirm changes appear in the table and on the map popup.

If something doesn't persist, open the browser devtools Console and Network tabs to inspect the POST/PUT request payloads.

## API endpoints (frontend expects)

- GET /api/farms — list farms
- POST /api/farms/init-farm — create farm (JSON body)
- PUT /api/farms/:id/edit — update farm (JSON body)
- DELETE /api/farms/delete?farm_id=... — domain-style delete (fallbacks exist)
- DELETE /api/farms/:id — fallback RESTful delete
- POST /api/farms/import-csv — import CSV (FormData with `file` field)

When creating/updating a farm, the frontend sends JSON with fields such as:

```json
{
  "name": "My Farm",
  "lat": 41.6,
  "lon": 0.6,
  "capacity": 1000,
  "inventory_pigs": 500,
  "avg_weight_kg": 60.5
}
```

## Debugging client requests

- The frontend logs request payloads for create/update in the browser console when using the default dev build. Look for `farmService.create payload:` and `farmService.update id:` logs.
- If the payload contains the new fields but the database shows no values, the problem is server-side (schema or handler missing fields).

## Backend persistence guidance

Make sure your backend accepts and persists the two new fields. Example snippets for common stacks:

- Express + Mongoose (Node.js)

  1. Add schema fields to your Mongoose model for Farm:

  ```js
  const FarmSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lon: Number,
    capacity: Number,
    inventory_pigs: { type: Number, default: 0 },
    avg_weight_kg: { type: Number, default: 0 },
    // ... other fields
  })
  ```

  2. In create/update handlers, read these values from `req.body` and store them:

  ```js
  const { name, lat, lon, capacity, inventory_pigs, avg_weight_kg } = req.body
  const farm = new Farm({ name, lat, lon, capacity, inventory_pigs, avg_weight_kg })
  await farm.save()
  ```

- FastAPI + Pydantic (Python)

  1. Update your Pydantic model/schemas to include optional fields:

  ```py
  class FarmCreate(BaseModel):
      name: str
      lat: float
      lon: float
      capacity: int
      inventory_pigs: Optional[int] = 0
      avg_weight_kg: Optional[float] = 0.0
  ```

  2. Use these fields when inserting/updating the DB record.

## CSV import

- The frontend posts files to `/api/farms/import-csv` as FormData with field name `file`.
- Ensure your import routine maps CSV column names (e.g., `inventory`, `inventory_pigs`, `avg_weight`, `avg_weight_kg`) to the DB fields.

## Next steps & troubleshooting

- Run the dev server and test create/edit flows. If edits do not persist:
  - Confirm the network request payload includes `inventory_pigs` and `avg_weight_kg` (use Browser DevTools -> Network).
  - Inspect backend logs; verify request body parsing (JSON) is enabled and your create/update handlers store the fields.
- If you want, tell me which backend stack you use and I can prepare a ready-to-apply patch for the server.

## Contributing

Pull requests welcome — please run `npm install` and `npm run dev` locally and follow the patterns already in the codebase.
