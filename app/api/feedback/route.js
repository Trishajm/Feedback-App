let feedbacks = [];

export async function POST(req) {
  const body = await req.json();
  const { name, message } = body;

  // ✅ Validation
  if (!name || !message) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }

  if (message.length < 10 || message.length > 200) {
    return Response.json(
      { error: "Message must be 10-200 characters" },
      { status: 400 }
    );
  }

  // ✅ Prevent duplicates
  const exists = feedbacks.find(
  (f) =>
    f.name.toLowerCase().trim() === name.toLowerCase().trim() &&
    f.message.toLowerCase().trim() === message.toLowerCase().trim()
);

  if (exists) {
    return Response.json(
      { error: "Duplicate feedback not allowed" },
      { status: 400 }
    );
  }

  const newFeedback = {
    id: Date.now(),
    name,
    message,
    createdAt: new Date(),
  };

  feedbacks.push(newFeedback);

  return Response.json({ success: true });
}

// ✅ GET API (latest first)
export async function GET() {
  const sorted = [...feedbacks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return Response.json(sorted);
}