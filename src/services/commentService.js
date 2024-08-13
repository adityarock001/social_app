const { mongoose} = require('mongoose')
const app_constant = require("../constants/app.json");
require('dotenv').config()
// const cloudinary = require('../helpers/cloudinary')
const commentModel = require('../models/postModel')

exports.addComment = async (data, user_data) => {
    const {_id} = user_data
    const { post_id, comment} = data
    const { parent_id} = data.parent_id ? data.parent_id : null
    const post_data = await postModel.findOne({_id : post_id})
    

    if (!post_data) {
        return {
            success: 0,
            status: app_constant.BAD_REQUEST,
            message: "Comment doesn't exist",
            result: {}
        }
        return {
            success: 1,
            status: app_constant.SUCCESS,
            message: 'Post added successfully!',
            result: file_url
        }
    }

    return {
        success: 0,
        status: app_constant.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
        result: {}
    }
}