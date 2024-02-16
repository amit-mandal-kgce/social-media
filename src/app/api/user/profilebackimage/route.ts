import { connectToMongoDB } from "@/dbConfig/dbConfig";
import BackImgs from "@/models/userProfileBackImgModels";
import { NextResponse, NextRequest } from 'next/server';
connectToMongoDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId,backImage} = reqBody
        console.log(reqBody)
        if(!userId || !backImage){
            return NextResponse.json({error: 'Plese Fill All Requires!' },{status: 400})
        }
        const isExistUser = await BackImgs.findOne({userId});
        if(isExistUser){ 
            isExistUser.backImage = backImage;

            await isExistUser.save();
            return NextResponse.json({error: 'User profile Back Image Upgrade' },{status: 400})
        }
        const newProfile = new BackImgs({userId,backImage})
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