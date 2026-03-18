import { useState } from "react";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SchemeCard } from "./SchemeCard";
import { schemesData as defaultSchemesData, Scheme, SchemeFinancial } from "@/data/dashboardData";

interface SchemesListProps {
  schemesData?: Scheme[];
  schemeFinancialData?: SchemeFinancial[];
}

export const SchemesList = ({ 
  schemesData = defaultSchemesData,
  schemeFinancialData // we don't use it directly here but might need it later or in subcomponents
}: SchemesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.kpis.some(kpi => kpi.kpiName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filterStatus === "all") return matchesSearch;
    
    if (filterStatus === "completed") {
      return matchesSearch && scheme.kpis.some(kpi => {
        const status = kpi.status.toLowerCase();
        return status === "done" || status === "yes" || status === "100%";
      });
    }
    
    if (filterStatus === "in-progress") {
      return matchesSearch && scheme.kpis.some(kpi => 
        kpi.status.toLowerCase().includes("progress") || kpi.status.toLowerCase().includes("consultation")
      );
    }
    
    if (filterStatus === "pending") {
      return matchesSearch && scheme.kpis.some(kpi => {
        const status = kpi.status.toLowerCase();
        return status === "pending" || status === "no" || status === "-";
      });
    }

    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schemes, KPIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schemes</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredSchemes.length} of {schemesData.length} schemes
      </p>

      <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "space-y-4"}>
        {filteredSchemes.map((scheme, index) => (
          <SchemeCard key={scheme.id} scheme={scheme} index={index} />
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No schemes found matching your search.</p>
        </div>
      )}
    </div>
  );
};
