require("./db/mongoose");
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const authenticationRoutes = require("./routes/authenticationRoutes");
const appRoutes = require('./routes/appRoutes');

const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(authenticationRoutes);
app.use(appRoutes)


app.listen(port, () => console.log(`Server is running on port ${port}`));