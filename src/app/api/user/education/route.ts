import { NextResponse, NextRequest } from 'next/server';
import Educations from '@/models/educationModels';
import {connectToMongoDB} from '@/dbConfig/dbConfig';

connectToMongoDB();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId,school,univercity,degree,fieldstudy,startdate, enddate} = reqBody
        console.log(reqBody)
        if(!userId || !school || !univercity  || !degree || !fieldstudy || !startdate || !enddate){
            return NextResponse.json({error: 'Plese Fill All Requires!' },{status: 400})
        }
        const user = await Educations.findOne({degree});
        if(user){
            return NextResponse.json(
                {
                    error: 'This Projects Alredy Exist'
                },
                {status: 400}
            )
        }
        const newProfile = new Educations({userId,school,univercity,degree,fieldstudy,startdate, enddate})
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