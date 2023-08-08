// // npm init

// // npm i express body-parsor

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // npm i dotenv
require("./models/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-accesstoken,x-refreshtoken");
  next();
});

app.use(express.static("uploads"));

const port = process.env.PORT || 8081;

app.use("/api/users", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/destinations", require("./routes/destination.route"));
app.listen(port, () => console.log(`Server is listening on port ${port}`));

// destination
//     - name
//     - category
//     - address
//          - street
//          - city
//          - state
//          - country
//          - pincode
//          - latitude
//          - longitude
//      - images
//      - explanation
//      - specialities
//      - ratings
//           - rating
//           - review
//           - user
//      - timeToVisit
//      - nearBy
