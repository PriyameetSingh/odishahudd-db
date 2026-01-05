import { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { actionItems } from "@/data/dashboardData";

export const ActionItemsTable = () => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedItems = showAll ? actionItems : actionItems.slice(0, 8);

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("completed") || statusLower.includes("finalized") || statusLower.includes("achieved")) {
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    }
    if (statusLower.includes("progress") || statusLower.includes("process") || statusLower.includes("underway")) {
      return <Clock className="h-4 w-4 text-warning" />;
    }
    return <AlertTriangle className="h-4 w-4 text-info" />;
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("completed") || statusLower.includes("finalized") || statusLower.includes("achieved")) {
      return "default";
    }
    if (statusLower.includes("progress") || statusLower.includes("process")) {
      return "secondary";
    }
    return "outline";
  };

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Key Action Items from Dashboard Meetings</CardTitle>
          <Badge variant="outline" className="text-xs">
            {actionItems.length} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">#</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2 min-w-[300px]">Action Item</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Action By</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">Timeline</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2 min-w-[200px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 text-sm text-muted-foreground">{item.id}</td>
                  <td className="py-3 px-2">
                    <p className="text-sm text-foreground">{item.actionItem}</p>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {item.actionBy}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.timeline}</span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-start gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-xs text-muted-foreground">{item.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {actionItems.length > 8 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-primary"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show All {actionItems.length} Items
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
