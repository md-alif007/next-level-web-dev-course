DROP TABLE IF EXISTS Bookings;

DROP TABLE IF EXISTS Matches;

DROP TABLE IF EXISTS Users;

--users table
CREATE TABLE
    Users (
        user_id int primary key,
        full_name varchar(50),
        email varchar(100) unique,
        role varchar(20) check (role in ('Ticket Manager', 'Football Fan')),
        phone_number varchar(15)
    );

--Matches table
CREATE TABLE
    Matches (
        match_id int primary key,
        fixture varchar(50),
        tournament_category varchar(50),
        base_ticket_price int check (base_ticket_price > 0),
        match_status varchar(20) check (
            match_status in (
                'Available',
                'Selling Fast',
                'Sold Out',
                'Postponed'
            )
        )
    );

--bookings table
CREATE TABLE
    Bookings (
        booking_id int primary key,
        user_id int references Users (user_id),
        match_id int references Matches (match_id),
        seat_number varchar(5),
        payment_status varchar(10) check (
            payment_status in ('Pending', 'Confirmed', 'Cancelled', 'Refunded')
        ),
        total_cost int check (total_cost >= 0)
    );

--insert users
INSERT INTO
    Users (user_id, full_name, email, role, phone_number)
VALUES
    (
        1,
        'Tanvir Rahman',
        'tanvir@mail.com',
        'Football Fan',
        '+8801711111111'
    ),
    (
        2,
        'Asif Haque',
        'asif@mail.com',
        'Football Fan',
        '+8801722222222'
    ),
    (
        3,
        'Sajjad Rahman',
        'sajjad@mail.com',
        'Ticket Manager',
        '+8801733333333'
    ),
    (
        4,
        'Jannat Ara',
        'jannat@mail.com',
        'Football Fan',
        NULL
    );

--insert matches
INSERT INTO
    Matches (
        match_id,
        fixture,
        tournament_category,
        base_ticket_price,
        match_status
    )
VALUES
    (
        101,
        'Real Madrid vs Barcelona',
        'Champions League',
        150.00,
        'Available'
    ),
    (
        102,
        'Man City vs Liverpool',
        'Premier League',
        120.00,
        'Selling Fast'
    ),
    (
        103,
        'Bayern Munich vs PSG',
        'Champions League',
        130.00,
        'Available'
    ),
    (
        104,
        'AC Milan vs Inter Milan',
        'Serie A',
        90.00,
        'Sold Out'
    ),
    (
        105,
        'Juventus vs Roma',
        'Serie A',
        80.00,
        'Available'
    );

--insert bookings
INSERT INTO
    Bookings (
        booking_id,
        user_id,
        match_id,
        seat_number,
        payment_status,
        total_cost
    )
VALUES
    (501, 1, 101, 'A-12', 'Confirmed', 150.00),
    (502, 1, 102, 'B-04', 'Confirmed', 120.00),
    (503, 2, 101, 'A-13', 'Confirmed', 150.00),
    (504, 2, 101, NULL, NULL, 150.00),
    (505, 3, 102, 'C-20', 'Pending', 120.00);

--1. Retrieve all upcoming football matches belonging to the 'Champions League' where the match status is 'Available'.
select
    match_id,
    fixture,
    tournament_category
from
    matches
where
    tournament_category = 'Champions League'
    and match_status = 'Available'
    --2. Search for all users whose full names start with 'Tanvir' or contain the phrase 'Haque' (case-insensitive).
select
    user_id,
    full_name,
    email
from
    users
where
    full_name ilike 'tanvir%'
    or full_name ilike '%haque%'