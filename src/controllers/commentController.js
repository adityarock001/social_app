const app_constant = require('../constants/app.json')
const commentService = require('../services/commentService')
const validationHelper = require('../helpers/validation')

exports.commentPost = async (request, response) => {
    try{
        const required_fields = ["post_id", "comment"];
        const validation = validationHelper.validation(
            required_fields,
            request.body
        )
        if(!request.file){
            response.json({
                success: 0,
                status_code: app_constant.INTERNAL_SERVER_ERROR,
                message: "Please upload the file",
                result: {},
            });
        }
        request.body.file = request.file
        const upload_post = await postService.addComment(request.body, request.user);
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