INSERT INTO CLIENTS(firstname,lastname,email,phone,password,birth_date,age,sex,clientaddress,zip,city,info)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *;