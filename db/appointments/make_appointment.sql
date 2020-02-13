update appointments 
set available = false
where date = $1 and time = $2; 