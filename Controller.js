//Constantes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
let Company = models.sequelize.models.Company;

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
  console.log(email, password);
  let user = await Company.findOne({
    attributes: ['id'],
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
    res.status(200).send('Usuário encontrado');
  }
});

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log("Servidor rodando...");
});
