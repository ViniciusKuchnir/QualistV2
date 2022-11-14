//Constantes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const models = require("./models");
const moments = require('moment-business-days');
let Company = models.sequelize.models.Company;
let Checklist = models.sequelize.models.Checklist;
let Item = models.sequelize.models.Item;
let Responsible = models.sequelize.models.Responsible;
let Classification = models.sequelize.models.Classification;
let Sector = models.sequelize.models.Sector;
const Sequelize = require('sequelize');

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
      CompanyId: idUser,
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
      ChecklistId: idChecklist,
    },
  });
  if (rows === null) {
    res.status(404).send("Nenhum item encontrado");
  } else {
    res.status(200).send({ count: count, items: rows });
  }
});

app.get('/getUnconformities/:idCompany', async (req, res) => {
  let { idCompany } = req.params;
  const unconformities = await Item.findAll({
    attributes: {
      exclude: ['checklistId','ClassificationId','ResponsibleId','ChecklistId','createdAt', 'updatedAt'],
    },
  include: [
    {
      model: Responsible,
      as: 'responsible',
      attributes: {
        exclude: ['id','SectorId','CompanyId','createdAt', 'updatedAt'],
      },
      include:[{
        model: Sector,
        as: 'sector',
        attributes:{
          exclude: ['createdAt', 'updatedAt']
        }
      }]
    },
    {
    model: Checklist,
    as: 'checklist',
    attributes: {
      exclude: ['CompanyId','createdAt', 'updatedAt'],
    },
    where:{CompanyId: idCompany} 
    },
  ],
  where: {confirmado: false},
  });
  if(unconformities === null){
    res.status(404).send("Nenhum item encontrado");
  }else{
    res.status(200).send({ unconformities: unconformities});
  }
});

app.get("/Unconformities/:idChecklist", async (req, res) => {
  let { idChecklist } = req.params;
  const { count, rows } = await Item.findAndCountAll({
    attributes: ["id", "confirmado", "descricao"],
    where: {
      [Op.and]: [{ ChecklistId: idChecklist }, { confirmado: false }],
    },
  });
  if (rows === null) {
    res.status(404).send("Nenhum usuário encontrado");
  } else {
    res.status(200).send({ count: count, items: rows });
  }
});

app.put("/setItem", async (req, res) => {
  let { idItem, confirmation, deadline } = req.body;
  if(confirmation == false){
    await Item.update(
      { 
        confirmado: !confirmation,
        prazo:null,
        justificativa: null
      },
      {
        where: {
          id: idItem,
        },
      }
    );
  }else{
   await Item.update(
      { 
        confirmado: !confirmation,
        prazo: deadline, 
      },
      {
        where: {
          id: idItem,
        },
      }
    );
  }
});

app.get("/responsibles/:idUser", async (req, res) => {
  let idUser = req.params.idUser;
  let responsibles = await Responsible.findAll({
    attributes: ["id", "nome"],
    where: {
      CompanyId: idUser,
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
      CompanyId: idUser,
    },
  });
  if (classifications === null) {
    res.status(404).send("Nenhuma classificação encontrada");
  } else {
    res.status(200).send({ classifications: classifications });
  }
});

app.get('/deadline/:idItem', async (req, res) => {
  let {idItem} = req.params;
  const deadline = await Item.findOne({
    attributes:{
      exclude: ['createdAt', 'updatedAt'],
    },
    where: {id: idItem},
    include:[
      {
        model: Classification,
        as: 'classification',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  });
  if (deadline === null) {
    res.status(404).send("Nenhuma deadline encontrada");
  }else{
    res.status(200).send({deadline});
  }
})

//Envio de email
app.post("/sendEmail", async (req, res) => {
  let { idItem, justification, confirmation } = req.body.params;
  
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "qualistapp@gmail.com",
      pass: "dunjubeetamwzqdi",
    },
  });

  const content = await Item.findOne({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include:[
      {
      model: Responsible,
      as: 'responsible',
      required: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    {
      model: Classification,
      as: 'classification',
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  ],
  where: {id: idItem}
  });

  await Item.update(
    { 
      justificativa: justification,
      prazo: moments().businessAdd(content.classification.prazo).format('YYYY-MM-DD'),
      confirmado: !confirmation
    },
    {
      where: {
        id: idItem,
      },
    }
  );

  transport
  .sendMail({
    from: "Qualist App <qualistapp@gmail.com>",
    to: content.responsible.email,
    subject: "Solicitação de Resolução de Não Conformidade",
    html: `
      <h1>Solicitação de Resolução de Não Conformidade</h1>
      <h2>Problema: </h2>
      <p>
      Caro Sr(a) <strong>${content.responsible.nome}</strong> nossa equipe de garantia da qualidade
      notou que você possui uma 
      não conformidade e que de acordo com nossa equipe 
      se encaixa como uma não conformidade
      de categoria <strong>${content.descricao}</strong> e de
      acordo com eles o problema é: <strong>${justification}</strong>. 
      </p>
      <h2>Medidas a serem tomadas:</h2>
      <p>
        De acordo com a nossa equipe você terá até <strong>${content.classification.prazo} dias úteis, a partir da data de hoje, 
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
      <h3>Obrigado por fazer parte do time Qualist, Sr(a). ${content.responsible.nome}</h3>
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
