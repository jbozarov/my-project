
--customers table 
CREATE TABLE customers (
    customer_id serial primary key,
    first_name varchar(32),
    last_name varchar(32),
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

create table customer_order (
    customer_order_id serial primary key, 
    customer_id int references customers(customer_id), 
    paid boolean
);

create table cart (
    cart_id serial primary key, 
    customer_order_id int REFERENCES customer_order(customer_order_id), 
    ticker varchar(10) REFERENCES stocks(ticker), 
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