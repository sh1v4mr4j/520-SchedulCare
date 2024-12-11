# Contributing

## Current Contributors

| Name                | Email                                     |
| ------------------- | ----------------------------------------- |
| Daksha Ladia        | dladia@umass.edu                          |
| Nikhil Anand        | nikhilanand@umass.edu                     |
| Shivam Raj          | shivamrj83@gmail.com, shivamraj@umass.edu |
| Snigdha Ansu        | snigdhaansu@gmail.com, sansu@umass.edu    |
| Rakshita Srivastava | rakshitasriv@umass.edu                    |

## Tasks

| Feature                | Details                         | Assigned To        | Remarks                                     |
|------------------------|----------------------------------|--------------------| ------------------------------------------ |
| Login                 | Includes authentication         | Rakshita           | 
| Frontend setup        |                                  | Shivam             | 1. Setup the folder architecture for frontend and backend <br> 2. integrated webpack and babel to transpile the jsx code for the browser <br> 3. Created package.json and added initial dependencies so that it works in every machine <br> 4. Integrated cypress to test frontend changes <br> 5. Initialised routing in React <br> 6. Lots of PR reviews and comments do that all our team code is structured and clean. <br> 7. Integrated antd react component library to have baseline UX design. <br> Wrote different sample code files in different folder so that others can understand the architecture.
| Backend setup         |                                  | Nikhil             |
| Navbar                | antd                             | Shivam            | Created navbar to be used by different pages in the app 
| Patient Page          | Data fetch from backend         | Shivam             | 1. Fetched data from backend regarding the particular email of patient <br> 2. Displayed Calendar to scheule and appointment which is filtered <br>to the availability set up by the doctor. <br> 3. Fetched different doctor in the card view and populated the data.
| Doctor’s Page         | Data fetch from backend         | Daksha             |
| Chat Assistance       | Open AI                         | Daksha             |
| Payment Portal        | PayPal                          | Snigdha            |
| Backend development   | Fast API                        | Everyone will do their own backend | Shivam: Wrote backend routes, service and models for patient page and adding doctor. <br> 2. Was actively reviewing PRs to keep the backend code structured. 
| Map view             | Google Map                      | Nikhil             |
| Doctor’s calendar     | antd                             | Shivam             |
| Sign up               | Includes authentication         | Rakshita           |
| Email notification    | Fast Mail                       | Snigdha            |
| Cypress tests         | End-to-end                      | Every team member  |
| Video editing         | merge the videos               | Shivam, Snigdha         |




### Creating a Branch

1. Ensure you are on the `main` branch:
   ```sh
   git checkout main
   ```
2. Pull the latest changes:
   ```sh
   git pull origin main
   ```
3. Create a new branch for your feature or bug fix:
   ```sh
   git checkout -b your-branch-name
   ```

### Creating a Pull Request

1. Push your branch to the remote repository:
   ```sh
   git push origin your-branch-name
   ```
2. Navigate to the repository on GitHub.
3. Click on the "Compare & pull request" button next to your branch.
4. Fill out the PR template with details about your changes.
5. Submit the pull request.

Your pull request will be reviewed, and feedback may be provided. Once approved, it will be merged into the `main` branch.
