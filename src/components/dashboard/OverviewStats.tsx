import { 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  Droplets,
  Bus,
  Home,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { schemesData as defaultSchemesData, totalBudgetSummary as defaultTotalBudgetSummary, Scheme, KPI } from "@/data/dashboardData";

interface OverviewStatsProps {
  schemesData?: Scheme[];
  totalBudgetSummary?: typeof defaultTotalBudgetSummary;
}

export const OverviewStats = ({ 
  schemesData = defaultSchemesData, 
  totalBudgetSummary = defaultTotalBudgetSummary 
}: OverviewStatsProps) => {
  // Calculate scheme statistics
  const totalKpis = schemesData.reduce((acc, scheme) => acc + scheme.kpis.length, 0);
  
  const completedKpis = schemesData.reduce((acc, scheme) => {
    return acc + scheme.kpis.filter(kpi => {
      const status = kpi.status.toLowerCase();
      return status === "done" || status === "yes" || status === "100%";
    }).length;
  }, 0);

  const inProgressKpis = schemesData.reduce((acc, scheme) => {
    return acc + scheme.kpis.filter(kpi => {
      const status = kpi.status.toLowerCase();
      return status.includes("progress") || status.includes("consultation");
    }).length;
  }, 0);

  const pendingKpis = totalKpis - completedKpis - inProgressKpis;

  // Highlight metrics from the data
  const keyMetrics = [
    {
      title: "Water Supply Coverage",
      value: "98.29%",
      subtitle: "10.97 Lakh HH connected",
      icon: <Droplets className="h-5 w-5" />,
      trend: "+2.1%",
      positive: true,
      color: "bg-blue-500"
    },
    {
      title: "ODF Status (ULBs)",
      value: "114/115",
      subtitle: "99% ULBs ODF certified",
      icon: <CheckCircle2 className="h-5 w-5" />,
      trend: "99%",
      positive: true,
      color: "bg-green-500"
    },
    {
      title: "PMAY Houses Sanctioned",
      value: "20,492",
      subtitle: "Against 1.37L applications",
      icon: <Home className="h-5 w-5" />,
      trend: "15%",
      positive: false,
      color: "bg-amber-500"
    },
    {
      title: "Ama Bus Daily Ridership",
      value: "3.12 Lakh",
      subtitle: "43% electric fleet",
      icon: <Bus className="h-5 w-5" />,
      trend: "+1%",
      positive: true,
      color: "bg-purple-500"
    },
    {
      title: "Waste Processing",
      value: "96%",
      subtitle: "1660 MT/day processed",
      icon: <Trash2 className="h-5 w-5" />,
      trend: "+4%",
      positive: true,
      color: "bg-teal-500"
    },
    {
      title: "Sanitation Workers (GARIMA)",
      value: "9,075",
      subtitle: "97% covered under ID",
      icon: <Users className="h-5 w-5" />,
      trend: "97%",
      positive: true,
      color: "bg-indigo-500"
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stat-card animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Schemes</p>
                <p className="text-3xl font-bold text-foreground">{schemesData.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total KPIs</p>
                <p className="text-3xl font-bold text-foreground">{totalKpis}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-info" />
              </div>
            </div>
            <div className="mt-3">
              <Progress value={(completedKpis / totalKpis) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed KPIs</p>
                <p className="text-3xl font-bold text-success">{completedKpis}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {((completedKpis / totalKpis) * 100).toFixed(0)}% of total
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-warning">{inProgressKpis}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {pendingKpis} pending
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Performance Highlights */}
      <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Key Performance Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className={`h-10 w-10 rounded-lg ${metric.color}/10 flex items-center justify-center flex-shrink-0`}>
                  <div className={metric.color.replace('bg-', 'text-')}>
                    {metric.icon}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{metric.title}</p>
                  <p className="text-lg font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground truncate">{metric.subtitle}</p>
                    <Badge 
                      variant={metric.positive ? "default" : "secondary"} 
                      className="text-[10px] px-1.5 py-0"
                    >
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links to Schemes */}
      <Card className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Quick Access - Active Schemes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {schemesData.slice(0, 12).map((scheme) => {
              const completed = scheme.kpis.filter(kpi => {
                const s = kpi.status.toLowerCase();
                return s === "done" || s === "yes" || s === "100%";
              }).length;
              const progress = (completed / scheme.kpis.length) * 100;

              return (
                <div
                  key={scheme.id}
                  className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group"
                >
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {scheme.shortName}
                  </p>
                  <div className="mt-2">
                    <Progress value={progress} className="h-1" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {completed}/{scheme.kpis.length} KPIs
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
