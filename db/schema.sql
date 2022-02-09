drop database if exists employee;
create database employee;
use employee;

drop table if exists departments;
drop table if exists roles;
drop table if exists employees;

create table departments (
    id integer auto_increment primary key,
    department_name varchar(30) not null
);

create table roles (
    id integer auto_increment primary key,
    title varchar(30) not null,
    salary decimal(10,2),
    dept_id integer,
    constraint fk_dept foreign key (dept_id) references departments(id) on delete set null
);

create table employees (
    id integer auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer,
    manager_id integer,
    constraint fk_role foreign key (role_id) references roles(id) on delete set null
);
