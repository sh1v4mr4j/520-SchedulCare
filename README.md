# 520-SchedulCare

## Server setup

1. Install fastapi
   ```bash
   pip install "fastapi[standard] pymongo python-dotenv"
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
