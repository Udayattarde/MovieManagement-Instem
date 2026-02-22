A Movie Management system developed using ASP.NET Core and Angular that allows users to browse, search, create, update, and delete movies backed by a SQL Server database.


Technology Stack

Backend

ASP.NET Core (.NET 8)

Entity Framework Core

CQRS Pattern

REST API

Frontend

Angular 17 (Standalone Components)

TypeScript

Database

SQL Server 


🚀 How to Run the Application

Prerequisites

Install:

.NET 8 SDK+

Node.js (v18+)

Angular CLI

SQL Server LocalDB


Run Backend

The solution follows Clean Architecture where:

• MovieManagement.Infrastructure contains DbContext and EF Core migrations  
• MovieManagement.Api is the startup project

From solution root run:

dotnet ef database update --project MovieManagement.Infrastructure --startup-project MovieManagement.Api

This will automatically create the database and seed initial movie data.

Then start the API:

cd MovieManagement.Api
dotnet run

API runs at:

https://localhost:7278


Run Frontend

cd movie-management-web
npm install
ng serve

Application:

http://localhost:4200


Database

Database is automatically created using EF Core migrations.

Initial movie data is seeded from JSON file (moviedata.json).

The database acts as the single source of truth after seeding.

No manual database setup required.


🏗️ Key Architectural Decisions

CQRS Pattern used to separate read and write operations.

Repository Pattern used for data access abstraction.

Clean Architecture applied using separate Domain, Application, Infrastructure, and API layers to improve maintainability.

Angular standalone components used to reduce module complexity.

Backend validation ensures data consistency.


⚖️ Assumptions & Trade-offs

SQL Server used instead of PostgreSQL for easier local execution.

Pagination implemented on frontend for simplicity.

Focus prioritized on architecture and maintainability.


✅ Features Implemented

Movie CRUD operations

Advanced search functionality

Latest movies homepage

Edit & delete from details page

Validation (frontend + backend)

Loader & user feedback


📂 Repository

GitHub:

https://github.com/Udayattarde/MovieManagement-Instem
