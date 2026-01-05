import { AlertTriangle, AlertCircle, TrendingDown, Clock, CheckCircle2, Mail, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  scheme: string;
  metric: string;
  currentValue: string;
  threshold: string;
  timestamp: string;
  acknowledged: boolean;
}

const alertsData: Alert[] = [
  {
    id: "1",
    severity: "critical",
    title: "PMAY-U Fund Utilization Critical",
    description: "Fund utilization is significantly below expected levels for Q3",
    scheme: "PMAY-U",
    metric: "Fund Utilization",
    currentValue: "0.40%",
    threshold: "< 25%",
    timestamp: "2 hours ago",
    acknowledged: false,
  },
  {
    id: "2",
    severity: "critical",
    title: "Union Finance Commission Transfer Lagging",
    description: "Only 5.65% of allocated funds transferred - requires immediate attention",
    scheme: "Finance Commission",
    metric: "Transfer Rate",
    currentValue: "5.65%",
    threshold: "< 20%",
    timestamp: "1 day ago",
    acknowledged: false,
  },
  {
    id: "3",
    severity: "warning",
    title: "SBM Budget Utilization Below Target",
    description: "Swachha Bharat Mission spending needs acceleration",
    scheme: "SBM",
    metric: "Budget Utilization",
    currentValue: "10.08%",
    threshold: "< 30%",
    timestamp: "3 hours ago",
    acknowledged: false,
  },
  {
    id: "4",
    severity: "warning",
    title: "ODF++ Certification Progress Slow",
    description: "Only 6 of 115 cities certified - target may be missed",
    scheme: "Swachha Bharat Mission",
    metric: "ODF++ Cities",
    currentValue: "5.21%",
    threshold: "< 15%",
    timestamp: "1 day ago",
    acknowledged: true,
  },
  {
    id: "5",
    severity: "info",
    title: "SUJOG Grievance Resolution Rate",
    description: "Grievance resolution rate needs improvement",
    scheme: "SUJOG",
    metric: "Resolution Rate",
    currentValue: "14%",
    threshold: "< 50%",
    timestamp: "5 hours ago",
    acknowledged: true,
  },
  {
    id: "6",
    severity: "warning",
    title: "PMAY House Completion Rate Low",
    description: "Only 1.47% houses completed out of grounded units",
    scheme: "PMAY-U",
    metric: "Completion Rate",
    currentValue: "1.47%",
    threshold: "< 10%",
    timestamp: "12 hours ago",
    acknowledged: false,
  },
];

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    badgeVariant: "destructive" as const,
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    badgeVariant: "secondary" as const,
  },
  info: {
    icon: TrendingDown,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    badgeVariant: "outline" as const,
  },
};

export const SmartAlerts = () => {
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendEmailNotification = async () => {
    if (!recipientEmail) {
      toast.error("Please enter an email address");
      return;
    }

    const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);
    if (unacknowledgedAlerts.length === 0) {
      toast.info("No active alerts to send");
      return;
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-alert-email", {
        body: {
          recipientEmail,
          alerts: unacknowledgedAlerts.map((a) => ({
            severity: a.severity,
            title: a.title,
            description: a.description,
            scheme: a.scheme,
            metric: a.metric,
            currentValue: a.currentValue,
            threshold: a.threshold,
          })),
        },
      });

      if (error) throw error;

      toast.success(`Alert email sent to ${recipientEmail}`);
    } catch (error: any) {
      console.error("Email send error:", error);
      toast.error(error.message || "Failed to send email notification");
    } finally {
      setIsSending(false);
    }
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter(
    (alert) => filter === "all" || alert.severity === filter
  );

  const criticalCount = alerts.filter((a) => a.severity === "critical" && !a.acknowledged).length;
  const warningCount = alerts.filter((a) => a.severity === "warning" && !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-3xl font-bold text-amber-500">{warningCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Active</p>
                <p className="text-3xl font-bold text-primary">
                  {alerts.filter((a) => !a.acknowledged).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Notification */}
      <Card className="border-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Email Notifications</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Send an email summary of all active alerts to stakeholders.
          </p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="Enter recipient email..."
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={sendEmailNotification}
              disabled={isSending || !recipientEmail}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {isSending ? "Sending..." : "Send Alert"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "critical", "warning", "info"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <Card
              key={alert.id}
              className={`${config.borderColor} ${config.bgColor} ${
                alert.acknowledged ? "opacity-60" : ""
              }`}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${config.bgColor}`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground">{alert.title}</h3>
                      <Badge variant={config.badgeVariant}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      {alert.acknowledged && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Acknowledged
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>
                        <strong>Scheme:</strong> {alert.scheme}
                      </span>
                      <span>
                        <strong>Metric:</strong> {alert.metric}
                      </span>
                      <span>
                        <strong>Current:</strong>{" "}
                        <span className={config.color}>{alert.currentValue}</span>
                      </span>
                      <span>
                        <strong>Threshold:</strong> {alert.threshold}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {alert.timestamp}
                    </span>
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
