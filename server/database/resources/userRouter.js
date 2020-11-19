const userRouter = require('express').Router();
const userCtrl = require('./userController.js');
const jwt = require('jsonwebtoken');
const hash = require('../../middleware/hash')

userRouter.route('/signup')
  .post((req, res, next) => {
    userCtrl.create(req, res, next);

  })

userRouter.route('/signin')
  .post((req, res) => {
    userCtrl.login(req, res);
    // userCtrl.find({ username: req.body.username }, async (err, data) => {
    //   if (err) {
    //     res.sendStatus(500);
    //   } else if (data.length === 0) {
    //     res.status(404).send('user not found');
    //   } else {
    //     try {
    //       const valid = await bcrypt.compare(req.body.password, data[0]._doc.password);
    //       if (valid) {
    //         const token = jwt.sign({ _id: data[0]._doc._id }, 'duwjieurbyve');
    //         console.log(token);
    //         let {username, games, _id, profile} = data[0]._doc
    //         res.header('auth-token', token).json({username: username, games: games, _id: _id, profile: profile});
    //       } else {
    //         res.status(400).send('password incorrect');
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       res.sendStatus(500);
    //     }
    //   }
    // });
  });
  userRouter.route('/reset')
  .post((req, res, next) => {
    userCtrl.reset(req, res, next)

  });

  userRouter.route(`/reset/:token`)
  .post((req, res, next) => {
    // console.log("=========",req)
    userCtrl.newPassword(req, res, next)
    // res.redirect('/signin');

  })

  // .get((req, res, next) => {
  //   console.log("88888888",req.body)
  //   // path.join(__dirname + './src/components/NewPassword.js')
  //   // console.log(res)
  //   // res.sendFile('./src/components/NewPassword.js', { root: __dirname });
  //   next();
  // })

userRouter.route('/removeuser')
  .delete((req, res) => {
    userCtrl.delete(req.body, (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
  });
  
  userRouter.route('/:username')
  .put((req, res) => {
    userCtrl.update(req.params, req.body, (err, data) => {
      if (data.ok === 0) {
        res.sendStatus(400)
      }
      else {
        res.json(data)
      }
    })
  })
  .post(hash, (req, res) => {
    userCtrl.update(req.params, req.body, (err, data) => {
      if (data.ok === 0) {
        res.sendStatus(400) 
      } else {
        res.sendStatus(200)
      }
    })
  })
module.exports = userRouter;
