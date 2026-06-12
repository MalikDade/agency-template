import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY;
const ENTITY_ID = "pg-test-639c3ada-d7d4-422b-8738-44a23d851104";

const SYSTEM_PROMPT = `You are Dan Carter, AI Director of Client Solutions at MPM Systems. You help Malik manage his business - checking emails, scheduling calls, and following up with leads. Be professional and direct.`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.headers["x-admin-password"] !== "MPM2026Admin") return res.status(401).json({ error: "Unauthorized" });

  const { message, debug } = req.body || {};

  if (debug === "accounts") {
    const accRes = await fetch(`https://backend.composio.dev/api/v3/connected_accounts?entity_id=${ENTITY_ID}`, {
      headers: { "x-api-key": COMPOSIO_API_KEY }
    });
    const accData = await accRes.json();
    return res.status(200).json(accData);
  }

  if (!message) return res.status(400).json({ error: "No message" });

  try {
    const toolsRes = await fetch("https://backend.composio.dev/api/v3/tools?toolkit_slug=gmail&limit=10", {
      headers: { "x-api-key": COMPOSIO_API_KEY }
    });
    const toolsData = await toolsRes.json();

    const tools = (toolsData.items || []).map(t => ({
      name: t.slug,
      description: t.description,
      input_schema: t.input_parameters || { type: "object", properties: {} }
    }));

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      tools: tools.length ? tools : undefined,
      messages: [{ role: "user", content: message }],
    });

    if (response.stop_reason === "tool_use") {
      const toolUse = response.content.find(b => b.type === "tool_use");

      const execRes = await fetch(`https://backend.composio.dev/api/v3/tools/execute/${toolUse.name}`, {
        method: "POST",
        headers: { "x-api-key": COMPOSIO_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ arguments: toolUse.input, entity_id: ENTITY_ID })
      });
      const toolResult = await execRes.json();

      const final = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          { role: "user", content: message },
          { role: "assistant", content: response.content },
          { role: "user", content: [{ type: "tool_result", tool_use_id: toolUse.id, content: JSON.stringify(toolResult) }] },
        ],
      });
      return res.status(200).json({ reply: final.content[0].text, tool_called: toolUse.name, tool_input: toolUse.input, tool_result: toolResult });
    }

    return res.status(200).json({ reply: response.content[0].text, tools_found: tools.length });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
