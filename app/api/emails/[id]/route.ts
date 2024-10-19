import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { EmailType } from "@/app/types/custTypes";
import Email from "@/app/components/Inbox/Email";

let filePath = path.join(process.cwd(), "app/data/Emails.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let data = fs.readFileSync(filePath, "utf8");
    let jsonParsedData = JSON.parse(data);
    let updatedJsonParsedData = jsonParsedData.find(
      (email: EmailType) => email.id.toString() === params.id
    );
    return NextResponse.json({ email: updatedJsonParsedData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Fetch Emails" },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedData = await request.json();
    let data = fs.readFileSync(filePath, "utf8");
    let jsonParsedData = JSON.parse(data);
    let updatedJSONParesedData = jsonParsedData.map((email: EmailType) => {
      if (email.id?.toString() === params.id) {
        return { ...email, updatedData };
      } else return email;
    });
    fs.writeFileSync(
      filePath,
      JSON.stringify(updatedJSONParesedData, null, 2),
      "utf8"
    );

    return NextResponse.json(
      { message: "Emails updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update Emails" },
      { status: 500 }
    );
  }
}
