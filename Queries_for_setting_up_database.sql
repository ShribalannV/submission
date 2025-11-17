----------------------------------------
-- 1) Use existing database or create if not exists
----------------------------------------
IF DB_ID('BankingAggregator') IS NULL
    CREATE DATABASE BankingAggregator;
GO

USE BankingAggregator;
GO

----------------------------------------
-- 2) Create schema if not exists
----------------------------------------
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'BankingAggregator')
    EXEC('CREATE SCHEMA BankingAggregator');
GO

----------------------------------------
-- 3) Create tables with simple INT IDs
----------------------------------------

-- Users
CREATE TABLE BankingAggregator.Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(20) NOT NULL CHECK (Role IN ('user','sysadmin')),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Banks
CREATE TABLE BankingAggregator.Banks (
    BankId INT IDENTITY(1,1) PRIMARY KEY,
    BankName VARCHAR(50) NOT NULL,
    BankCode VARCHAR(10) UNIQUE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Branches
CREATE TABLE BankingAggregator.Branches (
    BranchId INT IDENTITY(1,1) PRIMARY KEY,
    BankId INT NOT NULL,
    BranchName VARCHAR(50) NOT NULL,
    IFSC VARCHAR(15) UNIQUE NOT NULL,
    Address VARCHAR(100),
    FOREIGN KEY (BankId) REFERENCES BankingAggregator.Banks(BankId)
);
GO

-- Accounts
CREATE TABLE BankingAggregator.Accounts (
    AccountId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    BankId INT NOT NULL,
    BranchId INT NOT NULL,
    AccountNumber VARCHAR(20) UNIQUE NOT NULL,
    AccountType VARCHAR(20) NOT NULL CHECK (AccountType IN ('savings','checking')),
    Balance DECIMAL(18,2) DEFAULT 0,
    FOREIGN KEY (UserId) REFERENCES BankingAggregator.Users(UserId),
    FOREIGN KEY (BankId) REFERENCES BankingAggregator.Banks(BankId),
    FOREIGN KEY (BranchId) REFERENCES BankingAggregator.Branches(BranchId)
);
GO

-- Transactions
CREATE TABLE BankingAggregator.Transactions (
    TransactionId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT NOT NULL,
    TransactionType VARCHAR(20) NOT NULL CHECK (TransactionType IN ('deposit','withdraw','transfer-in','transfer-out')),
    Amount DECIMAL(18,2) NOT NULL CHECK (Amount > 0),
    CounterpartyAccountId INT NULL,
    Description VARCHAR(100),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (AccountId) REFERENCES BankingAggregator.Accounts(AccountId)
);
GO

---------------------------------------
-- 4) Insert Banks
----------------------------------------
INSERT INTO BankingAggregator.Banks (BankName, BankCode)
VALUES 
('Axis Bank','AXIS'),
('HDFC Bank','HDFC'),
('ICICI Bank','ICICI'),
('State Bank of India','SBI'),
('KVB Bank','KVB'),
('IndusInd Bank','INDUS'),
('Yes Bank','YESB'),
('Kotak Mahindra Bank','KOTAK'),
('Punjab National Bank','PNB'),
('Bank of Baroda','BOB');
GO

----------------------------------------
-- 5) Insert Users with hashed passwords
-- All passwords = "Password123"
----------------------------------------
INSERT INTO BankingAggregator.Users (FullName, Email, PasswordHash, Role)
VALUES
('Aathityan','aathityan@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Shribalan','shribaln@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Hariharan','hariharan@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Akash','akash@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Pavithra','pavithra@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Kirupashree','kirupashree@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Sathish','sathish@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Thirumurugan','thirumurugan@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Surya','surya@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user'),
('Siddarthan','siddarthan@gmail.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256','Password123'),2),'user');
GO

----------------------------------------
-- 6) Create 6 Branches per Bank
----------------------------------------
DECLARE @BankId INT, @i INT;

DECLARE bank_cursor CURSOR FOR 
    SELECT BankId FROM BankingAggregator.Banks;

OPEN bank_cursor;
FETCH NEXT FROM bank_cursor INTO @BankId;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @i = 1;
    WHILE @i <= 6
    BEGIN
        INSERT INTO BankingAggregator.Branches (BankId, BranchName, IFSC, Address)
        VALUES (@BankId, 'Branch ' + CAST(@i AS VARCHAR(2)), 'IFSC' + CAST(@BankId AS VARCHAR(2)) + CAST(@i AS VARCHAR(2)), 'City Center');
        SET @i = @i + 1;
    END
    FETCH NEXT FROM bank_cursor INTO @BankId;
END

CLOSE bank_cursor;
DEALLOCATE bank_cursor;
GO

----------------------------------------
-- 7) Give each user 2 accounts in random, different banks
----------------------------------------
DECLARE @UserId INT;

DECLARE user_cursor CURSOR FOR
    SELECT UserId FROM BankingAggregator.Users;

OPEN user_cursor;
FETCH NEXT FROM user_cursor INTO @UserId;

WHILE @@FETCH_STATUS = 0
BEGIN
    ;WITH RandomBanks AS (
        SELECT TOP 2 BankId
        FROM BankingAggregator.Banks
        ORDER BY NEWID()
    )
    INSERT INTO BankingAggregator.Accounts (UserId, BankId, BranchId, AccountNumber, AccountType, Balance)
    SELECT 
        @UserId,
        rb.BankId,
        (SELECT TOP 1 BranchId FROM BankingAggregator.Branches WHERE BankId = rb.BankId ORDER BY NEWID()),
        CONCAT('ACCT-', @UserId, '-', ROW_NUMBER() OVER (ORDER BY rb.BankId)),
        'savings',
        0
    FROM RandomBanks rb;

    FETCH NEXT FROM user_cursor INTO @UserId;
END

CLOSE user_cursor;
DEALLOCATE user_cursor;
GO

----------------------------------------
-- 8) Generate 100 random transactions
----------------------------------------
DECLARE @i INT = 1;

WHILE @i <= 100
BEGIN
    DECLARE @AccId INT = (SELECT TOP 1 AccountId FROM BankingAggregator.Accounts ORDER BY NEWID());
    DECLARE @Amt DECIMAL(18,2) = CAST((ABS(CHECKSUM(NEWID())) % 4950 + 50) AS DECIMAL(18,2));
    DECLARE @Type VARCHAR(20) = CASE ABS(CHECKSUM(NEWID())) % 2 WHEN 0 THEN 'deposit' ELSE 'withdraw' END;

    INSERT INTO BankingAggregator.Transactions (AccountId, TransactionType, Amount, Description)
    VALUES (@AccId, @Type, @Amt, 'Generated transaction');

    IF @Type = 'deposit'
        UPDATE BankingAggregator.Accounts SET Balance += @Amt WHERE AccountId = @AccId;
    ELSE
        UPDATE BankingAggregator.Accounts SET Balance -= @Amt WHERE AccountId = @AccId;

    SET @i = @i + 1;
END
GO

----------------------------------------
-- 9) Verify Accounts and Balances
----------------------------------------
SELECT TOP 20 a.AccountNumber, u.FullName, b.BankName, br.BranchName, a.Balance
FROM BankingAggregator.Accounts a
JOIN BankingAggregator.Users u ON a.UserId = u.UserId
JOIN BankingAggregator.Banks b ON a.BankId = b.BankId
JOIN BankingAggregator.Branches br ON a.BranchId = br.BranchId
ORDER BY a.Balance DESC;
GO