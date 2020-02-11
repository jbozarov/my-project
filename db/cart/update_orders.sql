UPDATE customer_order
SET paid = true
WHERE customer_order_id = $1; 