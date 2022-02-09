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
    constraint fk_dept foreign key (dept_id) references departments(id) on delete set null
);

create table employees (
    id integer auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_title varchar(30),
    department_name varchar(30),
    role_salary decimal(10,2),
    manager_name varchar(30),
    constraint fk_role foreign key (role_title) references roles(title) on delete set null,
    constraint fk_department foreign key (department_name) references departments(name) on delete set null,
    constraint fk_salary foreign key (role_salary) references roles(salary) on delete set null
);
