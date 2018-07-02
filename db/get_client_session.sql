select clients.username,clients.lastname, client_sessions.*, trainer.*
from client_sessions
join clients
on clients.id = client_sessions.user_id
join trainer
on trainer.id = client_sessions.user_id
where client_sessions.user_id = $1;