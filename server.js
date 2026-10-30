
const express = require("express");

const app = express();
app.use(express.json());

// Sample student data
let students = [
    { id: 1, name: "Divya" },
    { id: 2, name: "Rahul" }
];
app.get("/", (req, res) => {
    res.send("Student CRUD Application");
});

// GET - Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET - Get student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// POST - Add student
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: req.body.name
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT - Update student
app.put("/students/:id", (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name;
    res.json(student);
});

// PATCH - Update student name
app.patch("/students/:id", (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (req.body.name !== undefined) {
        student.name = req.body.name;
    }

    res.json(student);
});

// DELETE - Delete student
app.delete("/students/:id", (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
