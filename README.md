## Full-Stack My library Application

### Getting Started
Follow these steps to get the application up and running on your local machine.

1. **Clone the Repository**
```bash
   git clone https://github.com/SergeyPoly/DataArt-FS-test-task.git
   cd DataArt-FS-test-task
```
2. **Backend Setup**\
   Navigate to the backend directory:
   ```bash
   cd backend
   ```
   ###### Database Configuration
    1. Create Databases:
        * Create a PostgreSQL database for development (e.g., library_db).
    2. Environment Variables:
        * Create a .env file in the backend/ directory (next to package.json).
        * Copy the contents from .env.example into your new .env file and replace placeholders with your PostgreSQL credentials.
    
   ###### Install Dependencies
   ```bash
   npm install
   ```
   ###### Start the Backend Server
   ```bash
   npm run start:dev
   ```
   The backend API will be available at http://localhost:5000/.


3. **Frontend Setup**\
   Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
   ###### Environment Variables
    1. Create .env:
        * Create a .env file in the frontend/ directory (next to package.json).
        * Copy the content from .env.example into your new .env file.

       Ensure VITE_API_BASE_URL matches the address of your running backend.

   ###### Install Dependencies
   ```bash
   npm install
   ```
   ###### Start the Frontend Application
   ```bash
   npm run dev
   ```

   The frontend application will be available at http://localhost:5173/.
