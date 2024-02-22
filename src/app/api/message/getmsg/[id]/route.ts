import TextMessages from '@/models/msgConvModels';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const userMessages = await TextMessages.where({ userId: params.id });
  return NextResponse.json({
    userMessages,
  })
}