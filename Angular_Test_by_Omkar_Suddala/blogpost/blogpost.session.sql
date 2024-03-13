CREATE TABLE
    NAVIGATION (
        navid serial,
        label varchar(250),
        svgpath varchar(1000),
        link varchar(250)
    )
INSERT INTO
    NAVIGATION (label, svgpath, link)
VALUES
    (
        'Home',
        'M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z',
        '/home'
    ),
    (
        'Search',
        'M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0',
        ''
    ) ('Reels', '', '/reels'),
    ('Explore', '', '/explore'),
    ('Search', '', '/search'),
    (
        'Profile',
        'M 48.6397,12.794 C 48.6397,12.794 49.3603,13.415 50.1999,13.415 L  50.1999,19.185 C 50.1999,19.18',
        '/profile'
    ),
    ('Messages', 'Messages.svg', '/messages'),
    ('Create', '', '/create');

create table
    users (
        id SERIAL PRIMARY KEY,
        username varchar NOT NULL,
        email varchar NOT NULL,
        password varchar NOT NULL,
        profilepic varchar,
        token varchar,
        CreatedAtRegistration TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        loginTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        logoutTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

create table
    userprofile (
        profileid serial primary key,
        userid int,
        aboutme varchar(250),
        DateOfBirth varchar,
        Gender varchar,
        FOREIGN KEY (userid) REFERENCES users (userid) ON DELETE CASCADE
    )
drop table post
create table
    post (
        PostID SERIAL Primary Key,
        UserID integer,
        Title varchar(1000),
        postContent varchar,
        blogimage varchar(500),
        CreatedAtPost TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserId) REFERENCES users (id) ON DELETE CASCADE
    )
select
    *
from
    post
create table
    Likes (
        LikeID SERIAL Primary Key,
        likestatus varchar,
        PostID Integer,
        UserID Integer,
        FOREIGN KEY (PostID) REFERENCES post (PostID) ON DELETE CASCADE,
        FOREIGN KEY (UserID) REFERENCES Users (id) 
    )


create table comments(
commentID SERIAL Primary Key,
Comment varchar(1000),
postId  integer,
userID integer,
CommentDate TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (postID) REFERENCES post (PostID) ON DELETE CASCADE,
FOREIGN KEY (userID) REFERENCES Users (id) 
)





select
    *
from
    Likes
drop table post
drop table likes
drop table comments
drop table users