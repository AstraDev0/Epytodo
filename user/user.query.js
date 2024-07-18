var dbconnection = require('../../config/db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.register = function(res, email, password, name, firstname) {
    dbconnection.execute(`INSERT INTO user (email, password, name, firstname) VALUES ('${email}','${password}','${name}','${firstname}')`, function(err, result) {
        res.status(201).json({"token":jwt.sign({email, password, name, firstname}, process.env.SECRET)});
    });
};

exports.login = function(res, email, password, error) {
    dbconnection.execute(`SELECT * FROM user WHERE email = '${email}'`, function(err, result) {
        if (result.length == 0) {
            error();
            return 84;
        }
        let id = result[0]["id"];
        let email = result[0]["email"]
        if (bcrypt.compareSync(password, result[0].password))
            res.status(200).json({"token":jwt.sign({id, email}, process.env.SECRET)});
        else
            error();
    });
};

exports.checkexistemail = function(email, execute) {
    dbconnection.execute(`SELECT * FROM user WHERE email = '${email}'`, function(err, result) {
        if (result.length > 0)
            execute(1)
        else
            execute(0)
    });
};

exports.alluser = function (res) {
    dbconnection.execute(`SELECT * FROM user`, function(err, result) {
        res.status(200).json(result);
    });
}

exports.getinfosuser = function (res, emailorid, error) {
    dbconnection.execute(`SELECT * FROM user WHERE id = '${emailorid}' OR email = '${emailorid}'`, function(err, result) {
        if (result.length == 0)
            error(res);
        else
            res.status(200).json(result);
    });
}

exports.gettodo = function (res, id) {
    dbconnection.execute(`SELECT * FROM todo WHERE userid = '${id}'`, function(err, result) {
        res.status(200).json(result);
    });
}

exports.putuser = function (res, email, password, name, firstname, id, error, erroremail) {
    dbconnection.execute(`SELECT * FROM user WHERE id = '${id}'`, function(err, result2) {
        dbconnection.execute(`SELECT * FROM user WHERE email = '${email}'`, function(err, result3) {
            if (result2[0]["email"] != email && result3.length > 0) {
                erroremail(res);
                return 0;
            }
            dbconnection.execute(`UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?`, [email, password, name, firstname, id], function(err, r) {
                dbconnection.execute(`SELECT * FROM user WHERE id = '${id}'`, function(err, result) {
                    if (result.length == 0)
                        error(res);
                    else
                        res.status(200).json(result);
                });
            });
        });
    });
}

exports.deleteuser = function (res, id, error) {
    dbconnection.execute(`DELETE FROM user WHERE id = '${id}'`, function(err, result) {
        if (err)
            error(res);
        else
            res.status(200).json({"msg":`Successfully deleted record number : ${id}`});
    });
}