SELECT *
FROM clients
WHERE clients.id = $1
AND clients.role = 'client';