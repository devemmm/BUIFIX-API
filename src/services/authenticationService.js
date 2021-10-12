const User = require('../modules/User');
const Owner = require('../modules/Owner');
const { isExistUser } = require('../helper/helperFunctions')

const signup = async(userDetails)=>{
    try {

        const {email, fname, lname, nid, phone, password} = userDetails

        if(!email || !fname || !lname || !nid || !password){
            throw new Error("missing some required information");
        }


        const user = new User({
            ...userDetails,userType: 0
        });

        const owner = new Owner({
            ...{
                uid: user._id
            }
        })

        const isValidUser = await isExistUser(user.email);

        if(isValidUser){
            throw new Error("user alredy exist in system")
        }
        await user.save()
        await owner.save()

        const token = await user.generateAuthToken();
        return {user, token}
    } catch (error) {
        throw new Error(error.message);
    }
}

const signin = async({email, password})=>{
    try {
        if(!email || !password){
            throw new Error("you must provide email and password")
        }

        const user = await User.findByCredentials(email, password);
        await user.generateAuthToken();
        

        return {user};
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    signup,
    signin
}