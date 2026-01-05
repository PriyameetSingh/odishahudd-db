import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

interface MonthlyData {
  month: string;
  actual?: number;
  projected?: number;
}

interface ForecastData {
  scheme: string;
  currentUtilization: number;
  projectedYearEnd: number;
  target: number;
  trend: "on-track" | "at-risk" | "critical";
  monthlyData: MonthlyData[];
  recommendation: string;
}

const forecastData: ForecastData[] = [
  {
    scheme: "AMRUT 2.0",
    currentUtilization: 65.38,
    projectedYearEnd: 92,
    target: 85,
    trend: "on-track",
    monthlyData: [
      { month: "Apr", actual: 8 },
      { month: "May", actual: 15 },
      { month: "Jun", actual: 24 },
      { month: "Jul", actual: 32 },
      { month: "Aug", actual: 41 },
      { month: "Sep", actual: 50 },
      { month: "Oct", actual: 58 },
      { month: "Nov", actual: 65 },
      { month: "Dec", actual: 65.38 },
      { month: "Jan", projected: 72 },
      { month: "Feb", projected: 82 },
      { month: "Mar", projected: 92 },
    ],
    recommendation: "Maintain current pace. Consider accelerating in Q4 for buffer.",
  },
  {
    scheme: "SUJALA (Water Supply)",
    currentUtilization: 56.49,
    projectedYearEnd: 78,
    target: 80,
    trend: "at-risk",
    monthlyData: [
      { month: "Apr", actual: 5 },
      { month: "May", actual: 11 },
      { month: "Jun", actual: 18 },
      { month: "Jul", actual: 25 },
      { month: "Aug", actual: 32 },
      { month: "Sep", actual: 40 },
      { month: "Oct", actual: 48 },
      { month: "Nov", actual: 53 },
      { month: "Dec", actual: 56.49 },
      { month: "Jan", projected: 62 },
      { month: "Feb", projected: 70 },
      { month: "Mar", projected: 78 },
    ],
    recommendation: "Increase monthly disbursement by 15% to meet target.",
  },
  {
    scheme: "PMAY-U",
    currentUtilization: 0.4,
    projectedYearEnd: 8,
    target: 60,
    trend: "critical",
    monthlyData: [
      { month: "Apr", actual: 0 },
      { month: "May", actual: 0 },
      { month: "Jun", actual: 0 },
      { month: "Jul", actual: 0.1 },
      { month: "Aug", actual: 0.15 },
      { month: "Sep", actual: 0.2 },
      { month: "Oct", actual: 0.28 },
      { month: "Nov", actual: 0.35 },
      { month: "Dec", actual: 0.4 },
      { month: "Jan", projected: 2 },
      { month: "Feb", projected: 5 },
      { month: "Mar", projected: 8 },
    ],
    recommendation: "URGENT: Requires immediate intervention. Current trajectory will miss target by 87%.",
  },
  {
    scheme: "Swachha Bharat Mission",
    currentUtilization: 10.08,
    projectedYearEnd: 25,
    target: 50,
    trend: "critical",
    monthlyData: [
      { month: "Apr", actual: 1 },
      { month: "May", actual: 2 },
      { month: "Jun", actual: 3.5 },
      { month: "Jul", actual: 5 },
      { month: "Aug", actual: 6.2 },
      { month: "Sep", actual: 7.5 },
      { month: "Oct", actual: 8.5 },
      { month: "Nov", actual: 9.5 },
      { month: "Dec", actual: 10.08 },
      { month: "Jan", projected: 15 },
      { month: "Feb", projected: 20 },
      { month: "Mar", projected: 25 },
    ],
    recommendation: "Need to accelerate SWM infrastructure and ODF++ certifications.",
  },
  {
    scheme: "Storm Water Drainage",
    currentUtilization: 83.02,
    projectedYearEnd: 100,
    target: 90,
    trend: "on-track",
    monthlyData: [
      { month: "Apr", actual: 10 },
      { month: "May", actual: 22 },
      { month: "Jun", actual: 35 },
      { month: "Jul", actual: 45 },
      { month: "Aug", actual: 55 },
      { month: "Sep", actual: 63 },
      { month: "Oct", actual: 72 },
      { month: "Nov", actual: 78 },
      { month: "Dec", actual: 83.02 },
      { month: "Jan", projected: 90 },
      { month: "Feb", projected: 95 },
      { month: "Mar", projected: 100 },
    ],
    recommendation: "Excellent progress. Will exceed target.",
  },
];

const trendConfig = {
  "on-track": {
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    label: "On Track",
  },
  "at-risk": {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    label: "At Risk",
  },
  critical: {
    icon: TrendingDown,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    label: "Critical",
  },
};

