import { NextResponse, NextRequest } from 'next/server';
import Connections from '@/models/connectionModels';
import { connectToMongoDB } from "@/dbConfig/dbConfig";

connectToMongoDB()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId} = reqBody;

    if (!userId) {
      return NextResponse.json({ error: 'Please Fill All Required Fields!' }, { status: 400 });
    }

    const newPost = new Connections({ userId});
    const savePost = await newPost.save();

    return NextResponse.json({
      message: 'Post Created!',
      success: true,
      savePost,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}