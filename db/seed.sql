
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
    account_number varchar(20),
    amount varchar(20), 
    description varchar(200),
    transaction_date varchar(20), 
    type varchar(20)
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

CREATE TABLE investments (
   investment_id serial primary key, 
   customer_id int, 
   ticker varchar(10),
   qty int, 
   purchased_price decimal(9,2)
)

CREATE TABLE buyorders (
   buy_order_id serial primary key, 
   customer_id int, 
   order_type varchar(20), 
   ticker varchar(10),
   qty int, 
   wanted_price decimal(9,2)
)

CREATE TABLE sellorders (
   sell_order_id serial primary key, 
   customer_id int, 
   order_type varchar(20), 
   ticker varchar(10),
   qty int, 
   wanted_price decimal(9,2)
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




insert into stocks (ticker, name, price, exchange) values ('AAPL', 'Apple Inc.',  288.08, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('GOOG', 'Alphabet Inc.', 1386.32, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('MSFT', 'Microsoft Corporation', 168.07, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('AMZN', 'Amazon', 1972.74, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('FB', 'Facebook', 196.77, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('BRK.B', 'Berkshire Hathaway', 218.05, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('BABA', 'Alibaba Group', 205.61, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('JNJ', 'Johnson & Johnson', 144.65, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('JPM', 'JPMorgan Chase & Co', 126.26, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('XOM', 'ExxonMobil', 61.88, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('BAC', 'Bank of America', 54.20, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('WMT', 'Wal-Mart Stores Inc.', 114.39, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('WFC', 'Wells Fargo & Co.', 45.12, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('RDS.A', 'Royal Dutch Shell plc', 45.90, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('V', 'Visa Inc.', 188.40, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('PG', 'Procter & Gamble Co.', 121.43, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('BUD', 'Anheuser-Busch Inbev ', 66.92, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('T', 'AT&T', 37.35, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('CVX', 'Chevron Corporation', 100.71, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('UNH', 'UnitedHealth Group Inc.', 263.39, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('PFE', 'Pfizer Inc.', 33.93, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('RHHBY', 'Roche Holding Ltd.', 41.75, 'OTC');
insert into stocks (ticker, name, price, exchange) values ('CHL', 'China Mobile', 41.01, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('HD', 'Home Depot', 237.38, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('INTC', 'Intel', 59.73, 'NASDAQ');
insert into stocks (ticker, name, price, exchange) values ('TSM', 'Taiwan Semiconductor', 53.86, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('VZ', 'Verizon Communications', 57.12, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('MMM', '3M Company', 146.85, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('ABBV', 'AbbVie Inc', 89.18, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('ORCL', 'Oracle Corporation', 50.96, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('C', 'Citigroup Inc.', 69.43, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('NVS', 'Novartis', 87.95, 'NYSE');
insert into stocks (ticker, name, price, exchange) values ('NVS', 'Novartis', 87.95, 'NYSE');

insert into stocks (ticker, name, price, exchange) values (null, null, null, null);
insert into stocks (ticker, name, price, exchange) values (null, null, null, null);