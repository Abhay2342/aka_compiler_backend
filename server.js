const express = require('express');
const cors = require('cors');
const { exec } = require("child_process");
const knex = require('knex');
const bodyParser = require('body-parser');
const compile = require('./controllers/compile');
const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '23423212',
      database: 'compiler_db'
  }
});


// app.get('/', (req, res)=>{
// 	res.status(200);
// 	res.send("Welcome to root URL of Server");
// });

app.get('/', (req, res) => res.send("Server is ON"))
app.post('/compile', (req, res) => {compile.handleCompile(req, res)})

app.listen(PORT, (error) =>{
	if(!error)
		{
            console.log("Server is Successfully Running,and App is listening on port "+ PORT)
        }
	else
		{
            console.log("Error occurred, server can't start", error);
        }
	}
);
