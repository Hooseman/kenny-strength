update client_sessions
set payment = 'Paid'
where id = $1;