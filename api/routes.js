

module.exports = function(app){

    // Express - Router
    const express = require("express");
    var router = express.Router();
    // -- Jobs
    var Jobs = require('./jobs');
    var jobs_router = require('./jobs').router;

    // -- referrals
    var Referrals = require('./referrals');
    var referrals_router = require('./referrals').router;

    // -- Patient assignments
    var PatientAssignment = require('./patient_assignments');
    var patient_assignment_router = require('./patient_assignments').router;

    // -- Scheduler
    var Scheduler = require('./scheduler/scheduler');
    var scheduler_router = require('./scheduler/scheduler').router;
    // ------Meetings
    var Meetings = require('./scheduler/meetings');
    var meetings_router = require('./scheduler/meetings').router;

    // ------MeetingOccurence
    var MeetingsOccurences = require('./scheduler/meetings_occurences');
    var meetings_occurences_router = require('./scheduler/meetings_occurences').router;

    // ------Speciality
    var Speciality = require('./scheduler/specialities');
    var speciality_router = require('./scheduler/specialities').router;

    // ------Speciality Assigment
    var SpecialityAssigment = require('./scheduler/specialities_assigments');
    var specialities_assigments_router = require('./scheduler/specialities_assigments').router;


    router.get('/', function(req, res) {
        res.json({ message: 'Hooray! Welcome to the Peach api!' });
    });

    router.get('/init', function(req, res) {
        Jobs.initTable();
        Meetings.initTable();
        MeetingsOccurences.initTable();
        Speciality.initTable();
        SpecialityAssigment.initTable();
        Referrals.initTable();
        PatientAssignment.initTable();
        res.json({ message: "Initialization queries executed." });
    });

     router.post('/',function(req,res,next){
       console.log(req.body);
     });


    //other routes..

    //Add header
    app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
       res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
       if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
      } else {
        return next();
      }
    });

    //Add api routes to app
    app.use('/api', router);
    app.use('/api/jobs', jobs_router);
    app.use('/api/scheduler', scheduler_router);
    app.use('/api/meetings', meetings_router);
    app.use('/api/meetings_occurences', meetings_occurences_router);
    app.use('/api/specialities', speciality_router);
    app.use('/api/specialities_assigments', specialities_assigments_router);
    app.use('/api/referrals', referrals_router);
    app.use('/api/patient_assignments', patient_assignment_router);

}
