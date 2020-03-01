INSERT INTO customers (
    first_name,
    last_name,
    email, 
    hash
)
VALUES($1, $2, $3, $4)
returning *; 