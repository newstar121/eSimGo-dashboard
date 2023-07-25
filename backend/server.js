const express = require("express");
const cors = require("cors");

const passport = require("passport")
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const keys = require('./keys')
const app = express();

const db = require('./app/models')
if (process.env.NODE_ENV === 'development') {
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
} else {
    db.sequelize.sync()
}

const User = db.user;

// var corsOptions = {
//     origin: "http://localhost:3000"
// };

// app.use(cors(corsOptions));
app.use(cors());

app.use(passport.initialize());

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
}, (jwtPayload, cb) => {

    let condition = {
        id: jwtPayload.id,
        username: jwtPayload.username,
        role: jwtPayload.role
    }

    User.findOne({
        where: condition
    }).then(user => {
        return cb(null, user)
    }).catch((err) => {
        return cb(err)
    });

}
));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes

const user = require('./app/routes/user.route')
const admin = require('./app/routes/admin.route')
const auth = require('./app/routes/auth.route');

const api = express.Router();

api.use('/user', user)
api.use('/admin', admin)
api.use('/auth', auth)

app.use('/api', api)

// set port, listen for requests
const PORT = process.env.PORT || 5055;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});