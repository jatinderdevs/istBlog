const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

// Custom field keys created in MailerLite (Subscribers → Fields).
const SOURCE_FIELD = "signup_source";
const PAGE_FIELD = "signup_page";

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const firstName = clean(body.firstName, 100);
    const email = clean(body.email, 254);
    const source = clean(body.source, 60);
    const page = clean(body.page, 200);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      console.error("[subscribe] MAILERLITE_API_KEY is not set");
      return Response.json(
        { success: false, error: "Server configuration error." },
        { status: 500 },
      );
    }

    const fields = {};
    if (firstName) fields.name = firstName;
    if (source) fields[SOURCE_FIELD] = source;
    if (page) fields[PAGE_FIELD] = page;

    const payload = { email, fields };

    const groupId = process.env.MAILERLITE_GROUP_ID?.trim();
    if (groupId) {
      payload.groups = [groupId];
    }

    const res = await fetch(MAILERLITE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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
      // Log MailerLite's reason (e.g. a wrong group ID or API key) so it shows
      // in the hosting logs instead of failing silently.
      const detail = await res.text().catch(() => "");
      console.error(
        `[subscribe] MailerLite ${res.status}: ${detail.slice(0, 500)}`,
      );
      return Response.json(
        { success: false, error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[subscribe] Unexpected error:", error);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
