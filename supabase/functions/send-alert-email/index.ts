import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AlertEmailRequest {
  recipientEmail: string;
  alerts: {
    severity: string;
    title: string;
    description: string;
    scheme: string;
    metric: string;
    currentValue: string;
    threshold: string;
  }[];
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "#dc2626";
    case "warning":
      return "#f59e0b";
    default:
      return "#3b82f6";
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipientEmail, alerts }: AlertEmailRequest = await req.json();
    
    console.log(`Sending alert email to ${recipientEmail} with ${alerts.length} alerts`);

    const alertsHtml = alerts
      .map(
        (alert) => `
        <div style="border-left: 4px solid ${getSeverityColor(alert.severity)}; padding: 16px; margin-bottom: 16px; background-color: #f9fafb; border-radius: 4px;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="background-color: ${getSeverityColor(alert.severity)}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              ${alert.severity}
            </span>
          </div>
          <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 16px;">${alert.title}</h3>
          <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">${alert.description}</p>
          <table style="font-size: 13px; color: #374151;">
            <tr>
              <td style="padding-right: 16px;"><strong>Scheme:</strong> ${alert.scheme}</td>
              <td style="padding-right: 16px;"><strong>Metric:</strong> ${alert.metric}</td>
            </tr>
            <tr>
              <td style="padding-right: 16px;"><strong>Current Value:</strong> <span style="color: ${getSeverityColor(alert.severity)};">${alert.currentValue}</span></td>
              <td><strong>Threshold:</strong> ${alert.threshold}</td>
            </tr>
          </table>
        </div>
      `
      )
      .join("");

    const criticalCount = alerts.filter((a) => a.severity === "critical").length;
    const warningCount = alerts.filter((a) => a.severity === "warning").length;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "H&UD Dashboard <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `🚨 Alert: ${criticalCount} Critical, ${warningCount} Warning KPIs Triggered`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 24px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">H&UD Dashboard Alert</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0;">Critical KPI Notifications</p>
            </div>
            
            <div style="background-color: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
              <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                <div style="background-color: #fee2e2; padding: 12px 16px; border-radius: 8px; text-align: center; flex: 1;">
                  <div style="font-size: 28px; font-weight: bold; color: #dc2626;">${criticalCount}</div>
                  <div style="font-size: 12px; color: #991b1b;">Critical</div>
                </div>
                <div style="background-color: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center; flex: 1;">
                  <div style="font-size: 28px; font-weight: bold; color: #f59e0b;">${warningCount}</div>
                  <div style="font-size: 12px; color: #92400e;">Warnings</div>
                </div>
              </div>

              <h2 style="font-size: 18px; color: #111827; margin: 0 0 16px 0;">Active Alerts</h2>
              
              ${alertsHtml}
              
              <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  This is an automated alert from the H&UD Dashboard. Please review the flagged KPIs and take appropriate action.
                </p>
              </div>
            </div>
            
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Housing & Urban Development Department, Government of Odisha
              </p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    
    if (!emailResponse.ok) {
      throw new Error(emailData.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-alert-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
