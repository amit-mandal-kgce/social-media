import Requests from '@/models/networkReqModels';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context;
    const acceptsrequest = await Requests.deleteOne({ id: params._id });
    
    return NextResponse.json({
      message: 'Request Accept successfully',
      acceptsrequest,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}