const express = require('express');
const routes = require('./router');
const databaseConfig = require('./config/database')
const swaggerDoc = require('./swaggerDoc');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(databaseConfig.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
// deploy
app.set('port', process.env.PORT || 3000);

swaggerDoc(app);

app.listen(process.env.PORT || 3000);