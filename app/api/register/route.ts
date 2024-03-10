import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { username, fullName, email, password } = (await req.json()) as {
      username: string;
      fullName: string;
      email: string;
      password: string;
    };
    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        username: username,
        fullName: fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      code: 200,
      status: "success",
      message: "user created successfully",
      data: {
        user: {
          username: user.username,
          fullName: user.fullName,
          emal: user.email,
        },
      },
    });
  } catch (error: any) {
    let statusCode: number = 400;
    let errorMessage: string = error.message;
    let statusMessage: string = "Bad Request";

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        errorMessage = "username or email already exist";
        statusCode = 409;
        statusMessage = "Conflict";
      } else {
        errorMessage = error.message;
        statusCode = 500;
        statusMessage = "Internal Server Error";
      }
    }

    return new NextResponse(
      JSON.stringify({
        code: statusCode,
        status: statusMessage,
        error: errorMessage,
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
