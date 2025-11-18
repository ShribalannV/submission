EXEC sp_rename 'banking.Users.PasswordHash', 'Password', 'COLUMN';

select * from [banking].[Users];

UPDATE banking.Users
SET Password = 'admin123'
WHERE Email = 'admin@bank.com';

UPDATE banking.Users
SET Password = 'user123'
WHERE Email = 'user1@bank.com';

UPDATE banking.Users
SET Password = 'user456'
WHERE Email = 'user2@bank.com';

select * from [banking].[Accounts];