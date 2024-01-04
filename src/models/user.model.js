const students = [
  { id: 3, name: "test  ok", age: "test" },
  { id: 2, name: "Hieu java", age: "12" }
];

export default {
  findMany: () => {
    return students
  },
  findById: (userId)=>{
    return students.find(user => user.id == userId)
  }
};