import Comments from '@/models/commentModels'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const comments = await Comments.find();
  return NextResponse.json({
    comments,
  })
}