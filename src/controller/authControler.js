//token de autenticação
const jwt = require('jsonwebtoken');

//controller de autenticação
const express = require('express');

const User = require('../model/User.js');
//criptografia
const bcript = require('bcryptjs');



//chamar a classe router para definir as rotas para usuario
const router = express.Router();

//config com o hash para gerar o token
const authConfig = require('../config/auth');

router.post('/register', async(req,res)=>{
	//pegar o email
		const { email } = req.body;
	try{		
		//retornar menssagem caso o email já tenha sido cadastrado
		if (await User.findOne({ email }))
			return res.status(400).send({error: 'Email ja cadastrado'});

		const user = await User.create(req.body);

		//remove o password quando dar erro pra ele não voltar e mostrar par ao usuario
		user.password = undefined;

		return res.send({user});

		}catch (err){
			return res.status(400).send({error: 'Falha ao registrar'});
		}
});



//criar a rota de autenticação

router.post('/authenticate', async (req, res)=> {
	const { email, password } = req.body;
	//o campo passwor foi marcado como select lá no model, então ele nao viria nessa requisição
	//mas preciso dele para validar, saber se o email e dele realmente, então adiciono esse select no final
	const user = await User.findOne({ email }).select('+password');

	//verificar se o usuario existe se não
	if(!user)
		return res.status(400).send({ error: 'Usuario não encontrado'});

	//verificar se a senha e realmente do email
	//await por que demora então ela não e async por isso precisa
	//bcrypt.compare() por que a senha foi criptografada então tem que comparar com a cript.
	if (!await bcript.compare(password, user.password))
		return res.status(400).send({error: 'Senha invalida'});

	//remover o password para não retornar para o usuario
	user.password = undefined;

	//gerar o token de autenticação
	const token = jwt.sign({ id: user.id }, authConfig.secret, {
		//quando o token vai expirar
		expiresIn: 86400, //1 dia
	});
	//retorna essa informação para o usuario
	res.send({ user , token});
});

//recumperando o app, para que esse controler possa usar essa rota dentro do app
module.exports = app => app.use('/auth', router);