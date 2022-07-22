CREATE DATABASE companydata;

create table companies(
    id SERIAL primary key,
    cin varchar(255),
    name varchar(255)
);