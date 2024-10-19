import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { EmailType } from "@/app/types/custTypes";

let filePath = path.join(process.cwd(), "app/data/Emails.json");

export async function GET(request: Request) {
  try {
    let data = fs.readFileSync(filePath, "utf8");
    let jsonParsedData = JSON.parse(data);
    let updatedJsonParsedData = jsonParsedData.map((email: EmailType) => ({
      id: email.id,
      sender: {
        email: email.sender.email,
        fullname: email.sender.fullname,
      },
      subject: email.subject,
      description: email.description,
      date: email.date,
      isRead: email.isRead,
      isFavorite: email.isFavorite,
    }));
    return NextResponse.json({ emails: updatedJsonParsedData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Fetch Emails" },
      { status: 500 }
    );
  }
}

