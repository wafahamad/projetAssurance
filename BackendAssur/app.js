const express = require('express');
const app = express();
const { connectDB, sequelize } = require('./database');
const cors = require('cors');
app.use(cors());
//const Admin = require('./models/Admin');
connectDB();
app.use(express.json());
const authRouter = require("./routes/authRoute");
const navigantRouter = require("./routes/navigantRoute");
const bulletinRouter = require("./routes/bulletinRoute");
const EnfantRouter = require("./routes/navigEnfRoute");
const BordereauRouter = require("./routes/bordereauRoute");
const DetailDepRouter = require("./routes/detailDepRoute");
const ReclamationRoute = require("./routes/reclamation");

app.use('/auth',authRouter);
app.use('/navigants',navigantRouter);
app.use('/bulletins',bulletinRouter);
app.use('/navigenfants',EnfantRouter);
app.use('/bordereaugats',BordereauRouter);
app.use('/detaildepenses',DetailDepRouter);
app.use('/reclamations',ReclamationRoute);


//console.log(Admin);
// Démarrez le serveur Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
