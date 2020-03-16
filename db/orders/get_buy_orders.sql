SELECT * FROM buyorders
where customer_id = $1 
ORDER BY buy_order_id ASC; 