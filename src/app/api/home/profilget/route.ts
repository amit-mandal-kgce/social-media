import ProfileImgs from '@/models/userProfilImageModels'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const profileimages = await ProfileImgs.find();
  return NextResponse.json({
    profileimages
  })
}