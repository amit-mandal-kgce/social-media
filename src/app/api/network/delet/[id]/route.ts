import Connects from '@/models/networkConModels';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connectToMongoDB();

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context;
    const connections = await Connects.deleteOne({ id: params._id, _id: { $ne: params._id }});
    
    return NextResponse.json({
      message: 'Connections deleted successfully',
      connections,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
