const Owner = require('../modules/Owner');
const Employee = require('../modules/Employee');
const Wage = require('../modules/Wage')
const Wage_Employee = require('../modules/Wage_Employee');


const setNewActivity = async(activityDetails, engineer)=>{
    try {

        if(!activityDetails.name || !activityDetails.budget){
            throw new Error("you must provide activity name and budget ")
        }

        const owner = await Owner.findOne({uid: engineer.owner});

        activityDetails.eid = engineer.uid;
        activityDetails.startingDate = Date.now();
        activityDetails.endingDate = new Date();

        owner.activity.push(activityDetails);

        await owner.save();

        return owner.activity[owner.activity.length -1]
    } catch (error) {
        throw new Error(error.message);
    }
}

const registerWageEmployee = async(employeeDetails, engineer)=>{
    try {

        const employee = new Wage_Employee({
            ...employeeDetails
        });

        
        employee.owner = engineer.owner;

        const owner = await Owner.findOne({uid: engineer.owner});

        if(employeeDetails.nid.length !== 16){
            throw new Error("wrong national id");
        }

        const isExistingEmployee = owner.wei.toString().includes(`${employeeDetails.nid}`);

        if(isExistingEmployee){
            throw new Error("employee alredy registed in this project")
        };

        owner.wei.push(employee.nid);
        await employee.save();
        owner.save();

        return employee;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteWageEmployee = async(nid, employee)=>{
    try {
        return await Wage_Employee.findOneAndUpdate({nid, owner: employee.owner}, {active: false});
    } catch (error) {
        throw new Error(error.message);
    }
}


const payWageEmployee = async(employees, engineer)=>{
    try {
        employees.forEach(async(employee) => {
            employee.owner = engineer.owner;
            employee.uid = employee._id

            delete employee._id

            const wage = new Wage({
                ...employee
            });

            await wage.save();
        });

        return "transaction successfull";
    } catch (error) {
        throw new Error(error.message);
    }
}


const getWageEmployees = async(employee)=>{
    try {
        const wageEmployee = await Wage_Employee.find({owner: employee.owner});
        return wageEmployee;
    } catch (error) {
        throw new Error(error,message);
    }
}

const getActivities = async(employee)=>{
    try {
        const owner = await Owner.findOne({uid: employee.owner});
        return owner.activity;
    } catch (error) {
        throw new Error(error,message);
    }
}

const updateActivityProgress = async(employee, id, expenses)=>{
    try {
        const owner = await Owner.findOne({uid: employee.owner});

        const activity = owner.activity.map(item=>{
            if(item._id.toString() === id){
                
                item.expenses = item.expenses + expenses;
                if(item.expenses > item.budget){
                    item.expenses = item.expenses - expenses;

                    throw new Error( "Expenses greater than Buget please contact owner of the project")
                }
                return item;
            }else{
                return item
            }
        });
        owner.activity = activity;
        await owner.save();
        
        return owner.activity;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    setNewActivity,
    registerWageEmployee,
    deleteWageEmployee,
    payWageEmployee,
    getWageEmployees,
    getActivities,
    updateActivityProgress
}