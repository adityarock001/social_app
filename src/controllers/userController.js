const express = require('express')
const userService = require('../services/userService')
const app_constant = require("../constants/app.json");
const validationHelper = require("../helpers/validation");

exports.userSignUp = async (request, response) => {
    try {
        //checking all the filled are given by the user or not
        const required_fields = ["username", "email", "password"];
        const validation = validationHelper.validation(
            required_fields,
            request.body
        );
        if (Object.keys(validation).length) {
            return response.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }
        // if all the filleds are filled then..
        const addUser = await userService.userSignUp(request.body);

        return response.json(addUser);

    } catch (error) {
        console.log(error);
        response.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        });
    }
}

exports.UserLogin = async (request, response) => {
    try {
        // checking all the filled are given by the user or not
        const required_fields = ["email", "password"];
        const validation = validationHelper.validation(
            required_fields,
            request.body
        );

        if (Object.keys(validation).length) {
            return response.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }
        // if all the filleds are filled then..
        console.log(request.body)
        const addUser = await userService.userLogin(request.body);

        return response.json(addUser);
    } catch (error) {
        console.log(error);
        response.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        });
    }
};

exports.userProfile = async (request, response) => {
    try {
        console.log(request.user)

        const required_fields = ['id']
        const validation = validationHelper.validation(required_fields, request.params)

        if (Object.keys(validation).length) {
            return response.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }

        const getUser = await userService.userProfile(request.params)

        return response.json(getUser);
    } catch (error) {
        console.log(error);
        response.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        });
    }
}