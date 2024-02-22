import User from '@/models/userModels';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const users = await User.find();
  return NextResponse.json({
    users
  })
}