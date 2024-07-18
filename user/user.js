var bcrypt = require('bcryptjs');
const userquery = require("./user.query");
const auth = require("../../middleware/auth");
var error = require('../../middleware/notFound');

module.exports = function (app) {
    app.get('/user', auth, (req, res) => {
        userquery.alluser(res);
    });
    app.get('/user/todos', auth, (req, res) => {
        userquery.gettodo(res, req.iduser);
    });
    app.get('/users/:emailorid', auth, error.checkidoremailuser, (req, res) => {
        userquery.getinfosuser(res, req.params.emailorid, function (res) {
            res.status(404).json({"msg":"Not found"});
        });
    });
    app.put('/users/:id', auth, error.checkiduser, (req, res) => {
        var id = req.params.id;
        var firstname = req.body["firstname"];
        var password = req.body["password"];
        var email = req.body["email"];
        var name = req.body["name"];
        if (!email || !firstname || !password || !name || !id) {
            res.status(400).json({"msg":"Bad parameter"});
            return 0;
        }
        userquery.putuser(res, email, bcrypt.hashSync(password, 10), name, firstname, id, function (res) {
            res.status(404).json({"msg": "Not found"});
        });
    });
    app.delete('/users/:id', auth, error.checkiduser, (req, res) => {
        var id = req.params.id;
        userquery.deleteuser(res, id, function (res) {
            res.status(500).json({"msg":"Internal server error"});
        });
    });
}