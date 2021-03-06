// //token de autenticação
// const jwt = require("jsonwebtoken")

// //controller de autenticação
// const express = require("express")

// const { User } = require('../models')
// //criptografia
// const bcript = require("bcryptjs")

// //pra gerar token da redefinição de senha, crypto ja e do node
// const crypto = require('crypto')

// //imortar minha modulos de email
// const mailer = require('../modules/mailer')

// //chamar a classe router para definir as rotas para usuario
// const router = express.Router()

// //config com o hash para gerar o token
// const authConfig = require('../config/auth')

// //para que seja feito o update do usuario ele precisa estar logado
// const middleware = require("../middlewares/auth")

// //function para gerar o token
// function generateToken(params) {
//   return jwt.sign(params, authConfig.secret, {
//     //quando o token vai expirar
//     expiresIn: 8600 ///1 dia
//   });
// }

// /*
//   Receive one object for create
//   @object
// */

// router.post("/register", async (req, res) => {
//   //pegar o email
//   const { email } = req.body
//   try {
//     //retornar menssagem caso o email já tenha sido cadastrado
//     if (await User.findOne(email))
//       return res.status(400).send({ error: "Email ja cadastrado" })

//     const user = await User.create(req.body)
//     //remove o password quando dar erro pra ele não voltar e mostrar par ao usuario
//     user.password = undefined;

//     //envia o token e o user
//     return res.send({
//       user,
//       token: generateToken({ id: user.id, name: user.name, email: user.email })
//     });
//   } catch (err) {
//     console.log(err)
//     return res.status(400).send({ error: "Register failed" })
//   }
// });

// /*
//    Receive email and password
//    @param(email) @type(@String)
//    @param(password) @type(@String)
// */

// router.post("/authenticate", async (req, res) => {
//   const { email, password } = req.body
//   //o campo passwor foi marcado como select lá no model, então ele nao viria nessa requisição
//   //mas preciso dele para validar, saber se o email e dele realmente, então adiciono esse select no final
//   const user = await User.findOne(email)
//   //verificar se o usuario existe se não
//   if (!user) return res.status(400).send({ error: "User not found!" })
//   //verificar se a senha e realmente do email
//   //await por que demora então ela não e async por isso precisa
//   //bcrypt.compare() por que a senha foi criptografada então tem que comparar com a cript.
//   if (!(await bcript.compare(password, user.password)))
//     return res.status(400).send({ error: "Password is not valid!" })

//   //remover o password para não retornar para o usuario
//   user.password = undefined

//   //retorna essa informação para o usuario
//   res.send({
//     user,
//     token: generateToken({ id: user.id})
//   });
// });

// /**
//  * @param token
//  * 
//  */

//  router.get('/authentic', middleware, async (req, res, next) => {
//    res.send({success: true})
//  })


// /** 
//  * Receive one object data
//  * @param(@object)
// */
// router.put("/update", middleware, async (req, res, next) => {
//   const id = req.userId
//   let data = req.body
  
//   const user = await User.find(id)
//   if (!user) return res.status(400).send({ error: "User not found!" })

//   //others modifications
//   user.name = data.name

//   let Users = await User.updateUser(user)
//   res.send(Users)
// })

// //rota esqueci minha senha
// router.post("/forgot_password", async (req, res) => {
//   //recebe o email
//   const { email } = req.body

//   try {
//     const user = await User.findOne( email )

//     if (!user) return res.status(400).send({ error: "User not found" })

//     //preciso gerar um token , por que não e qualquer pessoa que pode acessar a pagina de redefinir a senha
//     const token = crypto.randomBytes(20).toString("hex")
//     //pega a hora
//     const now = new Date()
//     //soma mais uma nessa hora para o tempo de validação do token
//     now.setHours(now.getHours() + 1)

//     //alterando o usuario
//     await User.findByIdAndUpdate(user.id, {
//         passwordResetToken: token,
//         passwordResetExpired: now
//       });

//     //disparar o email
//     mailer.sendMail(
//       {
//         to: email,
//         from: "joaopaulo.queiroz.545@gmail.com",
//         template: "auth/forgot_password",
//         context: { token }
//       },
//       err => {
//         if (err) console.log(err)
//         return res
//           .status(400)
//           .send({ error: "Not posible send email" })

//         return res.send(err)
//       }
//     );
//   } catch (err) {
//     console.log(err)
//     res.status(400).send({ error: "Erro try again later" })
//   }
// })

// //recumperando o app, para que esse controler possa usar essa rota dentro do app
// module.exports = app => app.use("/auth", router);
