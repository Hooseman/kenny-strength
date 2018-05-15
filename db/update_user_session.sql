update client_sessions
set next_trainer = $2, next_class = $3, next_time = $4, next_session = $5
where id = $1;