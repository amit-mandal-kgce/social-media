import { NextResponse, NextRequest } from 'next/server';
import Langauges from '@/models/langaugeModels';
import {connectToMongoDB} from '@/dbConfig/dbConfig';

connectToMongoDB();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId,langauge} = reqBody
        console.log(reqBody)
        if(!userId || !langauge){
            return NextResponse.json({error: 'Plese Fill All Requires!' },{status: 400})
        }
        const isExistUser = await Langauges.findOne({userId});
        if(isExistUser){ 
            isExistUser.langauge = langauge;

            await isExistUser.save();
            return NextResponse.json({message: 'User Langauge Upgrade Succesfully!' },{status: 200})
        }
        const newProfile = new Langauges({userId,langauge})
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