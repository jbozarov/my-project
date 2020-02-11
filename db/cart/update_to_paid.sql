update customer_order
set paid = true 
where customer_order_id = $1; 