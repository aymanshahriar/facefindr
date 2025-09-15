
# FaceFindr
A full-stack web application that allows users to register, log in, and submit image URLs. The application displays each submitted image and highlights any detected faces with bounding boxes. It also tracks and displays the total number of images submitted by each user.

![](readme_images/screenshot.jpeg)

## Technologies Used:
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: PostgreSQL

## Deployment Details:
The frontend, backend and database have been deployed using Vercel.
Link to deployed application: [https://facefindr-v1.vercel.app](https://facefindr-v1.vercel.app)

First create a database using vercel/supabase. The default database name will be postgres. Connect to this default database using a database client like VS Code Database Client JDBC, then create the facefindr_db database using the sql file in backend/database.

Then deploy the backend and specify the environment variables. The value of the POSTGRES_CONNECTION_STRING env variable should be the POSTGRES_URL that the vercel/supabase database provides, but make sure to set the database in that connection string to facefindr_db.

After deploying the backend, then deploy the frontend. Copy the backend's url and set that as the REACT_APP_API_URL environment variable.
