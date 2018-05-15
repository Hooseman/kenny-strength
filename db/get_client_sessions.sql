select clients.username,clients.lastname, client_sessions.*
from client_sessions
join clients
on clients.id = client_sessions.user_id
where client_sessions.user_id = $1;