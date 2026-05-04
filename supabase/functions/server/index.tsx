import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Create Supabase client helper
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
  );
};

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-83e8331d/health", (c) => {
  const apiKey = Deno.env.get("AI_API_KEY");
  const hasApiKey = !!apiKey;
  const hasSupabaseUrl = !!Deno.env.get("SUPABASE_URL");
  const hasSupabaseKey = !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    config: {
      apiKeyConfigured: hasApiKey,
      apiKeyLength: apiKey ? apiKey.trim().length : 0,
      apiKeyPrefix: apiKey ? apiKey.trim().substring(0, 10) + "..." : "N/A",
      supabaseUrlConfigured: hasSupabaseUrl,
      supabaseKeyConfigured: hasSupabaseKey,
    }
  });
});

// AI Chat endpoint
app.post("/make-server-83e8331d/chat", async (c) => {
  try {
    const body = await c.req.json();
    const { messages, conversationId, stream = true, model = "Qwen/Qwen2.5-7B-Instruct" } = body;

    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: "Messages array is required" }, 400);
    }

    let apiKey = Deno.env.get("AI_API_KEY");
    if (!apiKey) {
      console.log("AI_API_KEY environment variable is not set");
      return c.json({ error: "AI API key not configured" }, 500);
    }

    // 清理API key（去除可能的空格和换行）
    apiKey = apiKey.trim();

    // 调试日志
    console.log(`=== SiliconFlow API Request Debug ===`);
    console.log(`API Key length: ${apiKey.length}`);
    console.log(`API Key prefix: ${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}`);
    console.log(`Model: ${model}`);
    console.log(`Messages count: ${messages.length}`);
    console.log(`Stream: ${stream}`);

    // 调用硅基流动 API (OpenAI兼容格式)
    const requestBody = {
      model: model,
      messages: messages,
      stream: stream,
      temperature: 0.7,
    };

    const apiUrl = "https://api.siliconflow.cn/v1/chat/completions";
    console.log(`API URL: ${apiUrl}`);
    console.log(`Request body: ${JSON.stringify(requestBody, null, 2)}`);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response headers: ${JSON.stringify([...response.headers.entries()])}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`SiliconFlow API error: ${response.status} - ${errorText}`);
      let errorMessage = `硅基流动API错误 (${response.status})`;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }

      return c.json({
        error: errorMessage,
        details: errorText,
        status: response.status
      }, response.status);
    }

    if (stream) {
      // 流式响应
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    } else {
      // 非流式响应
      const data = await response.json();
      return c.json(data);
    }
  } catch (error) {
    console.log(`Chat endpoint error: ${error.message}`);
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// 获取对话历史列表
app.get("/make-server-83e8331d/conversations", async (c) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("kv_store_83e8331d")
      .select("value")
      .like("key", "conversation:%");

    if (error) {
      throw new Error(error.message);
    }

    const conversations = data?.map((d) => d.value) || [];
    return c.json({ conversations });
  } catch (error) {
    console.log(`Get conversations error: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// 获取单个对话详情
app.get("/make-server-83e8331d/conversations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("kv_store_83e8331d")
      .select("value")
      .eq("key", `conversation:${id}`)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return c.json({ error: "Conversation not found" }, 404);
    }

    return c.json({ conversation: data.value });
  } catch (error) {
    console.log(`Get conversation error: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// 保存对话
app.post("/make-server-83e8331d/conversations", async (c) => {
  try {
    const body = await c.req.json();
    const { id, title, messages, timestamp } = body;

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("kv_store_83e8331d")
      .upsert({
        key: `conversation:${id}`,
        value: { id, title, messages, timestamp }
      });

    if (error) {
      throw new Error(error.message);
    }

    return c.json({ success: true });
  } catch (error) {
    console.log(`Save conversation error: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// 删除对话
app.delete("/make-server-83e8331d/conversations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("kv_store_83e8331d")
      .delete()
      .eq("key", `conversation:${id}`);

    if (error) {
      throw new Error(error.message);
    }

    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete conversation error: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);