import { NextResponse, NextRequest } from 'next/server';
import Profiles from '@/models/profileModels';
import {connectToMongoDB} from '@/dbConfig/dbConfig';

connectToMongoDB();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {userId,heading,industry,education,region,city,phone,address} = reqBody
        console.log(reqBody)
        if(!userId || !heading || !industry || !education || !region || !city || !phone || !address){
            return NextResponse.json({error: 'Plese Fill All Requires!' },{status: 400})
        }
        const isExistUser = await Profiles.findOne({userId});
        if(isExistUser){ 
            isExistUser.heading = heading;
            isExistUser.industry = industry;
            isExistUser.education = education;
            isExistUser.region = region;
            isExistUser.city = city;
            isExistUser.phone = phone;
            isExistUser.address = address;

            await isExistUser.save();
            return NextResponse.json({error: 'User profile Upgrade' },{status: 400})
        }
        const newProfile = new Profiles({userId,heading,industry,education,region,city,phone,address})
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