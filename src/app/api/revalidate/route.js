import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const body = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
      return Response.json({ message: "Invalid secret" }, { status: 401 });
    }

    const documentType = body?._type;

    // Revalidate paths based on what type changed
    if (documentType === "post" || documentType === "guidePage") {
      revalidatePath("/");
      revalidatePath("/blog");
      if (body?.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`);
      }
    }
    if (documentType === "category") {
      revalidatePath("/blog");
      revalidatePath("/");
    }
    if (documentType === "settings") {
      revalidatePath("/");
    }

    return Response.json({ revalidated: true });
  } catch {
    return Response.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
