import { NextResponse, NextRequest } from 'next/server';
import Abouts from '@/models/aboutModels';
import {connectToMongoDB} from '@/dbConfig/dbConfig';

connectToMongoDB();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId,about} = reqBody
        console.log(reqBody)
        if(!userId || !about ){
            return NextResponse.json({error: 'Plese Fill All Requires!' },{status: 400})
        }
       const isExistUser = await Abouts.findOne({userId});
        if(isExistUser){ 
            isExistUser.about = about;

            await isExistUser.save();
            return NextResponse.json({message: 'User Abouts Upgrade Succesfully!' },{status: 200})
        }
        const newProfile = new Abouts({userId,about})
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