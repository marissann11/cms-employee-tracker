insert into departments (department_name)
values
('State'),
('City Hall'),
('Parks and Recreation');

insert into roles (title, salary, dept_id)
values
('Director', 100000, 3),
('Deputy Director', 80000, 3),
('Administrator', 60000, 3),
('Auditor', 50000, 1),
('Intern', 33000, 3),
('Shoeshiner', 50, 2);

insert into employees (first_name, last_name, role_id, manager_id)
values
('Ron', 'Swanson', 1, null),
('Leslie', 'Knope', 2, 1),
('Ben', 'Wyatt', 4, null),
('Gary', 'Gergich', 3, 2),
('April', 'Ludgate', 5, 2),
('Andy', 'Dwyer', 6, 2);