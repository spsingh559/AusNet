var router = require('express').Router();

router.use('/Job', require('./webserver/api/Job/Job.router'));
router.use('/Employee', require('./webserver/api/Employee/Employee.router'));
router.use('/Notification', require('./webserver/api/Notification/Notification.router'));

exports = module.exports = router;
