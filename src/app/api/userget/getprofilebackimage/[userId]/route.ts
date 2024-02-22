import BackImgs from "@/models/userProfileBackImgModels";
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const backimgs = await BackImgs.where({ userId: params.userId });
  return NextResponse.json({
    backimgs,
  })
}