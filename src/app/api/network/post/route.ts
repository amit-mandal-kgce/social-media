import { NextResponse, NextRequest } from 'next/server';
import Connects from '@/models/networkConModels';
import { connectToMongoDB } from "@/dbConfig/dbConfig";

connectToMongoDB()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, connectId } = reqBody;

    if (!userId || !connectId ) {
      return NextResponse.json({ error: 'Please Fill All Required Fields!' }, { status: 400 });
    }
    // const existingConnection = await Connects.findOne({connectId});
    // if (existingConnection) {
    //   return NextResponse.json({ error: 'Connection with the same connectId already exists!' }, { status: 400 });
    // }

    const newConnections = new Connects({ userId, connectId });
    const saveConnections = await newConnections.save();

    return NextResponse.json({
      message: 'Post Created!',
      success: true,
      saveConnections,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}