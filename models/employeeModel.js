const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/employees.json');

const readEmployees = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    const employeesData = JSON.parse(data);

    return employeesData.employees;
}

const writeEmployees = (employees) => {
    const updatedData = { employees };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
}

module.exports = {
    readEmployees, writeEmployees
}