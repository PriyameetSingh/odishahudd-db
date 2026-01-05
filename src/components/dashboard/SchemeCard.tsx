import { useState } from "react";
import { ChevronDown, ChevronUp, Database, User, Clock, CheckCircle2, AlertCircle, XCircle, Minus, Info } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Scheme, KPI } from "@/data/dashboardData";

interface SchemeCardProps {
  scheme: Scheme;
  index: number;
}

const getStatusIcon = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower === "done" || statusLower === "yes" || statusLower === "100%") {
    return <CheckCircle2 className="h-4 w-4 text-success" />;
  }
  if (statusLower.includes("progress") || statusLower.includes("consultation")) {
    return <AlertCircle className="h-4 w-4 text-warning" />;
  }
  if (statusLower === "no" || statusLower === "pending" || statusLower === "0%") {
    return <XCircle className="h-4 w-4 text-destructive" />;
  }
  if (statusLower === "-" || statusLower.includes("pending")) {
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
  return <AlertCircle className="h-4 w-4 text-info" />;
};

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  const statusLower = status.toLowerCase();
  if (statusLower === "done" || statusLower === "yes" || statusLower === "100%") {
    return "default";
  }
  if (statusLower.includes("progress") || statusLower.includes("consultation")) {
    return "secondary";
  }
  if (statusLower === "no" || statusLower === "pending") {
    return "destructive";
  }
  return "outline";
};

const parsePercentage = (status: string): number | null => {
  const match = status.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
};

const KPIRow = ({ kpi }: { kpi: KPI }) => {
  const percentage = parsePercentage(kpi.status);
  const showProgress = percentage !== null && kpi.status.includes("%");

  return (
    <div className="py-3 border-b border-border/50 last:border-0">
      <div className="flex items-start gap-3">
        {getStatusIcon(kpi.status)}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{kpi.kpiName}</p>
          
          {showProgress && (
            <div className="mt-2 flex items-center gap-3">
              <Progress value={Math.min(percentage, 100)} className="h-1.5 flex-1" />
              <Badge variant={percentage >= 70 ? "default" : percentage >= 40 ? "secondary" : "destructive"} className="text-xs">
                {kpi.status}
              </Badge>
            </div>
          )}

          {!showProgress && (
            <Badge variant={getStatusBadgeVariant(kpi.status)} className="mt-1 text-xs">
              {kpi.status}
            </Badge>
          )}

          {(kpi.numeratorValue || kpi.denominatorValue) && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {kpi.numeratorValue && (
                <span>
                  <span className="font-medium text-foreground">{kpi.numeratorValue}</span>
                  {kpi.numeratorUnit && ` ${kpi.numeratorUnit}`}
                </span>
              )}
              {kpi.denominatorValue && (
                <span>
                  / <span className="font-medium text-foreground">{kpi.denominatorValue}</span>
                  {kpi.denominatorUnit && ` ${kpi.denominatorUnit}`}
                </span>
              )}
            </div>
          )}

          {kpi.remarks && (
            <p className="mt-1.5 text-xs text-muted-foreground italic">{kpi.remarks}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const SchemeCard = ({ scheme, index }: SchemeCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const completedKpis = scheme.kpis.filter(kpi => {
    const status = kpi.status.toLowerCase();
    return status === "done" || status === "yes" || status === "100%";
  }).length;

  const inProgressKpis = scheme.kpis.filter(kpi => {
    const status = kpi.status.toLowerCase();
    return status.includes("progress") || status.includes("consultation");
  }).length;

  return (
    <Card 
      className="animate-fade-in overflow-hidden transition-shadow hover:shadow-md"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="pb-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    #{scheme.id}
                  </span>
                  <h3 className="text-base font-semibold text-foreground truncate">{scheme.shortName}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{scheme.name}</p>
                
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        <Database className="h-3 w-3" />
                        <span className="max-w-[120px] truncate">{scheme.sourceSystem}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Source: {scheme.sourceSystem}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        <User className="h-3 w-3" />
                        <span>{scheme.nodal}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Nodal Officer: {scheme.nodal}</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                    <Clock className="h-3 w-3" />
                    <span>{scheme.dataFrequency}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                    <span className="text-success font-medium">{completedKpis}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <AlertCircle className="h-3 w-3 text-warning" />
                    <span className="text-warning font-medium">{inProgressKpis}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>/ {scheme.kpis.length} KPIs</span>
                  </div>
                </div>
                
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="border-t border-border pt-3 mb-3">
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Responsible Institution</p>
                  <p>{scheme.responsibleInstitution}</p>
                </div>
              </div>
            </div>

            <div className="space-y-0">
              {scheme.kpis.map((kpi) => (
                <KPIRow key={kpi.id} kpi={kpi} />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
