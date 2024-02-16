import { NextRequest, NextResponse } from 'next/server';
import Profiles from '@/models/profileModels';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
connectToMongoDB()

export async function GET(request: NextRequest) {
    try {
        // Extract any query parameters if needed
        const userId = request.query.userId as string;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required in the query parameters!' }, { status: 400 });
        }

        // Query the database to find the user by userId
        const user = await Profiles.findOne({ userId });

        if (user) {
            // If the user is found, return the user's profile data
            return NextResponse.json({ profile: user }, { status: 200 });
        } else {
            // If the user is not found, return an appropriate response
            return NextResponse.json({ error: 'User not found!' }, { status: 404 });
        }
    } catch (error: any) {
        // Handle any errors that may occur during the process
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}