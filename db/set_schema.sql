DROP TABLE IF EXISTS clients, client_sessions, trainer, admin, payment;

CREATE TABLE clients (
id SERIAL PRIMARY KEY,
username VARCHAR(200),
lastname VARCHAR(200),
email VARCHAR(200),
phone BIGINT,
password VARCHAR,
birth_date VARCHAR(200),
clientaddress VARCHAR(200),
city VARCHAR(200),
zip INT,
info VARCHAR(500),
role VARCHAR,
date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE trainer (
id SERIAL PRIMARY KEY,
username VARCHAR(200)
);

CREATE TABLE admin (
id SERIAL PRIMARY KEY,
username VARCHAR(200),
lastname VARCHAR(200)
);

CREATE TABLE client_sessions (
id SERIAL PRIMARY KEY,
user_id BIGINT,
next_trainer VARCHAR(200),
next_class VARCHAR(200),
next_time VARCHAR(200),
next_session VARCHAR(200)
);

CREATE TABLE payment (
id SERIAL PRIMARY KEY,
paid VARCHAR
);



