# BankEmployeeAPI

A simple ASP.NET Core 8 Web API that:
- Generates 100 bank employees with random roles and banks
- Assigns special roles (Role5, Role7) to users 3,5,97,100
- Generates JWT tokens for every employee
- Saves employees to employees.json

## Endpoints

- GET /api/employee/generate
- GET /api/employee/list
- GET /api/employee/{id}
- GET /api/employee/bybank/{bankName}
- GET /api/employee/byrole/{roleName}
- POST /api/employee/verifytoken  (body: { "token": "..." })

## Run

1. Install .NET 8 SDK
2. In project folder:
   dotnet restore
   dotnet run
3. Call /api/employee/generate first, then list or other endpoints.
