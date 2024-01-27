import Posts from "@/models/postModels";
import { connectToMongoDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from 'next/server';

connectToMongoDB()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {userId, describe, postImage} = reqBody
        console.log(reqBody);
        const newPost = new Posts({userId, describe, postImage});
        const savePost = await newPost.save();
        return NextResponse.json({
            message: 'Post Creadited!',
            success: true,
            savePost,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}