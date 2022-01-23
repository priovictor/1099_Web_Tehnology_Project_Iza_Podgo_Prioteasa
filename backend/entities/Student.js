import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Student = db.define("Student", {
    ID_Student: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true,
        allowNull: false 
    },
    
    Name_Student: {
        type: Sequelize.STRING,
        allowNull: false
    },

    City_Student: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

export default Student;