export const TrendForecasting = () => {
  const [selectedScheme, setSelectedScheme] = useState<ForecastData>(forecastData[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    toast({
      title: "AI Analysis Complete",
      description: "Forecasts have been updated with the latest data patterns.",
    });
  };

  const onTrackCount = forecastData.filter((d) => d.trend === "on-track").length;
  const atRiskCount = forecastData.filter((d) => d.trend === "at-risk").length;
  const criticalCount = forecastData.filter((d) => d.trend === "critical").length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="text-2xl font-bold text-green-500">{onTrackCount}</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold text-amber-500">{atRiskCount}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <TrendingDown className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-4">
            <Button
              className="w-full h-full"
              variant="outline"
              onClick={runAIAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Run AI Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Scheme Selection */}
      <div className="flex gap-2 flex-wrap">
        {forecastData.map((data) => {
          const config = trendConfig[data.trend];
          return (
            <Button
              key={data.scheme}
              variant={selectedScheme.scheme === data.scheme ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedScheme(data)}
              className={
                selectedScheme.scheme !== data.scheme ? `${config.border}` : ""
              }
            >
              {data.scheme}
              <Badge
                variant="secondary"
                className={`ml-2 ${config.bg} ${config.color} text-xs`}
              >
                {data.trend === "on-track" ? "✓" : data.trend === "at-risk" ? "!" : "⚠"}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Detailed Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {selectedScheme.scheme} - Utilization Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedScheme.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[0, 100]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <ReferenceLine
                    y={selectedScheme.target}
                    stroke="hsl(var(--primary))"
                    strokeDasharray="5 5"
                    label={{ value: `Target: ${selectedScheme.target}%`, position: "right" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                    name="Actual"
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "hsl(var(--muted-foreground))" }}
                    name="Projected"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Details */}
        <Card className={trendConfig[selectedScheme.trend].border}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Forecast Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-center">
              <Badge
                variant="outline"
                className={`text-lg px-4 py-2 ${trendConfig[selectedScheme.trend].color} ${trendConfig[selectedScheme.trend].bg}`}
              >
                {React.createElement(trendConfig[selectedScheme.trend].icon, {
                  className: "h-5 w-5 mr-2",
                })}
                {trendConfig[selectedScheme.trend].label}
              </Badge>
            </div>

            {/* Progress Comparison */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Current</span>
                  <span className="font-medium">{selectedScheme.currentUtilization}%</span>
                </div>
                <Progress value={selectedScheme.currentUtilization} className="h-2" />
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Projected Year-End</span>
                  <span
                    className={`font-medium ${
                      selectedScheme.projectedYearEnd >= selectedScheme.target
                        ? "text-green-500"
                        : "text-destructive"
                    }`}
                  >
                    {selectedScheme.projectedYearEnd}%
                  </span>
                </div>
                <Progress
                  value={selectedScheme.projectedYearEnd}
                  className={`h-2 ${
                    selectedScheme.projectedYearEnd >= selectedScheme.target
                      ? ""
                      : "[&>div]:bg-destructive"
                  }`}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Target</span>
                  <span className="font-medium text-primary">{selectedScheme.target}%</span>
                </div>
                <Progress value={selectedScheme.target} className="h-2 [&>div]:bg-primary/30" />
              </div>
            </div>

            {/* Gap Analysis */}
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-medium mb-2">Gap Analysis</p>
              <p className="text-2xl font-bold mb-1">
                {selectedScheme.projectedYearEnd >= selectedScheme.target ? (
                  <span className="text-green-500">
                    +{(selectedScheme.projectedYearEnd - selectedScheme.target).toFixed(1)}%
                  </span>
                ) : (
                  <span className="text-destructive">
                    -{(selectedScheme.target - selectedScheme.projectedYearEnd).toFixed(1)}%
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedScheme.projectedYearEnd >= selectedScheme.target
                  ? "Expected to exceed target"
                  : "Expected shortfall from target"}
              </p>
            </div>

            {/* AI Recommendation */}
            <div className={`p-4 rounded-lg ${trendConfig[selectedScheme.trend].bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">AI Recommendation</p>
              </div>
              <p className="text-sm text-muted-foreground">{selectedScheme.recommendation}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Schemes Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Schemes Forecast Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Scheme</th>
                  <th className="text-right py-2">Current</th>
                  <th className="text-right py-2">Projected</th>
                  <th className="text-right py-2">Target</th>
                  <th className="text-right py-2">Gap</th>
                  <th className="text-center py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((data) => {
                  const config = trendConfig[data.trend];
                  const gap = data.projectedYearEnd - data.target;
                  return (
                    <tr key={data.scheme} className="border-b border-border/50">
                      <td className="py-3 font-medium">{data.scheme}</td>
                      <td className="text-right py-3">{data.currentUtilization}%</td>
                      <td className="text-right py-3">{data.projectedYearEnd}%</td>
                      <td className="text-right py-3">{data.target}%</td>
                      <td
                        className={`text-right py-3 font-medium ${
                          gap >= 0 ? "text-green-500" : "text-destructive"
                        }`}
                      >
                        {gap >= 0 ? "+" : ""}
                        {gap.toFixed(1)}%
                      </td>
                      <td className="text-center py-3">
                        <Badge variant="outline" className={`${config.color} ${config.bg}`}>
                          {config.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
