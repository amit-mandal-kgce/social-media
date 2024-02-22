import Langauges from "@/models/langaugeModels";
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const langauges = await Langauges.where({ userId: params.userId });
  return NextResponse.json({
    langauges,
  })
}