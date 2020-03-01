select * from transactions t
where account_number in (
    select account_number 
    from accounts 
    where customer_id = $1
)
order by transaction_id asc; 