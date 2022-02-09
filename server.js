const db = require("./db");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
      return viewDepts();
    case "View All Roles":
      return viewRoles();
    case "View All Employees":
      return viewEmployees();
    case "Add A Department":
      return promptDeptAdd();
    case "Add A Role":
      return addRole();
    case "Add An Employee":
      return promptEmpAdd();
    case "Update Employee's Role":
      return updateEmployee();
    case "Exit":
      return;
  }
};

const viewDepts = async () => {
  const [departments] = await db.viewAllDepartments();
  console.log(`/n`);
  console.table(departments);
  choices();
};

const viewRoles = async () => {
  const [roles] = await db.viewAllRoles();
  console.log(`/n`);
  console.table(roles);
  choices();
};

const viewEmployees = async () => {
  const [employees] = await db.viewAllEmployees();
  console.log(`/n`);
  console.table(employees);
  choices();
};

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


const addDept = (name) => {
  const sql = `insert into departments (department_name) values (?)`;
  const params = `${name}`;

  db.query(sql, params, (err, res) => {
    if (err) console.error(err);
    viewDepts();
  });
};

const addRole = async () => {
  const [departments] = await db.viewAllDepartments();

  const deptChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const role = await inquirer.prompt([
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
      type: "list",
      name: "dept_id",
      message: "What department does your Role belong to?",
      choices: deptChoices,
    },
  ]);
  await db.addRole(role);
  console.log(`Added ${role.title} to Roles`);
  choices();
};

// NEED:  FUNCTION to update (UPDATE) employee role (SET - which column to modify) and (WHERE)

choices();
