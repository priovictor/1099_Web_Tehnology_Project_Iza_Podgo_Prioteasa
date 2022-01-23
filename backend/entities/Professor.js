import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Professor = db.define("Professor", {
    ID_Professor: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true,
        allowNull: false 
    },
    
    Name_Professor: {
        type: Sequelize.STRING,
        allowNull: false
    },

    City_Professor: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

export default Professor;
