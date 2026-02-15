# Patient Vitals App

A small example app (frontend + backend) for tracking patient records and vitals, and performing a simple risk assessment.

**Node:** 24.13.0 (used)

**Contents**
- **How to Run the Application**
- **API Routes Documentation**
- **Improvements if Given More Time**

---

**How to Run the Application**

- **Prerequisites:**
  - Install Node.js (v24.13.0 recommended)
  - Git (optional)

- **Backend (API)**:
  1. Open a terminal and change to the backend folder:

     ```powershell
     cd backend
     ```

  2. Install dependencies:

     ```powershell
     npm install
     ```

  3. Start the backend in development mode (uses `ts-node-dev`):

     ```powershell
     npm run dev
     ```

  4. The backend listens on port `5000` by default and exposes routes under `/api/v1` (e.g. `http://localhost:5000/api/v1/patients`).

- **Frontend (UI)**:
  1. Open a new terminal and change to the frontend folder:

     ```powershell
     cd frontend
     ```

  2. Install dependencies:

     ```powershell
     npm install
     ```

  3. Start the development server (Vite):

     ```powershell
     npm run dev
     ```

  4. The frontend will typically run on `http://localhost:5173` (Vite default). The UI communicates with the backend at `http://localhost:5000/api/v1`.

---

**API Routes Documentation**

Base path: `/api/v1`

- **Create Patient**
  - Method: POST
  - Path: `/api/v1/patients`
  - Request body (JSON):

    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "age": 45,
      "gender": "Male",
      "status": "Active",
      "phone": "09111111111",
      "lastDateVisit": "2024-01-01T00:00:00.000Z" // optional
    }
    ```

  - Validation: `firstName`, `lastName` (strings), `age` (0-120), `gender` (Male|Female|Other), `status` (Active|Inactive), `phone`.
  - Response: `201 Created` with the created patient object (includes generated `patientId` and empty `visits` array).

- **Get All Patients**
  - Method: GET
  - Path: `/api/v1/patients`
  - Request body: none
  - Response: `200 OK` with an array of patient objects.

- **Get Patient By ID**
  - Method: GET
  - Path: `/api/v1/patients/:id`
  - Request body: none
  - Response: `200 OK` with the patient object (their `visits` are returned sorted newest-first). If patient not found: `404` with `{ message: "Patient not found" }`.

- **Add Visit (Vitals) to Patient**
  - Method: POST
  - Path: `/api/v1/patients/:id/visits`
  - Request body (JSON):

    ```json
    {
      "heartRate": 72,
      "systolic": 120,
      "diastolic": 80,
      "temperature": 36.6,
      "weight": 70,
      "height": 1.75,
      "notes": "optional note"
    }
    ```

  - Validation: `heartRate` (20-250), `systolic` (50-300), `diastolic` (30-200), `temperature` (30-45), `weight` (1-500), `height` (required). `notes` optional.
  - Response: `201 Created` with the visit object (includes computed `bmi` and `timestamp`). If patient not found: `404`.

- **Risk Assessment**
  - Method: POST
  - Path: `/api/v1/risk-assessment`
  - Request body (JSON):

    ```json
    {
      "age": 62,
      "systolic": 140
    }
    ```

  - Behavior: Calculates a simple risk score and risk level using the age and systolic pressure.
  - Response: `200 OK` with JSON like:

    ```json
    {
      "riskScore": 63.0,
      "riskLevel": "Moderate Risk"
    }
    ```

---

**Notes on Data & Errors**
- Data is stored in-memory (no persistent database) in `backend/src/models/patient.model.ts` as an array.
- Validation errors are returned by the middleware (Joi) with `4xx` status codes as appropriate.

---

**🚀 Improvements if Given More Time**

1. **Persist data with a real database**: Replace the in-memory store with a persistent database (PostgreSQL, MySQL, or MongoDB). Add migrations and a small ORM (Prisma, TypeORM, or Sequelize) so patient records and visits persist across restarts.

2. **Authentication & Authorization**: Add user accounts and role-based access control so that only authenticated users can create/read/update patient data. Protect API endpoints with JWT or session-based auth and add per-user auditing.

3. **Input validation & error handling improvements**: Centralize error responses and return consistent API error shapes. Expand validation (e.g., cross-field validation) and improve feedback in the UI.

4. **Refactor frontend to use more robust state management & code-splitting**: Adopt patterns such as colocation of data-fetching (React Query already present) and split large components into smaller, testable units. Add unit/integration tests for critical flows.

5. **E2E tests & CI**: Add automated tests (Jest, React Testing Library for frontend, supertest/mocha for backend) and configure CI (GitHub Actions) to run tests and linting on each PR.

---

If you'd like, I can also add a short Postman collection, example cURL commands, or wire up a simple SQLite DB and migrations to demonstrate persistence—tell me which you'd prefer.
