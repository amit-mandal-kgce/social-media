import { NextResponse, NextRequest } from 'next/server';
import Requests from '@/models/networkReqModels';
import { connectToMongoDB } from "@/dbConfig/dbConfig";

connectToMongoDB()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, connectId } = reqBody;

    if (!userId || !connectId ) {
      return NextResponse.json({ error: 'Please Fill All Required Fields!' }, { status: 400 });
    }

    const newRequests = new Requests({ userId, connectId });
    const saveRequests = await newRequests.save();

    return NextResponse.json({
      message: 'Post Created!',
      success: true,
      saveRequests,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}