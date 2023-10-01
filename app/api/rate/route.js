import { NextResponse } from "next/server";

export async function GET(req) {
  return new Response("Hello Hotdog");
}

export async function POST(req) {
  try {
    const imgData = await req.formData();
    const imgFile = imgData.get("file");
    if (!imgFile) {
      return NextResponse.json({
        success: false,
        error: "Image file not supported",
      });
    }
    const imgBytes = await imgFile.arrayBuffer();
    const imgBuffer = Buffer.from(imgBytes);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("----------------");
    console.log(err);
    console.log("----------------");
    return NextResponse.json({ success: false, error: err.message });
  }
}
