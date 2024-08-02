const sequelizeDb = require('../../models')
const User = sequelizeDb.User
const Op = sequelizeDb.Sequelize.Op

exports.findAll = (req, res) => {

  User.findAll({
    attributes: ['id', 'name', 'email'],
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}








