INSERT INTO customers (
    first_name,
    last_name,
    login, 
    hash
)
VALUES($1, $2, $3, $4)
returning customer_id, first_name; 