select * from appointments 
where date = $1
order by appointment_id; 