import User from '@/models/userModels'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const userConnections = await User.where({ _id: params.id });
  return NextResponse.json({
    userConnections,
  })
}