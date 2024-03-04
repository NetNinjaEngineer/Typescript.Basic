interface ICrudRepository<T extends {}> {
    create(item: T): void;
    getAll(): T[];
    getById(entityId: number): T | undefined;
    update(entityId: number, updatedItem: T): void;
    delete(entityId: number): void;
}

class CrudRepository<T extends {}> implements ICrudRepository<T extends {} ? any : any> {

    private entities: any[] = [];

    create(item: T extends {} ? any : any): void {
        this.entities.push(item);
    }
    getAll(): (T extends {} ? any : any)[] {
        return this.entities;
    }
    getById(entityId: number): (T extends {} ? any : any) | undefined {
        return this.entities[entityId];
    }
    update(entityId: number, updatedItem: T extends {} ? any : any): void {
        this.entities[entityId] = updatedItem;
    }
    delete(entityId: number): void {
        this.entities[entityId] = null;
    }

}

interface User {
    userId: number;
    fullName: string;
    email: string;
}

class UserRepository implements ICrudRepository<User> {
    private users: User[] = [];

    create(item: User): void {
        this.users.push(item);
    }
    getAll(): User[] {
        return this.users;
    }
    getById(entityId: number): User | undefined {
        return this.users.find(user => user.userId === entityId);
    }
    update(entityId: number, updatedItem: User): void {
        const userIndex = this.users.findIndex(user => user.userId === entityId);
        if (userIndex !== -1) {
            this.users[userIndex] = updatedItem;
        }
    }
    delete(entityId: number): void {
        this.users = this.users.filter(user => user.userId !== entityId);
    }

}

const userRepository: UserRepository = new UserRepository();
userRepository.create({ userId: 1, fullName: 'Mohamed ehab', email: 'me5260287@gmail.com' });
userRepository.create({ userId: 2, fullName: 'Eyad ehab', email: 'eyad1111@gmail.com' });

const allUsers: User[] = userRepository.getAll();
allUsers.forEach((user) => console.log(user));

const user: User | undefined = userRepository.getById(1);
console.log(user);

const userForUpdate: User = {
    userId: 1,
    fullName: 'Mohamed Ehab Elhelaly',
    email: 'me5260287@gmail.com'
}

userRepository.update(1, userForUpdate);

const updatedUserWithIdOne = userRepository.getById(1);
console.log(updatedUserWithIdOne);

class Employee {
    private _employeeId: number | undefined;
    private _employeeName: string | undefined;
    private _position: string | undefined;

    public get employeeId(): number | undefined {
        return this._employeeId;
    }

    public set employeeId(value: number | undefined) {
        this._employeeId = value;
    }

    public get employeeName(): string | undefined {
        return this._employeeName;
    }

    public set employeeName(value: string | undefined) {
        this._employeeName = value;
    }

    public get position(): string | undefined {
        return this._position;
    }

    public set position(value: string | undefined) {
        this._position = value;
    }

    constructor(employeeId: number, employeeName: string, position: string) {
        this._employeeId = employeeId;
        this._position = position;
        this._employeeName = employeeName;
    }

}

const employees: Employee[] = [
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
})

console.log(employees);


