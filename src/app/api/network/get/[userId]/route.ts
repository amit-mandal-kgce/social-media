import Connects from '@/models/networkConModels'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const connections = await Connects.where({ userId: params.userId });
  return NextResponse.json({
    connections,
  })
}