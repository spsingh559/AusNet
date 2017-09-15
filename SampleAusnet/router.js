var router = require('express').Router();

router.use('/Job', require('./webserver/api/Job/Job.router'));
console.log('request reached here');

router.use('/Employee', require('./webserver/api/Employee/Employee.router'));
console.log('Employee request reached here');

router.use('/appJob', require('./webserver/api/Job/Job.router'));

exports = module.exports = router;
