select * from investments 
where customer_id = $1
order by investment_id asc; 