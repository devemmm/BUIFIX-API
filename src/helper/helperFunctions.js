const User = require('../modules/User');

const isExistUser = async(email)=>{
    try {
        if(!email){
            throw new Error("you must provide email");
        }

        const user = await User.findOne({email})
        
        return user ? true : false
    } catch (error) {
        throw new Error(error.message)
    }
}
const isExistNid = async(nid)=>{
    try {

        if(!nid){
            throw new Error("yu must specify the national id");
        }

        const user = await User.findOne({nid});

        return user ? true : false; 
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    isExistUser,
    isExistNid
}