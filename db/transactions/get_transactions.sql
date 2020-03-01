select * from transactions 
where account_number = $1
order by transaction_id desc; 