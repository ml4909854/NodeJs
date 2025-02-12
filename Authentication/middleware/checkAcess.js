const checkAcess = (role) => {
  return (req, res, next) => {
    if (role === req.user.role) {
        next()
    }else(
        res.sendStatus(404)
    )
  };
};

module.exports = checkAcess;
