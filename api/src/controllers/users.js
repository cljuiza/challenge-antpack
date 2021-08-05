const { v4: uuidV4 } = require("uuid");
const { User } = require("../db");

const getAllUsers = (req, res, next) => {
  return User.findAll()
    .then((users) => res.send(users))
    .catch((error) => next(error));
};

const addUser = (req, res, next) => {
  const user = req.body;
  return User.create({
    ...user,
    id: uuidV4(),   
  })
    .then((users) => res.send(users))
    .catch((error) => next(error));
};

const updateUser = (req, res, next) => {
  const id = req.params.id;
  const user = req.body;
  return User.update(user, {
    where: {
      id,
    },
  })
    .then((updateUser) => res.send(updateUser))
    .catch((error) => next(error));
};

const deleteUser = (req, res, next) => {
  const id = req.params.id;
  return User.destroy({
    where: {
      id,
    },
  })
    .then(() => res.sendStatus(200))
    .catch((error) => next(error));
};

module.exports={
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}