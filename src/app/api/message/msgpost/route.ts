import { NextResponse, NextRequest } from 'next/server';
import TextMessages from '@/models/msgConvModels';
import { connectToMongoDB } from "@/dbConfig/dbConfig";

connectToMongoDB()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, connectId, textmsg } = reqBody;

    if (!userId || !connectId || !textmsg ) {
      return NextResponse.json({ error: 'Please Fill All Required Fields!' }, { status: 400 });
    }

    const newMessages = new TextMessages({ userId, connectId, textmsg });
    const saveMessages = await newMessages.save();

    return NextResponse.json({
      message: 'Post Created!',
      success: true,
      saveMessages,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}