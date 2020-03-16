SELECT * FROM sellorders
where customer_id = $1 
ORDER BY sell_order_id ASC;