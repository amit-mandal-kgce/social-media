import Educations from "@/models/educationModels";
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const educations = await Educations.where({ userId: params.userId });
  return NextResponse.json({
    educations,
  })
}