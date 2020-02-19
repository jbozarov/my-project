UPDATE sellorders
SET order_type = $2, 
      wanted_price = $3
WHERE sell_order_id = $1; 