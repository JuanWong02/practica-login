const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const {sequelize} = require('./../config/db');

class User extends  Model {
    static generateHash(password){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    RevisarPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}
User.init({
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});

module.exports = { User };