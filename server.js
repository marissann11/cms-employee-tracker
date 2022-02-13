const db = require("./db");
const inquirer = require("inquirer");
const process = require("process");

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

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
        "Delete A Department",
        "Delete A Role",
        "Delete An Employee",
        "View Total Utilized Budgets",
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
      return addDept();
    case "Add A Role":
      return addRole();
    case "Add An Employee":
      return addEmployee();
    case "Update Employee's Role":
      return updateRole();
    case "Delete A Department":
      return deleteDept();
    case "Delete A Role":
      return deleteRole();
    case "Delete An Employee":
      return deleteEmployee();
    case "View Total Utilized Budgets":
      return viewBudgets();
    case "Exit":
      return process.exit();
  }
};

// view table functions

const viewDepts = async () => {
  const [departments] = await db.viewAllDepartments();
  console.log(`\n`);
  console.table(departments);
  console.log(`\n`);
  await sleep();
  choices();
};

const viewRoles = async () => {
  const [roles] = await db.viewAllRoles();
  console.log(`\n`);
  console.table(roles);
  console.log(`\n`);
  await sleep();
  choices();
};

const viewEmployees = async () => {
  const [employees] = await db.viewAllEmployees();
  console.log(`\n`);
  console.table(employees);
  console.log(`\n`);
  await sleep();
  choices();
};

// add to table functions

const addDept = async () => {
  const dept = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the Department you would like to add?",
    },
  ]);
  await db.addDept(dept);
  console.log(`Added ${dept.name} to Departments`);
  choices();
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

const addEmployee = async () => {
  const [roles] = await db.viewAllRoles();
  const roleChoices = roles.map(({ title, id }) => ({
    name: title,
    value: id,
  }));

  const [employees] = await db.viewAllEmployees();
  const managerChoices = employees.map(({ first_name, last_name, id }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const employee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the Employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the Employee?",
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is this Employee's manager?",
      choices: managerChoices,
    },
    {
      type: "list",
      name: "role_id",
      message: "What is this Employee's job title?",
      choices: roleChoices,
    },
  ]);
  await db.addEmployee(employee);
  console.log(
    `Added ${employee.first_name} ${employee.last_name} to Employees`
  );
  choices();
};

// UPDATE employee role function

const updateRole = async () => {
  const [employees] = await db.viewAllEmployees();
  const employeeChoices = employees.map(({ first_name, last_name, id }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const [roles] = await db.viewAllRoles();
  const roleChoices = roles.map(({ title, id }) => ({
    name: title,
    value: id,
  }));

  const update = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Who is the Employee whose role you would like to update?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role_id",
      message: "What will be their updated job title?",
      choices: roleChoices,
    },
  ]);
  await db.updateRole(update.role_id, update.id);
  console.log(`Employee Updated!`);
  choices();
};

// DELETE functions

const deleteDept = async () => {
  const [departments] = await db.viewAllDepartments();

  const deptChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const dept = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Please select which department you would like to delete",
      choices: deptChoices,
    },
  ]);
  await db.deleteDept(dept.id);
  console.log(`Department Deleted!`);
  choices();
};

const deleteRole = async () => {
  const [roles] = await db.viewAllRoles();

  const roleChoices = roles.map(({ title, id }) => ({
    name: title,
    value: id,
  }));

  const role = await inquirer.prompt([
    {
      type: "list",
      name: "role_id",
      message: "Please select which role you would like to delete",
      choices: roleChoices,
    },
  ]);
  await db.deleteRole(role.role_id);
  console.log(`Role Deleted!`);
  choices();
};

const deleteEmployee = async () => {
  const [employees] = await db.viewAllEmployees();

  const employeeChoices = employees.map(({ first_name, last_name, id }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const employee = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Please select which Employee you would like to delete",
      choices: employeeChoices,
    },
  ]);
  await db.deleteEmployee(employee.id);
  console.log(`Employee Deleted!`);
  choices();
};

const viewBudgets = async () => {
  const [budgets] = await db.viewBudgets();
  console.log(`\n`);
  console.table(budgets);
  console.log(`\n`);
  await sleep();
  choices();
}

choices();
