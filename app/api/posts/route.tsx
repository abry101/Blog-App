import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany();
    if (posts)
      return NextResponse.json({ data: posts, ok: true }, { status: 200 });
    else
      return NextResponse.json(
        {
          message: "Post Not Found: The requested resource could not be found",
          ok: false,
        },
        { status: 500 }
      );
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
