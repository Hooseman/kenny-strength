INSERT INTO clients(username,lastname,email,phone,password,birth_date,clientaddress,city,zip,info,role)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'client');

