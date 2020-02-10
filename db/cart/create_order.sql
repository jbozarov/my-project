insert into customer_order (
    customer_id,
    paid
) values (
    $1,
    false
)
returning customer_order_id, paid;