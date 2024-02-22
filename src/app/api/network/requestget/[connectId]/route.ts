import Requests from '@/models/networkReqModels';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const requests = await Requests.where({ connectId: params.connectId });
  return NextResponse.json({
    requests,
  })
}