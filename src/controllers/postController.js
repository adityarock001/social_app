const app_constant = require('../constants/app.json')
const postService = require('../services/postService')
const validationHelper = require('../helpers/validation')

exports.uploadPost = async (request, response) => {
    try {
        // console.log(request.file);

        if(!request.file){
            response.json({
                success: 0,
                status_code: app_constant.INTERNAL_SERVER_ERROR,
                message: "Please upload the file",
                result: {},
            });
        }
        request.body.file = request.file
        const upload_post = await postService.uploadPost(request.body, request.user);
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