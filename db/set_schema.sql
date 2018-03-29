DROP TABLE IF EXISTS clients, client_creds;
DROP INDEX IF EXISTS clients_index;

CREATE TABLE clients (
id SERIAL PRIMARY KEY,
user_id INTEGER,
username VARCHAR(200),
lastname VARCHAR(200),
email VARCHAR(200),
phone BIGINT,
password VARCHAR,
birth_date VARCHAR(200),
age INTEGER,
sex VARCHAR,
clientaddress VARCHAR(200),
city VARCHAR,
zip BIGINT,
info VARCHAR(500)
);

CREATE UNIQUE INDEX clients_index ON clients(user_id);

CREATE TABLE client_creds (
id SERIAL PRIMARY KEY,
username VARCHAR(200),
password VARCHAR(200)
);


INSERT INTO clients (username,lastname,email,phone,password,birth_date,age,sex,clientaddress,city,zip,info) VALUES
('Bob','Little','Bobsuncle.com',2222222222,'Bobby','10/12/2222',22,'Male','12 W 12 E','Mesa',33333,'The cat in the hat');

INSERT INTO client_creds (username,password) VALUES
('pills','berry');

