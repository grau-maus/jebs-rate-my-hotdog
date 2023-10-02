import axios from "axios";
import { NextResponse } from "next/server";
import { fileSizeToKBMB } from "@/app/utils";

export async function GET(req) {
  return new Response("Hello Hotdog");
}

export async function POST(req) {
  try {
    const imgData = await req.formData();
    const asticaAPIKey = imgData.get("APIKey");
    const imgFile = imgData.get("file");
    const imgSize = fileSizeToKBMB(imgFile.size);
    const imgType = imgFile.type.split("/")[1];
    if (
      !imgFile ||
      (imgSize.includes("MB") && Number(imgSize.split(" ")[0]) > 2) ||
      !["png", "jpeg"].includes(imgType)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "File not supported",
        },
        { status: 400 }
      );
    }
    if (!asticaAPIKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing API key",
        },
        { status: 400 }
      );
    }
    const imgBytes = await imgFile.arrayBuffer();
    const imgBuffer = Buffer.from(imgBytes);

    //-----------------------------------------------
    const astica_input = `data:image/${imgType};base64,${imgBuffer.toString(
      "base64"
    )}`;

    const requestData = {
      tkn: asticaAPIKey, // visit https://astica.ai
      modelVersion: "2.1_full", // 1.0_full, 2.0_full, or 2.1_full
      input: astica_input,
      visionParams: "gpt, describe, describe_all", // comma separated, defaults to all
      gpt_prompt:
        'Pretend you\'re a hot dog expert and rate the image from 1 to 10 with a detailed description. Simply say "Not a hotdog" if the image is not a hot dog', // only used if visionParams includes "gpt" or "gpt_detailed"
    };

    const rating = await axios({
      method: "post",
      url: "https://vision.astica.ai/describe",
      data: requestData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    //-----------------------------------------------

    // ----------------dev test----------------------
    // const rating = {
    //   success: true,
    //   data: {
    //     modelVersion: "2023-02-01-preview",
    //     astica: {
    //       request: "vision",
    //       requestType: "analyze",
    //       modelVersion: "2.1",
    //       api_qty: 18.5167,
    //     },
    //     status: "success",
    //     caption_GPTS:
    //       "Not a hotdog. The image is a black and white pixelated pattern, with a black and white rectangle and a black and white cross. It is visually interesting and intricate, but it is not a hotdog. I would rate it an 8 out of 10 for creativity and complexity, but 0 out of 10 for being a hotdog.",
    //     GPT_level: 0,
    //     caption: {
    //       text: "a black and white pixelated pattern",
    //       confidence: 0.7737299799919128,
    //     },
    //     caption_list: [
    //       {
    //         text: "a black and white pixelated pattern",
    //         confidence: 0.7737299799919128,
    //         rectangle: {
    //           x: 0,
    //           y: 0,
    //           w: 1000,
    //           h: 1000,
    //         },
    //       },
    //       {
    //         text: "a black and white pixelated pattern",
    //         confidence: 0.768151581287384,
    //         rectangle: {
    //           x: 0,
    //           y: 0,
    //           w: 976,
    //           h: 983,
    //         },
    //       },
    //       {
    //         text: "a black and white rectangle",
    //         confidence: 0.7304050326347351,
    //         rectangle: {
    //           x: 494,
    //           y: 243,
    //           w: 73,
    //           h: 55,
    //         },
    //       },
    //       {
    //         text: "a black and white cross",
    //         confidence: 0.7846758961677551,
    //         rectangle: {
    //           x: 0,
    //           y: 4,
    //           w: 1000,
    //           h: 85,
    //         },
    //       },
    //     ],
    //     metadata: {
    //       width: 1000,
    //       height: 1000,
    //     },
    //   },
    // };
    // await (async () => {
    //   await new Promise((res) => setTimeout(res, 2500));
    // })();
    // ----------------dev test----------------------

    return NextResponse.json({ success: true, data: rating.data });
  } catch (err) {
    console.log("----------------");
    console.log(err);
    console.log("----------------");
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
