#!/usr/bin/env bash

echo "Configuring database"

export PGPASSWORD='node_password'
dropdb -U node_admin goblin_shark
createdb -U node_admin goblin_shark;
psql -U node_admin goblin_shark < ./server/config/db_setup.sql

echo "Goblin_shark was configered";

node ./server/config/insertFakeData.js


echo "I am done I think!! :)";