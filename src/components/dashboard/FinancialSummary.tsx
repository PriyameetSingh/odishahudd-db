import { ArrowUp, ArrowDown, IndianRupee, TrendingUp, Wallet, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  financialProgressSummary as defaultFinancialProgressSummary, 
  transferFromState as defaultTransferFromState, 
  totalBudgetSummary as defaultTotalBudgetSummary,
  FinancialProgress
} from "@/data/dashboardData";

interface FinancialSummaryProps {
  financialProgressSummary?: FinancialProgress[];
  transferFromState?: FinancialProgress[];
  totalBudgetSummary?: typeof defaultTotalBudgetSummary;
}

export const FinancialSummary = ({
  financialProgressSummary = defaultFinancialProgressSummary,
  transferFromState = defaultTransferFromState,
  totalBudgetSummary = defaultTotalBudgetSummary
}: FinancialSummaryProps) => {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return "bg-success";
    if (percentage >= 40) return "bg-warning";
    return "bg-destructive";
  };

  const totalStateScheme = financialProgressSummary.reduce((acc, item) => acc + item.ifmsOrder, 0);
  const totalTransfer = transferFromState.reduce((acc, item) => acc + item.ifmsOrder, 0);

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stat-card animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget 2025-26</p>
                <p className="text-2xl font-bold text-foreground mt-1">₹{totalBudgetSummary.totalBudget.toLocaleString()} Cr</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">FY 2025-26</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenditure</p>
                <p className="text-2xl font-bold text-foreground mt-1">₹{totalBudgetSummary.totalExpenditure.toLocaleString()} Cr</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="mt-3">
              <Progress value={totalBudgetSummary.overallPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{totalBudgetSummary.overallPercentage}% utilized</p>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">State Sector Schemes</p>
                <p className="text-2xl font-bold text-foreground mt-1">₹{totalStateScheme.toLocaleString()} Cr</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-info" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success font-medium">52.96%</span>
              <span className="text-xs text-muted-foreground">of budget</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Central Schemes</p>
                <p className="text-2xl font-bold text-foreground mt-1">₹752.56 Cr</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <PiggyBank className="h-5 w-5 text-accent" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <ArrowDown className="h-3 w-3 text-destructive" />
              <span className="text-xs text-destructive font-medium">34.78%</span>
              <span className="text-xs text-muted-foreground">of allocation</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Progress Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Scheme-wise Budget Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialProgressSummary.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.planType}</span>
                    <span className="text-muted-foreground">₹{item.ifmsOrder.toLocaleString()} / ₹{item.budgetEstimate.toLocaleString()} Cr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(item.percentage)}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold min-w-[50px] text-right ${item.percentage >= 50 ? 'text-success' : 'text-warning'}`}>
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Transfer from State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transferFromState.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.planType}</span>
                    <span className="text-muted-foreground">₹{item.ifmsOrder.toLocaleString()} / ₹{item.budgetEstimate.toLocaleString()} Cr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(item.percentage)}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold min-w-[50px] text-right ${item.percentage >= 50 ? 'text-success' : 'text-warning'}`}>
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
