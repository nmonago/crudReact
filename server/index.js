const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require("cors");

app.use(cors());
app.use(express.json());

//solicitar conexión a bd

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados_crud"
});

//recibir datos desde bd

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const year = req.body.year;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,year) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,year],
        (err,result) =>{
            if(err){
                console.log(err);  
            } else{
                res.send(result)
            }
        }
    ); //guardar información
});

app.get("/empleados",(req,res)=>{
 
    db.query('SELECT * FROM empleados',
        (err,result) =>{
            if(err){
                console.log(err);  
            } else{
                res.send(result)
            }
        }
    ); //mostrar información
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const year = req.body.year;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,year=? WHERE id=?',[nombre,edad,pais,cargo,year,id],
        (err,result) =>{
            if(err){
                console.log(err);  
            } else{
                res.send(result)
            }
        }
    ); //actualizar información
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,
        (err,result) =>{
            if(err){
                console.log(err);  
            } else{
                res.send(result)
            }
        }
    ); //eliminar información
});



app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})