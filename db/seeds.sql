insert into departments (name)
values
('State'),
('City Hall'),
('Parks and Recreation');

insert into roles (title, salary, dept_id)
values
('Director', 100000, 1),
('Deputy Director', 80000, 3),
('Administrator', 60000, 3),
('Auditor', 50000, 1),
('Intern', 33000, 3),
('Shoeshiner', 50, 2);

insert into employees (first_name, last_name, manager_id, role_id)
values
('Ron', 'Swanson', null, 1),
('Leslie', 'Knope', 1, 2),
('Ben', 'Wyatt', null, 4),
('Gary', 'Gergich', 2, 3),
('April', 'Ludgate', 1, 5),
('Andy', 'Dwyer', null, 6);