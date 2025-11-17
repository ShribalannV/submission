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

