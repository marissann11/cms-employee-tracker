const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

// NEED:  INQUIRER prompt asking what to do
//     1. View All Depts  2. View All Roles  3. View All Employees  4. Add Dept  5. Add Role  6. Add Employee  7. Update Employee Role

const choices = async () => {
  let res = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update Employee's Role",
        "Exit",
      ],
    },
  ]);
  switch (res.choice) {
    case "View All Departments":
      viewDepts();
      break;
    case "View All Roles":
      viewRoles();
      break;
    case "View All Employees":
      viewEmployees();
      break;
    case "Add A Department":
      promptDeptAdd();
      break;
    case "Add A Role":
      promptRoleAdd();
      break;
    case "Add An Employee":
      promptEmpAdd();
      break;
    case "Update Employee's Role":
      console.log("update employee");
      break;
    case "Exit":
      return;
  }
};

// NEED:  FUNCTIONS to QUERY (connection.query) SELECT * FROM * and Console.Table RESULT

const viewDepts = () => {
  const sql = `select * from departments`;
  db.query(sql, (err, res) => {
    if (err) console.error(err);
    console.table(res);
    choices();
  });
};
const viewRoles = () => {
  const sql = `select * from roles`;
  db.query(sql, (err, res) => {
    if (err) console.error(err);
    console.table(res);
    choices();
  });
};
const viewEmployees = () => {
  const sql = `select * from employees`;
  db.query(sql, (err, res) => {
    if (err) console.error(err);
    console.table(res);
    choices();
  });
};

// NEED:  INQUIRER prompts to ask about ADDING to dept, roles, or employees

const promptDeptAdd = async () => {
  let res = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the Department you would like to add?",
    },
  ]);
  addDept(res.name);
};
const promptRoleAdd = async () => {
  let res = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the Role you would like to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the Role you would like to add?",
    },
    {
      type: "input",
      name: "department",
      message: "In what department does this role belong?",
    },
  ]);
  addRole(res.title, res.salary, res.department);
};
const promptEmpAdd = async () => {
  let res = await inquirer.prompt([
    {
      type: "input",
      name: "first",
      message: "What is the first name of the employee?",
    },
    {
      type: "input",
      name: "last",
      message: "What is the last name of the employee?",
    },
    {
        // Better way to do this?
      type: "input",
      name: "role",
      message: "What is the ID of this employee's role?",
    },
    {
      type: "confirm",
      name: "confirmManager",
      message: "Does this employee have a manager?",
      default: true,
    },
    {
        // Better way to do this?
      type: "input",
      name: "manager",
      message: "What is the ID of this employee's manager?",
      when: ({ confirmManager }) => confirmManager,
    },
  ]);
  if (!res.manager) {
    addEmployee(res.first, res.last, res.role, null);
  } else {
    addEmployee(res.first, res.last, res.role, res.manager);
  }
};

// NEED:  FUNCTION(S) to ADD (INSERT INTO) to departments, roles, or employees

const addDept = (name) => {
  const sql = `insert into departments (department_name) values (?)`;
  const params = `${name}`;

  db.query(sql, params, (err, res) => {
    if (err) console.error(err);
    viewDepts();
  });
};
const addRole = (title, salary, department) => {
  const roleInfo = { title, salary, department };
  const roleArr = Object.values(roleInfo);

  const sql = `insert into roles (title, salary, dept_id) values (?,?,?)`;
  const params = roleArr;

  db.query(sql, params, (err, res) => {
    if (err) console.error(err);
    viewRoles();
  });
};
const addEmployee = (first, last, role, manager) => {
  const empInfo = { first, last, role, manager };
  const empArr = Object.values(empInfo);

  const sql = `insert into employees (first_name, last_name, role_id, manager_id) values (?,?,?,?)`;
  const params = empArr;

  db.query(sql, params, (err, res) => {
    if (err) console.error(err);
    viewEmployees();
  });
};

// NEED:  INQUIRER prompt (with CTABLE) to display as a LIST choices of employee's first and last names to choose who to UPDATE

// NEED:  FUNCTION to update (UPDATE) employee role (SET - which column to modify) and (WHERE)

choices();
