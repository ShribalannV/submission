
INSERT INTO [banking].[Roles] (RoleName)
VALUES ('Admin'), ('User');

select * from [banking].[Roles];

SET IDENTITY_INSERT banking.Users ON;
 
-- Example hashed passwords (replace with your actual hashes)
INSERT INTO  banking.Users (Id, Email, FullName, Role, PasswordHash)
VALUES
(1, 'admin@bank.com', 'Admin User', 'Admin', 'HASHED_PASSWORD_1'),
(2, 'user1@bank.com', 'User One', 'User', 'HASHED_PASSWORD_2'),
(3, 'user2@bank.com', 'User Two', 'User', 'HASHED_PASSWORD_3');
 
SET IDENTITY_INSERT banking.Users OFF;

select*from [banking].[Users];

SET IDENTITY_INSERT banking.Banks ON;
 
INSERT INTO banking.Banks (Id, BankName)
VALUES
(1, 'Bank of Atlantis'),
(2, 'Oceanic Bank');
 
SET IDENTITY_INSERT banking.Banks OFF;

select*from [banking].[Banks];

SET IDENTITY_INSERT banking.Branches ON;
 
INSERT INTO banking.Branches (Id, BankId, BranchName,IFSC)
VALUES
(1, 1, 'Main Branch', '123 Ocean St.'),
(2, 1, 'West Branch', '456 Sea Ave.'),
(3, 2, 'Central Branch', '789 Coral Rd.');
 
SET IDENTITY_INSERT banking.Branches OFF;

select * from [banking].[Branches];

-- Insert into Accounts
INSERT INTO [banking].[Accounts] 
(Id, AccountNumber, Balance, IsClosed, CreatedAt, UserId, UserId1)
VALUES
(NEWID(), 'ACC1001', 1000.00, 0, SYSUTCDATETIME(), '11111111-1111-1111-1111-111111111111', NULL),
(NEWID(), 'ACC1002', 2500.50, 0, SYSUTCDATETIME(), '22222222-2222-2222-2222-222222222222', NULL),
(NEWID(), 'ACC1003', 500.00, 0, SYSUTCDATETIME(), '33333333-3333-3333-3333-333333333333', NULL);

SET IDENTITY_INSERT banking.Permissions ON;
INSERT INTO banking.Permissions (Id, PermissionName, RoleId)
VALUES
(1, 'CanViewAccounts', 2),
(2, 'CanCreateAccounts', 1),
(3, 'CanDeleteAccounts', 1);
GO
SET IDENTITY_INSERT banking.Permissions OFF;

SET IDENTITY_INSERT banking.Transactions ON;
 
INSERT INTO banking.Transactions (Id, AccountId, Type, Amount, Description, CounterpartyAccountId, CreatedAt)
VALUES
(NEWID(), (SELECT TOP 1 Id FROM banking.Accounts WHERE AccountNumber='ACC1001'), 'deposit', 5000.00, 'Initial deposit', NULL, GETDATE()),
(NEWID(), (SELECT TOP 1 Id FROM banking.Accounts WHERE AccountNumber='ACC1002'), 'deposit', 10000.00, 'Initial deposit', NULL, GETDATE());
GO

SELECT * FROM [banking].[Accounts];

---tRANSACTIONS---
DECLARE @ACC1001 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM banking.Accounts WHERE AccountNumber = 'ACC1001');
DECLARE @ACC1002 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM banking.Accounts WHERE AccountNumber = 'ACC1002');
DECLARE @ACC1003 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM banking.Accounts WHERE AccountNumber = 'ACC1003');

INSERT INTO [banking].[Transactions]
(AccountId, Type, Amount, Description, CounterpartyAccountId, CreatedAt)
VALUES
(@ACC1001, 'deposit',       1000.00, 'Initial deposit', NULL, SYSUTCDATETIME()),
(@ACC1002, 'deposit',       2500.50, 'Initial deposit', NULL, SYSUTCDATETIME()),
(@ACC1003, 'deposit',        500.00, 'Initial deposit', NULL, SYSUTCDATETIME());

select*from [banking].[transactions];

select*from [banking].[Users];


