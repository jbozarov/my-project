UPDATE buyorders
SET order_type = $2, 
      wanted_price = $3
WHERE buy_order_id = $1; 