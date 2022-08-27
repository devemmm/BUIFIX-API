const express = require('express');
const Stock = require('../modules/Stock');
const requireAuth = require('../middleware/requireAuth');
const { registerEmployee, getOwnActivity } = require('../services/ownerService');
const {
    setNewActivity,
    registerWageEmployee,
    deleteWageEmployee,
    payWageEmployee,
    getWageEmployees,
    getActivities,
    updateActivityProgress
} = require('../services/engineerService');
const { registerMaterial, importExportMaterial } = require('../services/stockService');


const router = express.Router();

router.post('/admin/register/employee/:type', requireAuth, async (req, res) => {
    try {
        const owner = req.user;
        const type = req.params.type

        // if((type !== "engineer") || (type !== "stocker")){
        //     throw new Error("wrong type of employee")
        // }
        const { user } = await registerEmployee({ employeeDetails: req.body, owner, type });

        res.status(201).json({ status: 201, message: 'sucessfull', user });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});


router.get('/admin/actities', requireAuth, async (req, res) => {
    try {

        if (req.user.userType !== 0 && req.user.userType !== 0) {
            throw new Error("you are not allowed to perform this action");
        }

        const actities = await getOwnActivity(req.user);
        res.status(200).json({ status: 200, message: 'successfull', actities })
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});


// -----------------------------Engineer-------------------------------
router.post('/users/register/activity', requireAuth, async (req, res) => {
    try {

        if (req.user.userType !== 1 && req.user.userType !== 0) {
            throw new Error("You are not allowed to set new Activity");
        }

        const activity = await setNewActivity(req.body, req.employee);

        res.status(201).json({ status: 201, message: 'successfull', activity });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});

router.post('/users/register/wage_employee', requireAuth, async (req, res) => {
    try {

        if (req.user.userType !== 1 && req.user.userType !== 0) {
            throw new Error("you are not allowed to register waged employee");
        };

        const employee = await registerWageEmployee(req.body, req);

        res.status(201).json({ status: 201, message: 'successfull', employee });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});


router.delete('/users/wage_employee/:nid', requireAuth, async (req, res) => {
    try {
        const employee = await deleteWageEmployee(req.params.nid, req.employee);

        res.status(200).json({ status: 200, message: 'employee blocked', employee });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});

router.post('/users/pay/wage_employee', requireAuth, async (req, res) => {
    try {

        if (req.user.userType !== 1 && req.user.userType !== 0) {
            throw new Error("you are not allowed to perfom this action");
        }

        const response = await payWageEmployee(req.body, req.employee)

        res.status(201).json({ status: 200, message: 'successfull', transaction: response })
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});

router.get('/users/wage/employees', requireAuth, async (req, res) => {
    try {

        if (req.user.userType !== 1 && req.user.userType !== 0) {
            throw new Error("you are not allowed to perform this action");
        }

        const employees = await getWageEmployees(req);
        res.status(200).json({ status: 200, message: 'successfull', numberOfEmployees: employees.length, employees })
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
})

router.get('/users/actities', requireAuth, async (req, res) => {
    try {
        if (req.user.userType !== 1 && req.user.userType !== 0) {
            throw new Error("you are not allowed to perform this action");
        }

        const actities = await getActivities(req);
        res.status(200).json({ status: 200, message: 'successfull', actities })
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});

router.patch('/users/employees/actities/:id', requireAuth, async (req, res) => {
    try {
        if (!req.query.expenses) {
            throw new Error('you must specify the new expenses');
        }

        let expenses = parseInt(req.query.expenses);

        if (req.user.userType !== 1 && req.user.userType !== 0) {
            throw new Error("you are not allowed to perform this action");
        }

        const actities = await updateActivityProgress(req, req.params.id, expenses);
        res.status(200).json({ status: 200, message: 'successfull', actities })
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
})
// -----------------------------Stock------------------------------------
router.get('/users/stock', requireAuth, async (req, res) => {
    try {
        if (req.user.userType !== 2 && req.user.userType !== 0) {
            throw new Error("you are not allowed to manage this stock");
        }
        const stock = await Stock.find({ owner: req.employee?.owner ? req.employee.owner : req.user._id })
        res.status(200).json({ status: 200, message: 'successfull', stock });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
})

router.post('/users/register/materials', requireAuth, async (req, res) => {
    try {

        const user = req.user;
        if (user.userType !== 2 && req.user.userType !== 0) {
            throw new Error("you are not allowed to register materials");
        }

        const material = await registerMaterial(req.body);

        res.status(201).json({ status: 201, message: 'successfull', material });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});

router.patch('/users/register/materials/:type', requireAuth, async (req, res) => {

    try {
        if (req.user.userType !== 2 && req.user.userType !== 0) {
            throw new Error("you are not allowed to manage this stock");
        }
        const { min, mout } = req.params;

        const material = await importExportMaterial(req.body, req.params.type, req.employee);


        res.status(201).json({ status: 201, message: 'successfull', material });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'failed', error: error.message });
    }
});

module.exports = router;