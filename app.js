"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratedDtoModels_1 = require("./GeneratedDtoModels");
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
class ApiException extends Error {
    constructor(message, status, response, headers, result) {
        super();
        this.isApiException = true;
        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }
    static isApiException(obj) {
        return obj.isApiException === true;
    }
}
function login(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const _baseUr = "http://localhost:5289/";
        const endpointUrl = _baseUr + "api/v1/Auth/Login";
        let bodyAsJson = JSON.stringify(body);
        let bodyContent = {
            body: bodyAsJson,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        const response = yield fetch(endpointUrl, bodyContent);
        return yield processResponse(response);
    });
}
function processResponse(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = response.status;
        let _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v, k) => _headers[k] = v);
        }
        ;
        if (status === 400) {
            const _responseText = yield response.text();
            let result400 = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText);
            result400 = GeneratedDtoModels_1.ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        }
        else if (status === 406) {
            const _responseText_1 = yield response.text();
            let result406 = null;
            let resultData406 = _responseText_1 === "" ? null : JSON.parse(_responseText_1);
            result406 = GeneratedDtoModels_1.ProblemDetails.fromJS(resultData406);
            return throwException("Not Acceptable", status, _responseText_1, _headers, result406);
        }
        else if (status === 500) {
            const _responseText_2 = yield response.text();
            return throwException("Server Error", status, _responseText_2, _headers);
        }
        else if (status === 200) {
            const _responseText_3 = yield response.text();
            let resultData200 = _responseText_3 === "" ? null : JSON.parse(_responseText_3);
            let result200 = GeneratedDtoModels_1.AuthModel.fromJS(resultData200);
            return result200;
        }
        else if (status !== 200 && status !== 204) {
            const _responseText_4 = yield response.text();
            return throwException("An unexpected server error occurred.", status, _responseText_4, _headers);
        }
        return Promise.resolve(null);
    });
}
function throwException(message, status, response, headers, result) {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}
console.log(login(new GeneratedDtoModels_1.TokenRequestModel({
    email: "me5260287@gmail.com",
    password: "Mohamed@123456"
})).then(response => console.log(response)));
//# sourceMappingURL=app.js.map