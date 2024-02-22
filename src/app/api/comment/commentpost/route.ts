import { NextResponse, NextRequest } from 'next/server';
import Comment from '@/models/commentModels';
import { connectToMongoDB } from "@/dbConfig/dbConfig";

connectToMongoDB()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id, userId, comment} = reqBody;

    if (!id || !userId || !comment) {
      return NextResponse.json({ error: 'Please Fill All Required Fields!' }, { status: 400 });
    }

    const newPost = new Comment({ id, userId, comment });
    const savePost = await newPost.save();

    return NextResponse.json({
      message: 'Comment Created!',
      success: true,
      savePost,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
