import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mysql from 'mysql2/promise';
import {DB_USERNAME, DB_PASSWORD} from './Consts.js';
import db from './dbConfig.js';
import Activity from './entities/Activity';
import Feedback from './entities/Feedback.js'; // other
import Professor from './entities/Professor.js'; // other
import Student from './entities/Student.js'; // other

let app = express();
let router = express.Router();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);


let conn;
mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then((connection) => {
    conn = connection
    return connection.query("CREATE DATABASE IF NOT EXISTS EmojiFeedback")
})
.then(()=>{
    return conn.end();
})
.catch((err)=>{
console.warn(err.stack);
})

Professor.hasMany(Activity, {as:"Activities", foreignKey:"ID_Professor"}); 
Activity.belongsTo(Professor, {foreignKey: "ID_Professor"});

Activity.hasMany(Feedback, {as:"Feedbacks", foreignKey:"UniqueCode_Activity"}); 
Feedback.belongsTo(Activity, {foreignKey: "UniqueCode_Activity"});

Student.hasMany(Feedback, {as:"Feedbacks", foreignKey:"ID_Student"}); 
Feedback.belongsTo(Student, {foreignKey: "ID_Student"});

db.sync();



async function getActivity(){
    return await Activity.findAll({include: ["Feedbacks"]});
}

async function createActivity(activity){
    return await Activity.create(activity, {include:[{model: Feedback, as: "Feedbacks"}]});
}

async function getActivityById(id){
    return await Activity.findbyPk(id, {include: ["Feedbacks"]});
}

async function updateActivity(id, activity){
    if(parseInt(id) !== activity.ID_Activity){
        console.log("Entity id diff");
        return;
    }
    let updateEntity = await getActivityById(id);

    if(!updateEntity){
        console.log("There isn't an activity with this id");
        return;
    }
    return updateEntity.update(activity);
}

async function deleteActivity(id){
    let deleteEntity = await getActivityById(id);

    if(!deleteEntity){
        console.log("There isn't an activity with this id");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/create').get(async(req,res) => {
    try{
        await db.sync({force : true})
        res.status().json({message: 'created'})
    }
    catch(err){
        console.warn(err.stack);
        res.status(500).json({message:'server error'})
    }
})



router.route('/activity').post(async(req,res) =>{
    res.json(await createActivity(req.body));
})

router.route('/activity').get(async(req,res) =>{
    res.json(await getActivity());
})

router.route('/activity/:id').get(async(req,res) => {
    res.json(await getActivityById(req.params.id));
})

router.route('/activity/:id').put(async(req,res) => {
    res.json(await updateActivity(req.params.id, req.body));
})

router.route('/activity/:id').delete(async(req,res) => {
    res.json(await deleteActivity(req.params.id));
})

router.route('/feedback').post(async(req,res) =>{
    res.json(await createFeedback(req.body));
})

router.route('/feedback').get(async(req,res) =>{
    res.json(await getFeedback());
})


let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);