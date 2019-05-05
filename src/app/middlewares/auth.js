//importar o jwt
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

// o middleware recebe trz parametros
module.exports = (req, res, next) => {
  //primeiro eu pego esse header (authorization), para saber se e true or false
  const authHeader = req.headers.authorization;

  //verifica se o token foi passado na requisição
  if (!authHeader)
    return res.status(401).send({ error: "O token não foi informado" });

  //verificar se o formato do token foi passado de forma correta
  // sempre vem seguido de Bearer + um hash gigante
  //
  // dividir o token em duas partes depois do espacço um lado o Bearer deois o hash
  const parts = authHeader.split(" ");

  //verifica se tenho as duas partes
  if (!parts.length === 2)
    return res.status(401).send({ error: "Token com erro" });

  //se tenho as duas pastes eu vou desestruturar
  //o scheme recebe o Bearer e  o token o hash
  const [scheme, token] = parts;

  //verificar se no scheme ta escrito Bearer
  // '/'=> significa que estou começando o rejex, '^' => pra saber o inicio da verificação, bearer que e a palavra
  // que estou buscando, '/' => indica o fim, e o i => indica que e CaseInsensitive
  // ai so testar .test()

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token mal formatado" });

  //faço uma verificação passando o nosso token, e tbm a authConfig.secret (o nosso hash)
  //recebo um callBack de erro ou valido

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    //verifico se da erro no token, se o token foi passado errado
    if (err) return res.status(401).send({ error: "Token invalido" });

    //caso de decoded
    req.userId = decoded.id;
    //chama o next para ir pro proximo passo
    return next();
  });
};

/**
 * porem o next so vai ser chamado se o usuario for autenticado
 * se ele tiver permissão para acessar aquele arquivo
 */
