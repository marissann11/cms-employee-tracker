drop database if exists employee;
create database employee;
use employee;

create table departments (
    id integer auto_increment primary key,
    name varchar(30) not null
);

create table roles (
    id integer auto_increment primary key,
    title varchar(30) not null,
    salary decimal(10,2),
    dept_id integer,
    foreign key (dept_id) references departments(id) on delete set null
);

create table employees (
    id integer auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    manager_id int,
    role_id int,
    foreign key (role_id) references roles(id) on delete set null
);
