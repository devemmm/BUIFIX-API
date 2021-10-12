const express = require('express');
const { signup, signin } = require('../services/authenticationService');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json({message: 'ok, this is index file'})
});

router.post('/users/signup', async(req, res)=>{
    try {
        const {user, token} = await signup(req.body);
        
        if(!user || !token){
            throw new Error('something went wrong')
        }

        user.tokekn = token;

        res.status(201).json({status: 201, message: 'successfull', user});   
    } catch (error) {
        res.status(400).json({status: 400, message: 'failed', error: error.message })        
    }
});

router.post('/users/signin', async(req, res)=>{
    try {
        const { user} = await signin(req.body);

        return res.status(200).json({status: 200, message: 'successfull', user})
    } catch (error) {
        res.status(400).json({status: 400, message: 'failed', error: error.message })        
    }
})

router.post('/users/signout', requireAuth, async(req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)

        await req.user.save()

        res.status(200).send({})
    } catch (error) {
        return res.status(500).send({ error: { message: error.message } })
    }
})


router.post('/users/signoutAll', requireAuth, async(req, res) => {

    try {
        req.user.tokens = []

        await req.user.save()

        res.status(200).send({})
    } catch (error) {
        return res.status(500).send({ error: { message: error.message } })
    }
})

module.exports = router;