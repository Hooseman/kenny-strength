DROP TABLE IF EXISTS CLIENTS;

CREATE TABLE CLIENTS (
password VARCHAR,    
first_name VARCHAR(200),
last_name VARCHAR(200),
email VARCHAR(200),
phone BIGINT,
client_address VARCHAR(200),
city VARCHAR,
zip INTEGER,
info VARCHAR(500)
);

INSERT INTO CLIENTS (password,first_name,last_name,email,phone,client_address,city,zip,info) VALUES
('Bobsuncle','Bob','Little','Bobsuncle.com',2222222222,'12 W 12 E','Mesa',33333,'The cat in the hat');