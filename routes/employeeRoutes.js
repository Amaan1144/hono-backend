const express = require('express');
const { getAllEmployees,getEmployeeById,addEmployee,updateEmployeeById,deleteEmployeeById } = require('../controllers/employeeController');

const router = express.Router();

// get all employees
router.get('/', getAllEmployees);

// get particular employee by id
router.get('/:id', getEmployeeById);

// add a new employee
router.post('/', addEmployee);

// update a employee by id
router.put('/:id', updateEmployeeById);

// delete a employee by id
router.delete('/:id', deleteEmployeeById);

module.exports = router;