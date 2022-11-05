//Constantes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
let Company = models.sequelize.models.Company;
let Checklist = models.sequelize.models.Checklist;
let Item = models.sequelize.models.Item;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { Op } = require("sequelize");


//Usuário

app.post("/createUser", async (req, res) => {
  let { company, email, password } = req.body.params;
  let searchUser = await Company.findOne({
    where:{
        email: email,
    }
  });
  if (searchUser === null) {
    await Company.create({
        'nome': company,
        'email': email,
        'senha': password,
        'createdAt': new Date(),
        'updatedAt': new Date(),
    })
    res.status(200).send('Usuário cadastrado com sucesso');
  }else{
    res.status(422).send('Esta conta de email já existe');
  }
});

app.get('/user/:email/:password', async (req, res) => {
  let {email, password} = req.params;
  let user = await Company.findOne({
    attributes: ['id', 'nome', 'email'],
    where: {
      [Op.and]:[
        {
          email: email,
          senha: password
        }
      ]
    },
  });
  if (user === null) {
    res.status(404).send('Usuário não encontrado')
  }else{
    res.status(200).send({user: user});
  }
});

app.get('/getChecklists/:idUser', async (req, res) => {
  let {idUser} = req.params;
  let checklists = await Checklist.findAll({
    attributes: ['id','nome'],
    where:{
      idCompany: idUser
    }
  });
  if (checklists === null){
    res.status(404).send('Nenhum checklist encontrado');
  }else{
    res.status(200).send({checklists: checklists});
  }
});

app.get('/items/:idChecklist', async (req, res) => {
  let {idChecklist} = req.params;
  const {count, rows} = await Item.findAndCountAll({
    attributes: ['id', 'confirmado', 'descricao'],
    where: {
      idChecklist: idChecklist
    }
  });
  if (rows === null) {
    res.status(404).send('Nenhum item encontrado');
  }else{
    res.status(200).send({count: count, items: rows})
  }
})

app.get('/Unconformities/:idChecklist', async (req, res) =>{
  let {idChecklist} = req.params;
  const {count, rows} = await Item.findAndCountAll({
    attributes: ['id', 'confirmado', 'descricao'],
      where: {
        [Op.and]: [
          { idChecklist: idChecklist }, 
          { confirmado: false }],
    }
  });
  if (rows === null) {
    res.status(404).send('Nenhum usuário encontrado');
  }else{
    res.status(200).send({count: count, items: rows})
  }
});

app.put('/setItem', async (req, res) => {
  let {idItem, confirmation} = req.body;
  let change = await Item.update({confirmado: confirmation},{
    where:{
      id: idItem
    }
  });
  if(change[0] >= 1){
    res.status(200).send("Item alterado")
  }else{
    res.status(404).send('Nenhum item alterado')
  }
  
})

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log("Servidor rodando...");
});
