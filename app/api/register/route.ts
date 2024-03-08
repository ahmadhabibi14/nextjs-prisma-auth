import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, fullName, email, password } = (await req.json()) as {
      username: string;
      fullName: string;
      email: string;
      password: string;
    }
    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        username: username,
        fullName: fullName,
        email: email.toLowerCase(),
        password: hashedPassword
      }
    });

    return NextResponse.json({
      code: 200,
      status: "success",
      message: "User created successfully",
      data: {
        user: {
          username: user.username,
          fullName: user.fullName,
          emal: user.email
        }
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message
      }),
      { status: 500 }
    );
  }
}