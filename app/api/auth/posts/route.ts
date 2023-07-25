import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
// import { db } from "@/libs/firebase/firebase";
// import { doc, updateDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await prisma.post.create(body);
    if (post)
      return NextResponse.json({ data: post, ok: true }, { status: 200 });
    else
      return NextResponse.json(
        {
          message: "Adding Post Failed",
          ok: false,
        },
        { status: 500 }
      );
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

// export async function PUT(request: Request) {
//   try {
//     const body = await request.json();

//     console.log("USER UPDATE REQUEST >> body :>> ", body);
//     const docRef = doc(db, "users", body.uid);

//     await updateDoc(docRef, { ...body });

//     await prisma.user.update({
//       data: { ...body },
//       where: { uid: body.uid },
//     });

//     console.log("<<<<<: USER UPDATE REQUEST END :>>>>>");
//     return NextResponse.json(
//       { message: "user updated successfully!", ok: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("USER UPDATE Error :>> ", error);
//     return NextResponse.json(error, {
//       status: 500,
//     });
//   }
// }
