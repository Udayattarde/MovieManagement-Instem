# MovieManagement-Instem
Movie Management Application built with ASP.NET Core, Angular, and SQL. Implements clean architecture, RESTful API, full CRUD, advanced search, validation, and unit tests as part of a Senior Software Developer technical exercise.

How to Run the Project (Local Setup)

This application contains:

ASP.NET Core Web API (Backend)

Angular Application (Frontend)

SQL Server Database (auto-created)


How to Run the Project (Local Setup)

This application contains:

ASP.NET Core Web API (Backend)

Angular Application (Frontend)

SQL Server Database (auto-created)

Run Backend (ASP.NET Core API)

Open terminal:

cd MovieManagement/MovieManagement.Api

Update connection string (if needed)

Open:

appsettings.json

Example:

"ConnectionStrings": {
  "DefaultConnection":
  "Server=(localdb)\\MSSQLLocalDB;Database=MovieManagementDb;Trusted_Connection=True;TrustServerCertificate=True"
}

Apply migrations:

dotnet ef database update

Run API:

dotnet run

Backend runs at:

https://localhost:7278

Swagger:

https://localhost:7278/swagger
▶️ Run Frontend (Angular)

Open new terminal:

cd movie-management-web

Install packages:

npm install

Run application:

ng serve

Frontend runs at:

http://localhost:4200
✅ Testing the Application

Open browser:

http://localhost:4200




