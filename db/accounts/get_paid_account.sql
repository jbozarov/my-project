select account_number from accounts
where account_number like '%' + $1;
