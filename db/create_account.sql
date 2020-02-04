insert into accounts (account_number, customer_id,	account_type,	balance)
values ($1, $2, $3, $4)
returning *; 