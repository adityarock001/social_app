// const express = require('express')
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
                result: {}
            });
        }

        const valid_email = validationHelper.validEmail(request.body.email)
        if (!valid_email) {
            return response.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: 'Invalid email!',
                result: {},
            });
        }
        // if all the fields are filled then..
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
        // console.log(request.body)
        const loginUser = await userService.userLogin(request.body);
        return response.json(loginUser);

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
        // console.log(request.user)

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

exports.followUser = async (request, response) => {
    try {

        const required_fields = ['id']
        const validation = validationHelper.validation(required_fields, request.body)

        if (Object.keys(validation).length) {
            return response.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }

        const follow_user = await userService.followUser(request.body, request.user)
        return response.json(follow_user);

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

exports.getFollowersList = async (request, response) => {
    try {

        const get_users = await userService.getFollowersList(request.user, request.query)
        return response.json(get_users);

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

exports.getFollowingsList = async (request, response) => {
    try {

        const get_users = await userService.getFollowingsList(request.user, request.query)
        return response.json(get_users);

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

exports.unfollowUser = async (request, response) => {
    try {

        const required_fields = ['id']
        const validation = validationHelper.validation(required_fields, request.body)

        if (Object.keys(validation).length) {
            return response.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }

        const unfollow_user = await userService.unfollowUser(request.body, request.user)
        return response.json(unfollow_user);

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


