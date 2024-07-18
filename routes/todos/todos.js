const todosquery = require("./todos.query");
const viewtodos = require("../../middleware/notFound");
const auth = require("../../middleware/auth");

module.exports = function (app) {
    app.get('/todos', auth, (req, res) => {
        todosquery.alltodo(res);
    });
    app.get('/todos/:id', auth, viewtodos.checkidtodo, (req, res) => {
        todosquery.gettodoid(res, req.params.id);
    });
    app.post('/todos', auth, (req, res) => {
        var title = req.body["title"];
        var description = req.body["description"];
        var duetime = req.body["duetime"];
        var status = req.body["status"];
        var userid = req.body["userid"];
        if (!title || !description || !duetime || !status || !userid) {
            res.status(400).json({"msg": "Bad parameter"});
            return 84;
        }
        todosquery.createtodo(res, title, description, duetime, status, userid, function (res) {
            res.status(400).json({"msg": "Bad parameter"});
        });
    });
    app.put('/todos/:id', auth, viewtodos.checkidtodo, (req, res) => {
        var title = req.body["title"];
        var description = req.body["description"];
        var duetime = req.body["duetime"];
        var status = req.body["status"];
        var userid = req.body["userid"];
        if (!title || !description || !duetime || !status || !userid) {
            res.status(400).json({"msg": "Bad parameter"});
            return 84;
        }
        todosquery.putuser(res, title, description, duetime, status, userid, req.params.id, function (res) {
            res.status(404).json({"msg": "Not found"});
        });
    });
    app.delete('/todos/:id', auth, viewtodos.checkidtodo, (req, res) => {
        todosquery.deletetodo(res, req.params.id, function (res) {
            res.status(500).json({"msg":"Internal server error"});
        });
    });
};