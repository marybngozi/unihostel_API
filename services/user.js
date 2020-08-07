const { Op } = require("sequelize");
const {User} = require('../models');

const addUser = async(obj) => {

    const userDetails = ['email', 'password', 'level', 'regNumber', 'gender', 'surname', 'firstName', 'otherName'];
            
    userDetails.forEach(info => {
        if (!obj[info]) {
            throw new Error('Some User details missing');
        }
    });

    // console.log(obj);

    const user = await User.create({
       email: obj.email,
       password: obj.password,
       regNumber: obj.regNumber,
       level: obj.level,
       firstName: obj.firstName,
       gender: obj.gender,
       surname: obj.surname,
       otherName: obj.otherName,
    })
    
    return user
}

const checkUser = async({email, regNumber}) => {
    const searchArr = [];
    if (!email && !regNumber) {
        throw new Error('No search parameter provided to find user');
    }

    if (email) {
        searchArr.push({email})
    }

    if (regNumber) {
        searchArr.push({regNumber})
    }
    
    const user = await User.findOne({
        attributes: ['email', 'regNumber'],
        where: {
            [Op.or]: searchArr
        }
    })

    if (!user) {
        return {
            status: false,
            message: "Email and Reg Number does not exist",
        }
    }

    if (email == user.email) {
        return {
            status: true,
            message: "Email Already Exists",
        }
    }

    if (regNumber == user.regNumber) {
        return {
            status: true,
            message: "Reg Number Already Exists",
        }
    }
    
}

const getUser = async({email, regNumber}) => {
    const searchArr = [];
    if (!email && !regNumber) {
        throw new Error('No search parameter provided to find user');
    }

    if (email) {
        searchArr.push({email})
    }

    if (regNumber) {
        searchArr.push({regNumber})
    }
    
    const user = await User.findOne({
        attributes: ['id', 'email', 'password', 'level', 'regNumber', 'gender', 'surname', 'firstName', 'otherName'],
        where: {
            [Op.or]: searchArr
        }
    })
    
    return user
}

module.exports = {
    addUser, checkUser, getUser
}