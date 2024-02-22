import Projects from "@/models/projectsModels";
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function GET(request: Request, context: any){
  const { params} = context;
  const projects = await Projects.where({ userId: params.userId });
  return NextResponse.json({
    projects,
  })
}