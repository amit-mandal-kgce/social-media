import { NextResponse, NextRequest } from 'next/server';
import Projects from '@/models/projectsModels';
import {connectToMongoDB} from '@/dbConfig/dbConfig';

connectToMongoDB();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId,projeName,monthyear,linkes,techonogy} = reqBody
        console.log(reqBody)
        if(!userId || !projeName || !monthyear  || !linkes || !techonogy){
            return NextResponse.json({error: 'Plese Fill All Requires!' },{status: 400})
        }
        const user = await Projects.findOne({linkes});
        if(user){
            return NextResponse.json(
                {
                    error: 'This Projects Alredy Exist'
                },
                {status: 400}
            )
        }
        const newProfile = new Projects({userId,projeName,monthyear,linkes,techonogy})
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