const userquery = require("../user/user.query");
var bcrypt = require('bcryptjs');

module.exports = function (app) {
    app.post('/register', (req, res) => {
        var firstname = req.body["firstname"];
        var password = req.body["password"];
        var email = req.body["email"];
        var name = req.body["name"];

        if (!firstname || !password || !email || !name) {
            res.status(400).json({"msg": "Bad parameter"});
            return 84;
        }
        const execute = function (num) {
            if (num) {
                res.status(400).json({"msg": "Account already exist"});
            } else {
                userquery.register(res, email, bcrypt.hashSync(password, 10), name, firstname);
            }
        }
        userquery.checkexistemail(email, execute);
    });

    app.post('/login', (req, res) => {
        var email = req.body["email"];
        var password = req.body["password"];

        if (!email || !password) {
            res.status(400).json({"msg": "Bad parameter"});
            return 84;
        }
        const execute = function () {
            res.status(401).json({"msg": "Invalid Credentials"});
        }
        userquery.login(res, email, password, execute);
    });
};