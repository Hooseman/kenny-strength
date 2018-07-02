INSERT INTO client_sessions(user_id, username, next_trainer,next_class,next_time,next_session,payment)
values ($1, $2, $3, $4, $5, $6, 'Pending');