module.exports.isCustomer = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role == "customer") {
        return next();
    } else {
        console.log(req.user)
        res.status(401).send({ message: 'Unauthorized' });
    }
   
};

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role == "admin") {
        return next();
    } else {
        console.log(req.user)
        res.status(401).send({ message: 'Unauthorized' });
    }
   
};
