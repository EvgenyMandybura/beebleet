const express = require("express");
const path = require("path");
const passport = require("./config/passport");
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./routes");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("\n*************************************");
    console.log(`${process.env.DB_NAME} database connected`);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
    });
  });
