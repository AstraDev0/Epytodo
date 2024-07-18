const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());
require('dotenv').config();
require("./routes/auth/auth")(app);
require("./routes/user/user")(app);
require("./routes/todos/todos")(app);
const port = 3000;

app.listen(port, () => {
    console.log(`Start serveur : http://localhost:${port}`);
});