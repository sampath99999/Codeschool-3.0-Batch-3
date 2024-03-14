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

DROP TABLE USERS ;

CREATE TABLE
    POST (
        PostID SERIAL Primary Key,
        UserID integer,
        Title varchar(1000),
        postContent varchar,
        blogImage varchar(500),
        PostCreated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        PostedUpdate_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        Deleted_at timestamptz DEFAULT current_timestamp,
        FOREIGN KEY (UserID) REFERENCES users (id) ON DELETE CASCADE
    );

    DROP TABLE POST ;

create table
    Likes (
              LikeID SERIAL Primary Key,
              likeStatus varchar,
              PostID Integer,
              UserID Integer,
              FOREIGN KEY (PostID) REFERENCES post (PostID) ON DELETE CASCADE,
              FOREIGN KEY (UserID) REFERENCES Users (id)
);
create table comments(
                         commentID SERIAL Primary Key,
                         Comment varchar(1000),
                         postId  integer,
                         userID integer,
                         CommentDate TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (postID) REFERENCES post (PostID) ON DELETE CASCADE,
                         FOREIGN KEY (userID) REFERENCES Users (id)
);


SELECT  p.postid, p.Title, p.postContent,p.postcreated_at,p.userid, p.blogImage, u.username FROM post p JOIN users u ON p.userid = u.id where p.postid=1;