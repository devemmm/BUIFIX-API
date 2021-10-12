const Employee = require('../modules/Employee');
const Owner = require('../modules/Owner');
const User = require('../modules/User');
const { isExistUser, isExistNid} = require('../helper/helperFunctions');


const registerEmployee = async({employeeDetails, owner, type})=>{
    try {

        if(owner.userType !== 0){
            throw new Error("you are not allowed to register employees");
        };

        const isExistingUser = await isExistUser(employeeDetails.email);
        const isExistingNid = await isExistNid(employeeDetails.nid)
        

        if(isExistingUser){
            throw new Error("someone was registerd with is email");
        }

        if(isExistingNid){
            throw new Error("someone was registerd with this national id");
        }
        
        const user = new User({
            ...employeeDetails
        });

        type === "engineer" ? user.userType = 1 : user.userType = 2


        const employee = new Employee({
            uid: user._id,
            owner: owner._id,
            salary: employeeDetails.salary
        });

        // //update owner employee
        const projectOwner = await Owner.findOne({uid: owner._id});
        type === "engineer"? (projectOwner.eid).push(employee.uid) : (projectOwner.sid).push(employee.uid)

        await user.save();
        await user.generateAuthToken();
        await employee.save();
        await projectOwner.save();
    
        return {user};
    } catch (error) {
        throw new Error(error.message)
    }
}


const getOwnActivity = async(user)=>{
    try {
        const owner = await Owner.findOne({uid: user._id})
        return owner.activity
    } catch (error) {
        throw new Error(error,message);
    }
}
module.exports = {
    registerEmployee,
    getOwnActivity
};