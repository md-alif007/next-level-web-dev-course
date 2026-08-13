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
    --3. Retrieve all booking records where the payment status is missing (NULL), 
    --replacing the empty result with 'Action Required'.
select
    booking_id,
    user_id,
    match_id,
    coalesce(payment_status, 'Action Required') as systematic_status
from
    bookings
where
    payment_status is null
    --4. Retrieve match booking details along with the User's full name and the scheduled Match fixture teams
select
    booking_id,
    full_name,
    fixture,
    total_cost
from
    bookings
    inner join users using (user_id)
    inner join matches using (match_id)
    --Query 5: Display a comprehensive list of all users and their booking IDs, 
    --ensuring that fans who have never bought a ticket are still listed.
select
    user_id,
    full_name,
    booking_id
from
    users
    left join bookings using (user_id)
    --6. Find all ticket bookings where the total cost is strictly higher than the average cost of all ticket bookings.
select
    booking_id,
    match_id,
    total_cost
from
    bookings
where
    total_cost > (
        select
            round(avg(total_cost))
        from
            bookings
    )
    --7. Retrieve the top 2 most expensive matches sorted by base ticket price, skipping the absolute highest premium match.
select
    match_id,
    fixture,
    base_ticket_price
from
    matches
order by
    base_ticket_price desc
offset
    1
limit
    2