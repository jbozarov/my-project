INSERT INTO sellorders (
   customer_id, 
   order_type, 
   ticker,
   qty, 
   wanted_price
)
VALUES (
   $1,
   $2,
   $3,
   $4,
   $5
);