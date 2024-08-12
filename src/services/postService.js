const app_constant = require("../constants/app.json");
require('dotenv').config()
const cloudinary = require('../helpers/cloudinary')
const post = require('../models/postModel')
const fs = require('fs')

exports.postUpload = async (data, user_data) => {
    console.log(data)
    const {_id} = user_data
    const {file} = data
    console.log(_id)
    const file_url = await cloudinary.uploader.upload(file.path)
    console.log(file_url)

    const upload_post = await post.create({
        file_url : file_url.secure_url,
        caption : data.caption,
        user_id : _id
    })

    if (upload_post) {
        // const filePath = file.path;
        // console.log(filePath)

        // fs.unlink(file.path, (err) => {
        //     if (err) {
        //         console.error("Error deleting the file: ", err)
        //     }else {
        //         console.log("file deleted successfully")
        //     }
        // })

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

exports.getPostList = async (data, user_data) => {
    
    const { _id } = user_data;
    const limit = data.limit ? data.limit : 10000;
    const offset = data.offset ? data.offset : 0;
    const search = data.search ? data.search : '';
    let search_query = {}

    if (search) {
        const regex = new RegExp(search, 'i')
        search_query = {
            $or: [
                { "followers_details.username": regex },
                { "followers_details.email": regex }
            ]
        }
    }

    const pipeline = [
        { $match: { _id: _id } },
        {
            $lookup: {
                from: 'users',
                localField: "followers",
                foreignField: "_id",
                as: "followers_details"
            }
        },
        { $unwind: "$followers_details" },
        { $match: search_query }
    ]

    const [result, total_count] = await Promise.all([
        User.aggregate([
            ...pipeline,
            {
                $project: {
                    _id: 0,
                    email: "$followers_details.email",
                    username: "$followers_details.username"
                }
            },
            { $skip: +offset },
            { $limit: Number(limit) },
        ]),
        User.aggregate([
            ...pipeline,
            { $count: "total_count" }
        ])
    ])
    console.log(total_count);

    if (result) {
        return {
            success: 1,
            status: app_constant.SUCCESS,
            message: 'Followers list fetched successfully!',
            total_count: total_count.length ? total_count[0].total_count : 0,
            result
        };
    }

    return {
        success: 0,
        status: app_constant.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
        result: {}
    }
}