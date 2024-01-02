import express from "express";

import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const allowedOrigins = ["http://localhost:5174/"];


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use(bodyParser.json());

//get all
app.get("/students", (req, res) => {
  res.writeHead(200, {
    "Content-type": "application/json",
  });
  res.write(fs.readFileSync("students.json", "utf-8"));
  res.end("ok");
  
});

//get by id

app.get("/students/:id", (req, res) => {
  let idParam = parseInt(req.params.id);

  let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));
  console.log(students);
  let student = students.find((student) => student.id == idParam);
  if (!student) {
    res.status(404).json({
      error: "user not found",
    });
  }
  res.status(200).json({
    student,
    message: "Success",
  });
});

app.post("/students", (req, res) => {
  let data = req.body;
  let dataId = req.body.id;


  let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));

  let student = students.find((student) => student.id == dataId);

  if (student) {
    res.status(404).json({
      error: "ID da ton tai",
    });
  }

  students.push(data);

  fs.writeFileSync("students.json", JSON.stringify(students));
  res.status(201).json({
    data,
    message: "Success",
  });
});

//update by id
app.put("/students/:id", (req, res) => {
  let idParam = parseInt(req.params.id);
  let data = req.body;

  let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));

  let studentIndex = students.findIndex((student) => student.id == idParam);
  let student = students.find((student) => student.id == idParam);

  if (studentIndex === -1) {
    res.status(404).json({
      error: "ko tim thay user",
    });
    return;
  }
  students[studentIndex] = {
    ...students[studentIndex],
    ...data,
  };

  students = fs.writeFileSync("students.json", JSON.stringify(students));

  res.status(200).json({
    student,
    message: "Student updated",
  });
});

//delete by id
app.delete("/students/:id", (req, res) => {
  let idParam = parseInt(req.params.id);

  let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));

  let student = students.find((student) => student.id == idParam);

  if (!student) {
    res.status(404).json({ error: "user not found" });
  }
  students = students.filter((student) => student.id != idParam);
  fs.writeFileSync("students.json", JSON.stringify(students));

  //xoa phan tu theo index cua mang
  //   students = students.filter((student) => student.id != id);
  res.status(200).json({
    students,
    message: "success",
  });
});

app.use("/", (req, res) => {});
//

app.listen(3000, () => {
  console.log("success");
});
