import Connects from '@/models/networkConModels'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const connectionsother = await Connects.where({ connectId: params.connectId });
  return NextResponse.json({
    connectionsother,
  })
}