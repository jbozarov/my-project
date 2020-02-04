INSERT INTO customers (
    first_name,
    last_name,
    birth_date,
    street,
    city, 
    stata, 
    country, 
    zip_code,
    login, 
    hash
)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *; 