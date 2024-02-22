import Postes from '@/models/postsModels'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const postes = await Postes.where({ _id: params.id });
  return NextResponse.json({
    postes,
  })
}