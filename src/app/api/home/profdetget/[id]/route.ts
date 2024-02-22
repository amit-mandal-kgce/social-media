import Profiles from "@/models/profileModels";
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const profiles = await Profiles.where({ userId: params.id });
  return NextResponse.json({
    profiles,
  })
}