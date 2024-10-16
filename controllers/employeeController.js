const { readEmployees, writeEmployees } = require('../models/employeeModel');
const fs = require('fs');

//get all employees
const getAllEmployees = (req,res) => {
    const employees = readEmployees();
    const filteredEmployees = employees.map(employee => ({
        name: employee.name,
        position: employee.position,
        id: employee.id
    }));
    
    res.status(200).json(filteredEmployees);
}

//get employee by id
const getEmployeeById = (req,res) => {
    const employees = readEmployees();
    const employee = employees.find(emp => emp.id === req.params.id);
    if(!employee) {
        return res.status(404).json({ message : 'Employee Not Found'});
    }

    res.status(200).json(employee);
}

//add new employee
const addEmployee = (req,res) => {
    const newEmployee = req.body;
    if (!newEmployee.name || !newEmployee.position || !newEmployee.department || !newEmployee.email || !newEmployee.phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const employees = readEmployees();
    newEmployee.id = `${Date.now()}`;
    employees.push(newEmployee);
    writeEmployees(employees);

    const responseEmployee = {
        name: newEmployee.name,
        position: newEmployee.position,
        id: newEmployee.id
    };

    res.status(201).json(responseEmployee);
}

//update employee by id
const updateEmployeeById = (req,res) => {
    const employees = readEmployees();
    const employeeIndex = employees.findIndex(emp => emp.id === req.params.id);

    if(employeeIndex === -1){
        return res.status(404).json({ message: "Employee not found"});
    }

    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body};
    writeEmployees(employees);
    res.status(201).json(employees[employeeIndex]);
}

//delete an employee by id

const deleteEmployeeById = (req,res) => {
    const employees = readEmployees();
    const updatedEmployees = employees.filter(emp => emp.id !== req.params.id);
    if(employees.length === updatedEmployees.length){
        return res.status(404).json({ message : 'Employee not found'});
    }

    writeEmployees(updatedEmployees);
    res.status(204).json({ message: "Employee deleted successfullly"});
};

module.exports = {
    getAllEmployees,getEmployeeById,updateEmployeeById,deleteEmployeeById,addEmployee
}