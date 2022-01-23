import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Feedback = db.define("Feedback", {
    ID_Feedback: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true,
        allowNull: false
    },

    TypeOfEmoji:{
        type: Sequelize.STRING,
        allowNull: false
    },

    UniqueCode_Activity:{ // Foreign Key from Activity
        type: Sequelize.STRING,
        allowNull: false
    },

    ID_Student: { // Foreign Key from Student
        type: Sequelize.INTEGER,
        allowNull: false 
    },

})

export default Feedback;

