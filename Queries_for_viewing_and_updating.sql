--Viewing the user table---
SELECT * 
FROM BankingAggregator.Users;
GO
--Update password hash to 5 characters---
UPDATE BankingAggregator.Users
SET PasswordHash = LEFT(PasswordHash, 5);

--Make password hash column with 5 characters---
ALTER TABLE BankingAggregator.Users
ALTER COLUMN PasswordHash CHAR(5) NOT NULL;

--Make all passwords different for users--
UPDATE BankingAggregator.Users
SET PasswordHash = LEFT(CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', Email), 2), 5);

--View All Banks--
SELECT * 
FROM BankingAggregator.Banks;
GO
--View All branches--
SELECT b.BranchId, b.BranchName, b.IFSC, b.Address,
       ba.BankId, ba.BankName
FROM BankingAggregator.Branches b
JOIN BankingAggregator.Banks ba ON b.BankId = ba.BankId;
GO

--View All accounts---
SELECT a.AccountId, a.AccountNumber, a.AccountType, a.Balance,
       u.UserId, u.FullName AS UserName,
       b.BankId, b.BankName,
       br.BranchId, br.BranchName
FROM BankingAggregator.Accounts a
JOIN BankingAggregator.Users u ON a.UserId = u.UserId
JOIN BankingAggregator.Banks b ON a.BankId = b.BankId
JOIN BankingAggregator.Branches br ON a.BranchId = br.BranchId;

