//Constantes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const models = require("./models");
let Company = models.sequelize.models.Company;
let Checklist = models.sequelize.models.Checklist;
let Item = models.sequelize.models.Item;
let Responsible = models.sequelize.models.Responsible;
let Classification = models.sequelize.models.Classification;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { Op } = require("sequelize");

//Usuário

app.post("/createUser", async (req, res) => {
  let { company, email, password } = req.body.params;
  let searchUser = await Company.findOne({
    where: {
      email: email,
    },
  });
  if (searchUser === null) {
    await Company.create({
      nome: company,
      email: email,
      senha: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).send("Usuário cadastrado com sucesso");
  } else {
    res.status(422).send("Esta conta de email já existe");
  }
});

app.get("/user/:email/:password", async (req, res) => {
  let { email, password } = req.params;
  let user = await Company.findOne({
    attributes: ["id", "nome", "email"],
    where: {
      [Op.and]: [
        {
          email: email,
          senha: password,
        },
      ],
    },
  });
  if (user === null) {
    res.status(404).send("Usuário não encontrado");
  } else {
    res.status(200).send({ user: user });
  }
});

app.get("/getChecklists/:idUser", async (req, res) => {
  let { idUser } = req.params;
  let checklists = await Checklist.findAll({
    attributes: ["id", "nome"],
    where: {
      idCompany: idUser,
    },
  });
  if (checklists === null) {
    res.status(404).send("Nenhum checklist encontrado");
  } else {
    res.status(200).send({ checklists: checklists });
  }
});

app.get("/items/:idChecklist", async (req, res) => {
  let { idChecklist } = req.params;
  const { count, rows } = await Item.findAndCountAll({
    attributes: ["id", "confirmado", "descricao"],
    where: {
      idChecklist: idChecklist,
    },
  });
  if (rows === null) {
    res.status(404).send("Nenhum item encontrado");
  } else {
    res.status(200).send({ count: count, items: rows });
  }
});

app.get("/Unconformities/:idChecklist", async (req, res) => {
  let { idChecklist } = req.params;
  const { count, rows } = await Item.findAndCountAll({
    attributes: ["id", "confirmado", "descricao"],
    where: {
      [Op.and]: [{ idChecklist: idChecklist }, { confirmado: false }],
    },
  });
  if (rows === null) {
    res.status(404).send("Nenhum usuário encontrado");
  } else {
    res.status(200).send({ count: count, items: rows });
  }
});

app.put("/setItem", async (req, res) => {
  let { idItem, confirmation } = req.body;
  let change = await Item.update(
    { confirmado: confirmation },
    {
      where: {
        id: idItem,
      },
    }
  );
  if (change[0] >= 1) {
    res.status(200).send("Item alterado");
  } else {
    res.status(404).send("Nenhum item alterado");
  }
});

app.get("/responsibles/:idUser", async (req, res) => {
  let idUser = req.params.idUser;
  let responsibles = await Responsible.findAll({
    attributes: ["id", "nome"],
    where: {
      idCompany: idUser,
    },
  });
  if (responsibles === null) {
    res.status(404).send("Nenhum responsável encontrado");
  } else {
    res.status(200).send({ responsibles: responsibles });
  }
});

app.get("/classifications/:idUser", async (req, res) => {
  let idUser = req.params.idUser;
  let classifications = await Classification.findAll({
    attributes: ["id", "descricao", "prazo"],
    where: {
      idCompany: idUser,
    },
  });
  if (classifications === null) {
    res.status(404).send("Nenhuma classificação encontrada");
  } else {
    res.status(200).send({ classifications: classifications });
  }
});

//Envio de email
app.post("/sendEmail", async (req, res) => {
  let { responsible, classification, justification } = req.body.params;
  
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "qualistapp@gmail.com",
      pass: "dunjubeetamwzqdi",
    },
  });

  let {email, nome} = await Responsible.findByPk(responsible,{
    attributes: ["email","nome"]
  }).then(((response)=>{
    let {email, nome} = response.dataValues;
    return {email, nome}
  })) 

  let {descricao, prazo} = await Classification.findByPk(classification,{
    attributes: ["descricao", "prazo"]
  })
  .then((response) => {
    let {descricao, prazo} = response.dataValues;
    return {descricao, prazo}
  })
  .catch((error) => console.log(err)) 
  

  transport
    .sendMail({
      from: "Qualist App <qualistapp@gmail.com>",
      to: email,
      subject: "Solicitação de Resolução de Não Conformidade",
      html: `
        <h1>Solicitação de Resolução de Não Conformidade</h1>
        <h2>Problema: </h2>
        <p>
        Caro Sr(a) <strong>${nome}</strong> nossa equipe de garantia da qualidade
        notou que você possui uma 
        não conformidade e que de acordo com nossa equipe 
        se encaixa como uma não conformidade
        de categoria <strong>${descricao}</strong> e de
        acordo com eles o problema é: <strong>${justification}</strong>. 
        </p>
        <h2>Medidas a serem tomadas:</h2>
        <p>
          De acordo com a nossa equipe você terá até <strong>${prazo} dias úteis, a partir da data de hoje, 
          para que esta não conformidade seja resolvida.</strong>.
        </p>
        <h2>Não conformidade não resolvida:</h2>
        <p>
          É de extrema importância que as não conformidades dentro de nossa empresa
          sejam sempre atendidas no prazo, pois prezamos pela qualidade em nossa organização.
          Devido a nossa busca por qualidade extrema, caso a não conformidade não seja
          atendida no prazo, <strong>a não conformidade deve e será escalonada ao seu superior mais próximo na hierarquia</stron>
        </p>
        <p><strong>
          Obs: Caso haja a necessidade,você possui 24 horas para realizar 
          a contestação desta não conformidade respondendo a este email
        </strong></p>
        <h3>Obrigado por fazer parte do time Qualist, Sr(a). ${nome}</h3>
      `,
      text: "Olá Nodemailer! Esse email foi enviado usando o Nodemailer",
    })
    .then((info) => res.send(info))
    .catch((err) => res.send(err));
});

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log("Servidor rodando...");
});
