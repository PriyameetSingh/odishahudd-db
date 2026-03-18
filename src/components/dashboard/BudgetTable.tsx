import { useState } from "react";
import { Database, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { schemeFinancialData as defaultSchemeFinancialData, verticals, SchemeFinancial } from "@/data/dashboardData";

interface BudgetTableProps {
  schemeFinancialData?: SchemeFinancial[];
}

export const BudgetTable = ({ 
  schemeFinancialData = defaultSchemeFinancialData 
}: BudgetTableProps) => {
  const [sortField, setSortField] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedVertical, setSelectedVertical] = useState<string>("all");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = schemeFinancialData.filter(item => 
    selectedVertical === "all" || item.vertical === selectedVertical
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField as keyof typeof a] as string | number | null;
    let bValue = b[sortField as keyof typeof b] as string | number | null;
    
    if (aValue === null) aValue = -1;
    if (bValue === null) bValue = -1;
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getProgressColor = (percentage: number | null) => {
    if (percentage === null) return "bg-muted";
    if (percentage >= 70) return "bg-success";
    if (percentage >= 40) return "bg-warning";
    return "bg-destructive";
  };

  const uniqueVerticals = [...new Set(schemeFinancialData.map(item => item.vertical))];

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">Scheme-wise Budget vs Expenditure (2025-26)</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedVertical === "all" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedVertical("all")}
              className="text-xs"
            >
              All
            </Button>
            {uniqueVerticals.slice(0, 5).map((vertical) => (
              <Button
                key={vertical}
                variant={selectedVertical === vertical ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedVertical(vertical)}
                className="text-xs"
              >
                {vertical}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-medium" onClick={() => handleSort("id")}>
                    # <ArrowUpDown className="h-3 w-3 ml-1" />
                  </Button>
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Vertical</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2 min-w-[200px]">Scheme Name</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-2">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-medium" onClick={() => handleSort("budget")}>
                    Budget (Cr) <ArrowUpDown className="h-3 w-3 ml-1" />
                  </Button>
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-2">S.O. Order</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-2">IFMS</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2 min-w-[150px]">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-medium" onClick={() => handleSort("percentage")}>
                    Progress <ArrowUpDown className="h-3 w-3 ml-1" />
                  </Button>
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 text-sm text-muted-foreground">{item.id}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      {item.vertical}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <p className="text-sm text-foreground">{item.schemeName}</p>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm font-medium">₹{item.budget.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm text-muted-foreground">
                      {item.soExpenditure !== null ? `₹${item.soExpenditure.toLocaleString()}` : "-"}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm text-muted-foreground">
                      {item.ifmsExpenditure !== null ? `₹${item.ifmsExpenditure.toLocaleString()}` : "-"}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {item.percentage !== null ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(item.percentage)}`}
                            style={{ width: `${Math.min(item.percentage, 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          item.percentage >= 70 ? 'text-success' : 
                          item.percentage >= 40 ? 'text-warning' : 'text-destructive'
                        }`}>
                          {item.percentage.toFixed(1)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-help">
                          <Database className="h-3 w-3" />
                          <span className="max-w-[80px] truncate">{item.sourceSystem}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.sourceSystem}</p>
                      </TooltipContent>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>≥70% Utilized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>40-70% Utilized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span>&lt;40% Utilized</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
