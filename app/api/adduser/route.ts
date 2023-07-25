import { NextResponse } from "next/server";
import { db } from "@/libs/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { prisma } from "@/prisma/db";

export async function POST(request: Request) {
  try {
    const { name, email, password, emailVerified, photoURL, uid } =
      await request.json();

    console.log("USER POST REQUEST >> body :>> ", { uid });

    const user = await prisma.user
      .create({
        data: { uid, name, email, password, emailVerified, photoURL },
      })
      .catch((err) => {
        throw err;
      });

    await setDoc(doc(db, "users", uid), user).catch((err) => {
      prisma.user.delete({ where: { uid } });
      throw err;
    });

    console.log("USER POST REQUEST SUCCESSFULL !!!");

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
