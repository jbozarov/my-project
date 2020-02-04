
--customers table 
CREATE TABLE customers (
    customer_id serial primary key,
    first_name varchar(32),
    last_name varchar(32),
    birth_date date,
    street varchar(32),
    city varchar(32), 
    stata varchar(20), 
    country varchar(32), 
    zip_code varchar(10),
    login varchar(20), 
    hash varchar(300)
); 



--accounts table 
CREATE TABLE accounts (
    account_number char(20) primary key,
    customer_id int references customers(customer_id),
    account_type char(20),
    balance varchar(32)
); 



--transactions table 
CREATE TABLE transactions (
    transaction_id serial primary key, 
    account_number char(20) references accounts(account_number),
    transaction_type varchar(20), 
    description varchar(20),
    transaction_date date 
);