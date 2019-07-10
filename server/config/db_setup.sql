CREATE TABLE categories (
categoryid SERIAL PRIMARY KEY,
category VARCHAR(255)
);

CREATE TABLE resources (
resourceid SERIAL PRIMARY KEY,
link TEXT,
author VARCHAR,
iscommunity BOOLEAN,
categoryid INTEGER REFERENCES categories(categoryid) ON DELETE CASCADE;
);

CREATE EXTENSION pgcrypto;

CREATE TABLE votes (
resourceid INTEGER REFERENCES resources(resourceid),
useremail TEXT NOT NULL,
upvote BOOLEAN,
CONSTRAINT votes_resourceid_useremail_key UNIQUE (resourceid, useremail)
);