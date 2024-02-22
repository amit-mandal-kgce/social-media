import Abouts from "@/models/aboutModels";
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const abouts = await Abouts.where({ userId: params.userId });
  return NextResponse.json({
    abouts,
  })
}