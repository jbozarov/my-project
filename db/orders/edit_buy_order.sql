UPDATE buyorders
SET order_type = $2, 
      qty = $3, 
      wanted_price = $4,
WHERE buy_order_id = $1; 