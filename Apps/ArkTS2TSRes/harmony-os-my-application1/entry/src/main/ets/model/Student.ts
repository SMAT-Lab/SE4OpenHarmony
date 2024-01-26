let __generate__Id: number = 0;
function generateId(): string {
    return "Student_" + ++__generate__Id;
}
//学生数据模型
@Observed
export class Student {
    userName: string;
    age: number;
    constructor(params: {
        userName: string;
        age: number;
    }) {
        this.userName = params.userName;
        this.age = params.age;
    }
}
export class SystemManager {
    public name: string;
    student: Student;
    constructor(name: string, student: Student) {
        this.name = name;
        this.student = student;
    }
}
