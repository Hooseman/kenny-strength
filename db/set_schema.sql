DROP TABLE IF EXISTS clients, client_sessions, trainer, admin, super, payment, secret_key;

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


CREATE TABLE admin (
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
user_id BIGINT
);

CREATE TABLE super (
id SERIAL PRIMARY KEY,
username VARCHAR(200),
lastname VARCHAR(200)
);

CREATE TABLE client_sessions (
id SERIAL PRIMARY KEY,
user_id BIGINT,
username VARCHAR,
next_trainer VARCHAR(200),
next_class VARCHAR(200),
next_time VARCHAR(200),
next_session VARCHAR(200),
payment VARCHAR
);

CREATE TABLE payment (
id SERIAL PRIMARY KEY,
payment_id BIGINT,
paid VARCHAR
);

CREATE TABLE secret_key (
id SERIAL PRIMARY KEY,
secret_key VARCHAR(200)
);
INSERT INTO secret_key (secret_key) VALUES('secret');
