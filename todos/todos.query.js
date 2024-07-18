var dbconnection = require('../../config/db');

exports.alltodo = function (res, id, error) {
    dbconnection.execute(`SELECT * FROM todo`, function(err, result) {
        res.status(200).json(result);
    });
}

exports.gettodoid = function (res, id) {
    dbconnection.execute(`SELECT * FROM todo WHERE id = '${id}'`, function(err, result) {
        res.status(200).json(result);
    });
}

exports.createtodo = function(res, title, description, duetime, status, userid, error) {
    dbconnection.execute(`INSERT INTO todo (title, description, due_time, status, user_id) VALUES ('${title}', '${description}', '${duetime}', '${status}', '${userid}')`, function(err, result1) {
        if (err) {
            error(res);
            return 84;
        }
        dbconnection.execute(`SELECT * FROM todo WHERE id = '${result1["insertId"]}'`, function(err, result2) {
            res.status(201).json(result2);
        });
    });
};

exports.deletetodo = function (res, id, error) {
    dbconnection.execute(`DELETE FROM todo WHERE id = '${id}'`, function(err, result) {
        if (err)
            error(res);
        else
            res.status(200).json({"msg":`Successfully deleted record number : ${id}`});
    });
}

exports.putuser = function (res, title, description, duetime, status, userid, id, error) {
    dbconnection.execute(`UPDATE todo SET title = ?, description = ?, due_time = ?, status = ?, user_id = ? WHERE id = ?`, [title, description, duetime, status, userid, id], function(err, r) {
        dbconnection.execute(`SELECT * FROM todo WHERE id = '${id}'`, function(err, result) {
            if (result.length == 0)
                error(res);
            else
                res.status(200).json(result);
        });
    });
}