import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Dashboard data context for the AI
const dashboardContext = `You are an AI assistant for the Housing & Urban Development Department (HUDD), Government of Odisha's 52nd Dashboard Meeting (29th December 2025). You help the Principal Secretary analyze and understand dashboard data.

KEY FINANCIAL SUMMARY:
- Total Budget (Schemes + Transfer + Admin): ₹9,882.56 Cr
- Total Expenditure: ₹4,796.84 Cr (48.54%)
- State Sector Schemes: Budget ₹4,365 Cr, Expenditure 52.96%
- Centrally Sponsored Schemes: Budget ₹2,164 Cr, Expenditure 34.78%
- State Finance Commission Transfer: ₹1,489.78 Cr (83.08% utilized)
- Union Finance Commission: ₹1,069.66 Cr (only 5.65% utilized - needs attention)

KEY SCHEMES & PERFORMANCE:

1. WATER SUPPLY (SUJALA):
- Household coverage: 98.29% (10,97,677 out of 11,16,750 HH)
- Water meters installed: 81.64%
- Quality compliance: 97.46%
- Source: WATCO/PHEO Manual Entry

2. PMAY-U (Housing):
- Houses sanctioned: 15% (20,492 out of 1,36,927 applications)
- Houses completed: 1.47% (65 out of 4,423 grounded)
- Fund utilization: Only 0.40% (₹4.899 Cr of ₹99.97 Cr)
- Source: PMAY-Urban Portal (National)

3. SWACHHA BHARAT MISSION (Sanitation):
- ODF++ certified cities: 6 out of 115 (5.21%)
- Functional SWM facilities: 85.83% (97 of 113)
- Budget utilization: Only 10.08%
- Source: SBM Portal (National)

4. AMRUT 2.0:
- Tap connections: 88.39% coverage
- Sewerage connections: 15.16%
- Budget utilization: 65.38% (best among CSS)
- Source: Manual Entry

5. URBAN MOBILITY (CRUT/Metro):
- City Bus Operations: 400 buses
- Daily ridership: 1.42 lakh passengers
- Mo Bus app users: 21 lakh+
- Source: CRUT Manual Entry

6. MSBY (Infrastructure):
- Storm Water Drainage: 83.02% utilized
- Animal Welfare: 87.28% utilized
- Infrastructure Development: 52.65% utilized

BCPPER (Bhubaneswar-Cuttack-Puri-Paradip Economic Region):
- Vision Plan: Being finalized
- Ring Road: 9% completed, 32.30% funds utilized

ACTION ITEMS FROM MEETINGS:
- Multiple pending grievance resolutions on Janasunani
- ULB property tax collection improvements needed
- PMAY fund utilization needs immediate attention

Data Sources: IFMS (Finance), SBM Portal, PMAY-Urban Portal, SAHAJOG App, Janasunani Portal, SUJOG Platform

Always provide specific numbers and percentages when available. Highlight areas needing attention (low utilization, pending targets). Be concise but thorough.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing AI chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: dashboardContext },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "Unable to process request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
