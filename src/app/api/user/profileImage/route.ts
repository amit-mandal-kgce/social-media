import ProfileImgs from "@/models/userProfilImageModels";
import { connectToMongoDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from 'next/server';
connectToMongoDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId,profilImg} = reqBody
        console.log(reqBody)
        if(!userId || !profilImg){
            return NextResponse.json({error: 'Plese Fill All Requires!' },{status: 400})
        }
        const isExistUser = await ProfileImgs.findOne({userId});
        if(isExistUser){ 
            isExistUser.postImage = profilImg;

            await isExistUser.save();
            return NextResponse.json({error: 'User profile Upgrade' },{status: 400})
        }
        const newProfile = new ProfileImgs({userId,profilImg})
        const saveProfile = await newProfile.save();

        return NextResponse.json({
            message: 'User Creadited!',
            success: true,
            saveProfile,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}