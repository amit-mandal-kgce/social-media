import ProfileImgs from "@/models/userProfilImageModels";
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const profileimgs = await ProfileImgs.where({ userId: params.userId });
  return NextResponse.json({
    profileimgs,
  })
}