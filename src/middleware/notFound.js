var dbconnection = require('../config/db')

exports.checkidtodo = function (req, res, next) {
    var id = req.params.id;

    if (!id)
        res.status(400).json({"msg":"Bad parameter"});
    dbconnection.execute(`SELECT * FROM todo WHERE id = '${id}'`, function(err, result) {
        if (result.length > 0) {
            next();
        } else {
            res.status(404).json({"msg": "Not found"});
        }
    });
};

exports.checkidoremailuser = function (req, res, next) {
    var emailorid = req.params.emailorid;

    if (!emailorid)
        res.status(400).json({"msg":"Bad parameter"});
    dbconnection.execute(`SELECT * FROM user WHERE id = '${emailorid}' OR email = '${emailorid}'`, function(err, result) {
        if (result.length > 0) {
            next();
        } else {
            res.status(404).json({"msg": "Not found"});
        }
    });
};

exports.checkiduser = function (req, res, next) {
    var id = req.params.id;

    if (!id)
        res.status(400).json({"msg":"Bad parameter"});
    dbconnection.execute(`SELECT * FROM user WHERE id = '${id}'`, function(err, result) {
        if (result.length > 0) {
            next();
        } else {
            res.status(404).json({"msg": "Not found"});
        }
    });
};