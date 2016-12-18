
create user 'bgcuser'@'%' identified by 'password';

-- create bgc database
create database if not exists bgc;
grant all privileges on `bgc`.* to 'bgcuser'@'%';
flush privileges;

-- grants for liquibase user
grant all privileges on `bgc`.* to 'liquibase'@'%';
flush privileges;
