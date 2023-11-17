const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/routes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

routes.routes(app);

app.listen(3001);
console.log("servidor iniciou");
