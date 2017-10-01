const router = require('express').Router();
console.log('request reach to router of job detail');
console.log('new update');
 const jobController = require('./Job.controller.js');
// // router.post('/',roleSettingController.createRole);



// router.get('/:requestType/:applicationID', jobController.getAppNoDetails);
router.get('/applicationID/:applicationID',jobController.getApplicationData);
router.get('/status/:status', jobController.getFilterData);
router.get('/',jobController.getJobData);

router.patch('/',jobController.patchoperatorData);
//router.get('/:data',jobController.publishMsg);

// router.get('app/:ApplicantNumber', jobController.getApplicationData);




// router.post('/',jobController.postJobData);
//router.put('/',jobController.updatejob);
//router.put('/',jobController.updateOperator);
// router.delete('/:_id',roleSettingController.removeRole);

exports = module.exports = router;
