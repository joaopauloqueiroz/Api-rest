const { User } = require('../app/models')
const express = require("express")
const bcrypt = require('bcrypt');
const router = express.Router()

router.post('/create', async (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    try {
        const user = await User.create(Object.assign(req.body, { password: hash }));
        let data = await user.authorize();
        return res.json(data)
    } catch (error) {
         return res.status(400).send(err);
    }
      
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!email || !password) {
    return res.status(400).send(
      'Request missing username or password param'
    );
  }

  try {

    // we will cover the user authenticate method in the next section
    let user = await User.authenticate(email, password)

    return res.json(user);

  } catch (err) {
    return res.status(400).send('invalid username or password');
  }
})

router.delete('/logout', async (req, res) => {

    // because the logout request needs to be send with
    // authorization we should have access to the user
    // on the req object, so we will try to find it and
    // call the model method logout
    const { user, cookies: { auth_token: authToken } } = req
  
    // we only want to attempt a logout if the user is
    // present in the req object, meaning it already
    // passed the authentication middleware. There is no reason
    // the authToken should be missing at this point, check anyway
    if (user && authToken) {
      await req.user.logout(authToken);
      return res.status(204).send()
    }
  
    // if the user missing, the user is not logged in, hence we
    // use status code 400 indicating a bad request was made
    // and send back a message
    return res.status(400).send(
      { errors: [{ message: 'not authenticated' }] }
    );
  });

module.exports = app => app.use("/users", router)