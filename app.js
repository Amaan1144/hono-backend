const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/employees', employeeRoutes);

app.listen(4000, (req,res)=>{
    console.log(`Server is running`);
})