"use strict";
class CrudRepository {
    constructor() {
        this.entities = [];
    }
    create(item) {
        this.entities.push(item);
    }
    getAll() {
        return this.entities;
    }
    getById(entityId) {
        return this.entities[entityId];
    }
    update(entityId, updatedItem) {
        this.entities[entityId] = updatedItem;
    }
    delete(entityId) {
        this.entities[entityId] = null;
    }
}
class UserRepository {
    constructor() {
        this.users = [];
    }
    create(item) {
        this.users.push(item);
    }
    getAll() {
        return this.users;
    }
    getById(entityId) {
        return this.users.find(user => user.userId === entityId);
    }
    update(entityId, updatedItem) {
        const userIndex = this.users.findIndex(user => user.userId === entityId);
        if (userIndex !== -1) {
            this.users[userIndex] = updatedItem;
        }
    }
    delete(entityId) {
        this.users = this.users.filter(user => user.userId !== entityId);
    }
}
const userRepository = new UserRepository();
userRepository.create({ userId: 1, fullName: 'Mohamed ehab', email: 'me5260287@gmail.com' });
userRepository.create({ userId: 2, fullName: 'Eyad ehab', email: 'eyad1111@gmail.com' });
const allUsers = userRepository.getAll();
allUsers.forEach((user) => console.log(user));
const user = userRepository.getById(1);
console.log(user);
const userForUpdate = {
    userId: 1,
    fullName: 'Mohamed Ehab Elhelaly',
    email: 'me5260287@gmail.com'
};
userRepository.update(1, userForUpdate);
const updatedUserWithIdOne = userRepository.getById(1);
console.log(updatedUserWithIdOne);
class Employee {
    get employeeId() {
        return this._employeeId;
    }
    set employeeId(value) {
        this._employeeId = value;
    }
    get employeeName() {
        return this._employeeName;
    }
    set employeeName(value) {
        this._employeeName = value;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
    constructor(employeeId, employeeName, position) {
        this._employeeId = employeeId;
        this._position = position;
        this._employeeName = employeeName;
    }
}
const employees = [
    new Employee(1, "John Doe", "Software Engineer"),
    new Employee(2, "Jane Smith", "UX Designer"),
    new Employee(3, "Bob Johnson", "Project Manager")
];
var json = JSON.stringify(employees);
console.log(json);
employees.forEach((employee) => {
    console.log(employee);
});
var updatedEmployeeNames = employees.map((employee) => employee.employeeName = 'emp: ' + employee.employeeName);
console.log(updatedEmployeeNames);
employees.forEach((employee) => {
    employee.employeeName = 'emp: ' + employee.employeeName;
});
console.log(employees);
//# sourceMappingURL=app.js.map