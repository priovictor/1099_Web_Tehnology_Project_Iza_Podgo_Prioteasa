import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Activity = db.define("Activity", {
    ID_Activity: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Name_Activity:{
        type: Sequelize.STRING,
        allowNull: false
    },

    UniqueCode_Activity:{
        type: Sequelize.STRING,
        allowNull: false
    },

    Date_Activity:{
        type: Sequelize.DATE,
        allowNull: false
    },

    Description_Activity:{
        type: Sequelize.STRING,
        allowNull: false
    },

    ID_Professor: { // Foreign Key from Professor 
        type: Sequelize.INTEGER,
        allowNull: false 
    },
})

export default Activity;

