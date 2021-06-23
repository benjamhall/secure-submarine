const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require(`../modules/authentication-middleware`)

router.get('/', rejectUnauthenticated, (req, res) => {
  
  // what is the value of req.user????
  if(req.isAuthenticated()) {
    console.log('/secrets GET Route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user:', req.user);

    if(req.user.clearance_level >= 13) {
      pool
        .query(`SELECT * FROM "secret" `)
        .then((results) => res.send(results.rows))
        .catch((error) => {
          console.log('Error making SELECT for secrets:', error);
          res.sendStatus(500);
        });
      }
    // if(req.user.clearance_level >=)

  pool
    .query(`SELECT * FROM "secret" `)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  
  } else {
      res.sendStatus(403);
  }
});

module.exports = router;
