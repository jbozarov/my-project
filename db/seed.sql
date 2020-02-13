
--customers table 
CREATE TABLE customers (
    customer_id serial primary key,
    first_name varchar(32),
    last_name varchar(32),
    email varchar(100), 
    hash varchar(300)
); 



--accounts table 
CREATE TABLE accounts (
    account_number varchar(20) primary key,
    customer_id int references customers(customer_id),
    account_type char(20),
    balance varchar(32)
); 



--transactions table 
CREATE TABLE transactions (
    transaction_id serial primary key, 
    account_number varchar(20) references accounts(account_number),
    amount varchar(20), 
    description varchar(200),
    transaction_date varchar(20) 
);

create table customer_order (
    customer_order_id serial primary key, 
    customer_id int references customers(customer_id), 
    paid boolean
);

create table cart (
    cart_id serial primary key, 
    customer_order_id int, 
    ticker varchar(10), 
    qty int, 
    price decimal(9,2), 
    total decimal(9,2)
);

--Stocks table
CREATE TABLE stocks (
    ticker varchar(10) primary key, 
    name varchar(40), 
    price decimal(9,2),
    exchange varchar(20)
)

CREATE TABLE appointments (
   appointment_id serial primary key, 
   customer_id int, 
   date varchar(20),
   time varchar(20), 
   available boolean
)

insert into appointments (appointment_id, customer_id, date, time, available) values (1, 1, '3/2/2020', '10:00 AM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (2, 2, '3/2/2020', '11:00 AM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (3, 3, '3/2/2020', '12:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (4, 4, '3/2/2020', '1:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (5, 5, '3/2/2020', '2:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (6, 6, '3/2/2020', '3:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (7, 7, '3/2/2020', '4:00 PM', false);

insert into appointments (appointment_id, customer_id, date, time, available) values (8, 8, '3/3/2020', '10:00 AM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (9, 9, '3/3/2020', '11:00 AM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (10, 10, '3/3/2020', '12:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (11, 11, '3/3/2020', '1:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (12,12, '3/3/2020', '2:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (13, 13, '3/3/2020', '3:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (14, 14, '3/3/2020', '4:00 PM', true);

insert into appointments (appointment_id, customer_id, date, time, available) values (15, 15, '3/4/2020', '10:00 AM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (16, 16, '3/4/2020', '11:00 AM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (17, 17, '3/4/2020', '12:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (18, 18, '3/4/2020', '1:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (19, 19, '3/4/2020', '2:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (20, 20, '3/4/2020', '3:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (21, 21, '3/4/2020', '4:00 PM', false);

insert into appointments (appointment_id, customer_id, date, time, available) values (22, 22, '3/5/2020', '10:00 AM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (23, 23, '3/5/2020', '11:00 AM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (24, 24, '3/5/2020', '12:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (25, 25, '3/5/2020', '1:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (26, 26, '3/5/2020', '2:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (27, 27, '3/5/2020', '3:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (28, 28, '3/5/2020', '4:00 PM', true);

insert into appointments (appointment_id, customer_id, date, time, available) values (29, 29, '3/6/2020', '10:00 AM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (30, 30, '3/6/2020', '11:00 AM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (31, 31, '3/6/2020', '12:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (32, 32, '3/6/2020', '1:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (33, 33, '3/6/2020', '2:00 PM', false);
insert into appointments (appointment_id, customer_id, date, time, available) values (34, 34, '3/6/2020', '3:00 PM', true);
insert into appointments (appointment_id, customer_id, date, time, available) values (35, 35, '3/6/2020', '4:00 PM', false);




insert into stocks (ticker, name, price, exchange) values ('AAPL', 'Apple Inc.',  325.21, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('GOOG', 'Alphabet Inc.', 1476.23, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('MSFT', 'Microsoft Corporation', 183.63, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('AMZN', 'Amazon', 2050.23, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('FB', 'Facebook', 210.85, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('BRK.A', 'Berkshire Hathaway', 1466.00, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('BABA', 'Alibaba Group', 220.90, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('JNJ', 'Johnson & Johnson', 153.53, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('JPM', 'JPMorgan Chase & Co', 137.61, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('XOM', 'ExxonMobil', 61.88, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('BAC', 'Bank of America', 34.67, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('WMT', 'Wal-Mart Stores Inc.', 116.31, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('WFC', 'Wells Fargo & Co.', 47.98, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('RDS.A', 'Royal Dutch Shell plc', 52.14, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('V', 'Visa Inc.', 203.04, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('PG', 'Procter & Gamble Co.', 127.14, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('BUD', 'Anheuser-Busch Inbev ', 76.57, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('T', 'AT&T', 38.44, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('CVX', 'Chevron Corporation', 109.49, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('UNH', 'UnitedHealth Group Inc.', 292.46, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('PFE', 'Pfizer Inc.', 38.26, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('RHHBY', 'Roche Holding Ltd.', 43.43, 'OTC');
insert into stocks (ticker, name, price, exchange) values ('CHL', 'China Mobile', 43.10, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('HD', 'Home Depot', 238.84, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('INTC', 'Intel', 67.09, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('TSM', 'Taiwan Semiconductor', 58.02, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('VZ', 'Verizon Communications', 59.44, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('MMM', '3M Company', 162.89, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('ABBV', 'AbbVie Inc', 0.02, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('ORCL', 'Oracle Corporation', 54.71, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('C', 'Citigroup Inc.', 78.97, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('NVS', 'Novartis', 96.96, 'NYSE');

insert into stocks (ticker, name, price, exchange) values (null, null, null, null);
insert into stocks (ticker, name, price, exchange) values (null, null, null, null);