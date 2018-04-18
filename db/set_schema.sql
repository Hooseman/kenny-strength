DROP TABLE IF EXISTS clients, client_sessions, client_creds, admins;

CREATE TABLE clients (
id SERIAL PRIMARY KEY,
username VARCHAR(200),
lastname VARCHAR(200),
email VARCHAR(200),
phone BIGINT,
password VARCHAR,
birth_date VARCHAR(200),
age INTEGER,
sex VARCHAR,
clientaddress VARCHAR(200),
city VARCHAR(200),
zip BIGINT,
info VARCHAR(500)
);


CREATE TABLE client_creds (
id SERIAL PRIMARY KEY,
username VARCHAR(200),
password VARCHAR(200)
);

CREATE TABLE client_sessions (
id SERIAL PRIMARY KEY,
next_trainer VARCHAR(200),
next_class VARCHAR(200),
next_time VARCHAR(200),
next_session VARCHAR(200)
);

CREATE TABLE admins (
id SERIAL PRIMARY KEY,
username VARCHAR,
lastname VARCHAR
);


-- INSERT INTO clients (username,lastname,email,phone,password,birth_date,age,sex,clientaddress,city,zip,info) VALUES
-- ('Bob','Little','Bobsuncle.com',2222222222,'Bobby','10/12/2222',22,'Male','12 W 12 E','Mesa',33333,'The cat in the hat');

-- INSERT INTO client_creds (username,password) VALUES
-- ('pills','berry');

INSERT INTO admins (username,lastname) VALUES
('Kenny','Golladay'),
('Adam', 'Magistri');

-- INSERT INTO client_sessions (next_class,next_time,next_session) VALUES
-- ('10/','Golladay'),
-- ('Adam', 'Magistri');

