const app_constant = require('../constants/app.json')
const postService = require('../services/postService')
const validationHelper = require('../helpers/validation')
const fs = require("fs")

exports.uploadPost = async (request, response) => {
    try {
        if(!request.file){
            return response.json({
                success: 0,
                status_code: app_constant.INTERNAL_SERVER_ERROR,
                message: "Please upload the file",
                result: {},
            });
        }
        request.body.file = request.file
        const upload_post = await postService.postUpload(request.body, request.user);
        fs.unlink(request.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
            }
            // console.log('File deleted successfully!');
        })
        return response.json(upload_post);

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

exports.getPostList = async (request, response) => {
    try {
        const get_posts = await postService.getPostList(request.query)
        return response.json(get_posts)

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

exports.updatePost = async (request, response) => {
    try {
        // console.log(request.file);
        const required_fields = ["post_id"];
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

        if(!request.file){
            response.json({
                success: 0,
                status_code: app_constant.INTERNAL_SERVER_ERROR,
                message: "Please upload the file",
                result: {},
            });
        }
        request.body.file = request.file
        const update_post = await postService.updatePost(request.body, request.user);
        fs.unlink(request.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
            }
            // console.log('File deleted successfully!');
        })

        return response.json(update_post);


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