const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  viewAllDepartments() {
    return this.connection.promise().query(`
        select
            departments.id,
            departments.name
        from
            departments
        `);
  }
  viewAllRoles() {
    return this.connection.promise().query(`
        select
            roles.id,
            roles.title,
            roles.salary,
            departments.name as department
        from
            roles
        left join 
            departments on roles.dept_id = departments.id
        `);
  }
  viewAllEmployees() {
    return this.connection.promise().query(`
        select
            employees.id,
            employees.first_name,
            employees.last_name,
            employees.manager_id,
            roles.title as title,
            roles.salary as salary,
            departments.name as department
        from
            employees
        left join
            roles on employees.role_id = roles.id
        left join
            departments on roles.dept_id = departments.id
        `);
  }
  addDept(dept) {
    return this.connection.promise().query(
      `
        insert into
            departments
        set
            ?
        `,
      dept
    );
  }
  addRole(role) {
    return this.connection.promise().query(
      `
        insert into
            roles
        set
            ?
        `,
      role
    );
  }
  addEmployee(employee) {
    return this.connection.promise().query(
      `
        insert into
            employees
        set
            ?
        `,
      employee
    );
  }
  updateRole(roleId, employeeId) {
    return this.connection.promise().query(
      `
        update
            employees
        set
            role_id = ?
        where
            id = ?
        `,
      [roleId, employeeId]
    );
  }
  deleteDept(dept) {
    return this.connection.promise().query(
      `
        delete from
            departments
        where
            id = ?
        `,
      dept
    );
  }
  deleteRole(role) {
    return this.connection.promise().query(
      `
        delete from
            roles
        where
            id = ?
        `,
      role
    );
  }
  deleteEmployee(employee) {
    return this.connection.promise().query(
      `
        delete from
            employees
        where
            id = ?
        `,
      employee
    );
  }
}

module.exports = new DB(connection);
