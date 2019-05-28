var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mysql = require('mysql');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));

 // connection configurations
 var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csweb'
});
// connect to database
dbConn.connect(); 


 // default route
 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });

// Retrieve user with id 
app.get('/hhcount/:sid/:month/:levelid/:AD/:SD/:BD', function (req, res) {
    //CALL spGetHHCount(1,'02',1,'1','0','')
    console.log( req.params);
    let surveyId = req.params.sid;
    let monthCode = req.params.month;
    let levelId = req.params.levelid;
    let aimagCode = req.params.AD;
    let soumCode = req.params.SD;
    let bagCode = req.params.BD;

    if (!surveyId) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('CALL spGetHHCount(?,?,?,?,?,?)',[surveyId, monthCode, levelId, aimagCode, soumCode, bagCode], function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
    });
});
// Retrieve user with id 
app.get('/aimags', function (req, res) {
    dbConn.query('SELECT * FROM libaimags', function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
    });
});
app.get('/soums/:AD', function (req, res) {
    let aimagCode = req.params.AD;
    if (!aimagCode) {
        return res.status(400).send({ error: true, message: 'Аймаг сумын кодоо явуулна уу' });
       }
    dbConn.query('SELECT * FROM libsoums where aimagcode = ?', aimagCode, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
    });
});

app.get('/bags/:AD/:SD', function (req, res) {
    
    let aimagCode = req.params.AD;
    let soumCode = req.params.SD;
    if (!aimagCode) {
        return res.status(400).send({ error: true, message: 'Аймаг сумын кодоо явуулна уу' });
       }
    dbConn.query("SELECT * FROM libbags where aimagcode = ? AND soumcode = ?", [aimagCode,soumCode],  function (error, results, fields) {

console.log(error);

     if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
    });
});

app.get('/result/:sid', function (req, res) {
    let surveyId = req.params.sid;
    if (!surveyId) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('SELECT * FROM libresults where questionid = ?', surveyId , function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
    });
});

//	call spGetHHPoint(1, 2, 1,'1','0','0')

app.get('/hhpoint/:sid/:month/:levelid/:AD/:SD/:BD', function (req, res) {
    console.log( req.params);
    let surveyId = req.params.sid;
    let monthCode = req.params.month;
    let levelId = req.params.levelid;
    let aimagCode = req.params.AD;
    let soumCode = req.params.SD;
    let bagCode = req.params.BD;

    if (!surveyId) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('CALL spGetHHPoint(?,?,?,?,?,?)',[surveyId, monthCode, levelId, aimagCode, soumCode, bagCode], function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
    });
});

app.get('/hhclusters/:sid/:month/:levelid/:cid/:AD/:SD/:BD', function (req, res) {
    //CALL spGetHHCount(1,'02',1,'1','0','')
    console.log( req.params);
    let surveyId = req.params.sid;
    let monthCode = req.params.month;
    let levelId = req.params.levelid;
    let clusterId = req.params.cid;
    let aimagCode = req.params.AD;
    let soumCode = req.params.SD;
    let bagCode = req.params.BD;

    if (!surveyId) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('CALL spGetHHCountByCluster(?,?,?,?,?,?,?)',[surveyId, monthCode, levelId, clusterId, aimagCode, soumCode, bagCode], function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'spGetHHCountByCluster.' });
    });
});

app.get('/clusters/:sid/:monthcode/:levelid/:AD/:SD/:BD', function (req, res) {
    
    let surveyId = req.params.sid;
    let monthCode = req.params.monthcode;
    let levelId = req.params.levelid;
    let aimagCode = req.params.AD;
    let soumCode = req.params.SD;
    let bagCode = req.params.BD;

    if (!surveyId) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    dbConn.query('CALL spGetClusters(?,?,?,?,?,?)',[surveyId, monthCode, levelId, aimagCode, soumCode, bagCode], function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'spGetClusters.' });
    });

});
// Retrieve user with id








 // set port
 app.listen(3000, function () {
     console.log('Node app is running on port 3000');
 });
 module.exports = app;