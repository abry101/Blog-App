import { NextResponse } from "next/server";
import { db } from "@/libs/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ParamsType } from "@/types";
import { prisma } from "@/prisma/db";

export async function GET(request: Request, { params }: ParamsType) {
  try {
    const uid = params?.id;
    console.log("GET User Request >> uid :>> ", uid);
    if (uid) {
      const user = await prisma.user.findUnique({ where: { uid } });
      if (user)
        return NextResponse.json({ data: user, ok: true }, { status: 200 });
      else
        return NextResponse.json(
          {
            message:
              "User Not Found: The requested resource could not be found",
            ok: false,
          },
          { status: 404 }
        );
    } else {
      return NextResponse.json(
        {
          message:
            "Bad Request: The request could not be understood by the server due to malformed syntax.",
          ok: false,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: ParamsType) {
  try {
    const body = await request.json();
    const uid = body.uid || params?.id;
    const docRef = doc(db, "users", uid);

    const user = await prisma.user
      .update({
        data: { ...body },
        where: { uid },
      })
      .catch((err) => {
        throw err;
      });
    await updateDoc(docRef, { ...body }).catch((err) => {
      throw err;
    });
    return NextResponse.json({ data: user, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error },
      {
        status: 500,
      }
    );
  }
}
