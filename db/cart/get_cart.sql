select * from cart c
join customer_order co
on c.customer_order_id = co.customer_order_id
where c.customer_order_id = 4 
and co.paid = false;  