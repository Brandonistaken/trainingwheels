import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, existingSteps } = await req.json();
    if (!content || typeof content !== "string" || content.trim().length < 20) {
      return NextResponse.json({ error: "Content too short." }, { status: 400 });
    }
    const prompt = `Extract step-by-step instructions as JSON array. Each step: title, description, targetArea. Max 8 steps. Content: ${content.slice(0, 4000)}`;
    const response = await fetch(`${process.env.CODEWORDS_RUNTIME_URI}/run/openai/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.CODEWORDS_API_KEY}` },
      body: JSON.stringify({ model: "gpt-4.1-mini", messages: [{ role: "system", content: "Output ONLY valid JSON array." }, { role: "user", content: prompt }], temperature: 0.3, max_tokens: 2000 }),
    });
    if (!response.ok) return NextResponse.json({ error: "AI parsing failed." }, { status: 500 });
    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";
    let steps = [];
    try {
      const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      steps = JSON.parse(cleaned);
    } catch {
      const match = raw.match(/\[[\s\S]*\]/);
      if (match) { try { steps = JSON.parse(match[0]); } catch {} }
    }
    return NextResponse.json({ steps, raw: `Extracted ${steps.length} steps!` });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
