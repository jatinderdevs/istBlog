const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, email } = body;

    if (!firstName || !email) {
      return Response.json(
        { success: false, error: "First name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const payload = {
      email,
      fields: { name: firstName },
    };

    const groupId = process.env.MAILERLITE_GROUP_ID;
    if (groupId) {
      payload.groups = [groupId];
    }

    const res = await fetch(MAILERLITE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 409) {
      return Response.json({
        success: true,
        message: "You're already subscribed!",
      });
    }

    if (!res.ok) {
      return Response.json(
        { success: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
