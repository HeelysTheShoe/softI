const { createNextState } = require('@reduxjs/toolkit');
const userModel = require('../db/model');

module.exports = {
    saveUserToDB: (req, res, next) => {
        const {username, password} = req.body;
        userModel.create({username: username, password: password})
            .then(data => {
                // console.log('Successful save')
                res.locals.saveUserToDB = true; 
                next();
            })
            .catch(err => next({
                log: 'userController.saveUserToDB',
                status: 400,
                message: {err: 'userController.saveUserToDB - Error!'}
            }))
    },
    checkLogin: (req, res, next) => {
        const {username, password} = req.body;
        userModel.findOne({username, password})
            .then(data => {
                if (data.username === username && data.password == password){
                    res.locals.checkLogin = true;
                    return next();
                }
            })
            .catch(err => next({
                log: 'userController.checkLogin',
                status: 400,
                message: {err: 'userController.checkLogin - Error!'}
            }))
    }
}