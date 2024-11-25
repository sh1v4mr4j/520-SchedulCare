# 520-SchedulCare

## Server setup

1. Install fastapi. Run from `server` dir
   ```bash
   pip install -r requirements.txt
   ```
2. Navigate to `server/app` dir and set your python path
   ```bash
   export PYTHONPATH=$PWD
   ```
3. Run the server
   ```bash
   fastapi dev main.py
   ```

## Adding endpoints [devs only section]

1. Create a file for your module if does not exist
2. Add your routes in the file. Refer to [patient_router.py](server/app/routers/patient_router.py)
   - Use `APIRouter` to create child routes
3. Add your router in [main.py](server/app/main.py) with the prefix

## Connecting with Mongo

1. Once done creating a Mongo account and getting added to the database. Create a `.env.dev` file in the server directory.
2. Create a variable in the said file `MONGO_URI=<your_mongo_url>`
   - When getting the Mongo URL, select the language to be Python.
   - **DO NOT COMMIT** this file. (thanks!)

## Using cypress testing

1. Once done creating an end-to-end test in client/cypress/e2e, view the test work using `npx cypress open`. Make sure the application is already running.
