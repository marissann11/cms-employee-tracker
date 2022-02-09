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

insert into employees (first_name, last_name, role_title, department_name, role_salary, manager_name)
values
('Ron', 'Swanson', 'Director', 'Parks and Recreation', 100000, null),
('Leslie', 'Knope', 'Deputy Director', 'Parks and Recreation', 80000, 'Ron'),
('Ben', 'Wyatt', 'Auditor', 'State', 50000, null),
('Gary', 'Gergich', 'Administrator', 'Parks and Recreation', 60000, 'Leslie'),
('April', 'Ludgate', 'Intern', 'Parks and Recreation', 33000, 'Leslie'),
('Andy', 'Dwyer', 'Shoeshiner', 'City Hall', 50, null);