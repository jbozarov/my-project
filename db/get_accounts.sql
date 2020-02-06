select a.account_number, a.customer_id, a.account_type, a.balance, c.first_name, c.last_name from accounts a
join customers c
on c.customer_id=a.customer_id
where c.customer_id=$1; 