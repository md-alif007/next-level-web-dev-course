// constraints -> some strict rules that should be followed . 

type ProperStudent = {
    name: string,
    id: number,
    class: number,
}

const addStudentToCourse = <T extends ProperStudent>(studentInfo: T) => {
    return {
        course: "Next Level",
        ...studentInfo
    }
}

const student1 = {
    name: "alif",
    id: 1,
    class: 10,
    hasBycycle: true
}

const student2 = {
    name: "max",
    id: 2,
    class: 10,
    hasBycycle: false
}

const student3 = {
    name: "tax",
    id: 2,
    hasBycycle: false
}

const result = addStudentToCourse(student2);
console.log(result);
