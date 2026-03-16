import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { SchemesList } from "@/components/dashboard/SchemesList";
import { ActionItemsTable } from "@/components/dashboard/ActionItemsTable";
import { BudgetTable } from "@/components/dashboard/BudgetTable";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { SmartAlerts } from "@/components/dashboard/SmartAlerts";
import { TrendForecasting } from "@/components/dashboard/TrendForecasting";
import { MeetingNotes } from "@/components/dashboard/MeetingNotes";
import UploadBox from "@/components/dashboard/UploadBox";
import { TransformedData } from "@/utils/tranformExcelData";
import { 
  financialProgressSummary as initialFinancial, 
  schemeFinancialData as initialSchemeFinancial,
  schemesData as initialSchemes,
  totalBudgetSummary as initialTotalBudget,
  transferFromState as initialTransfer,
  KPI
} from "@/data/dashboardData";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState({
    financial: initialFinancial,
    schemeFinancial: initialSchemeFinancial,
    schemes: initialSchemes,
    totalBudget: initialTotalBudget,
    transfer: initialTransfer
  });

  const handleDataUpload = (data: TransformedData) => {
    console.log("Transformed data received in Index page:", data);
    // Transform financial data
    const newFinancial = data.financial.map(item => ({
      planType: item.planType,
      budgetEstimate: item.budget,
      soOrder: item.expenditureSO,
      ifmsOrder: item.expenditureIFMS,
      percentage: item.percent
    }));

    // Transform scheme financial data
    const newSchemeFinancial = data.schemes.map((item, index) => ({
      id: index + 100, // New IDs for uploaded data
      vertical: item.vertical,
      schemeName: item.scheme,
      budget: item.budget,
      soExpenditure: item.expenditureSO,
      ifmsExpenditure: item.expenditureIFMS,
      percentage: item.percent,
      sourceSystem: "Excel Upload"
    }));

    // Update total budget summary
    const totalBudget = newFinancial.reduce((acc, curr) => acc + curr.budgetEstimate, 0);
    const totalExpenditure = newFinancial.reduce((acc, curr) => acc + curr.ifmsOrder, 0);
    const newTotalBudgetSummary = {
      ...dashboardData.totalBudget,
      totalBudget: totalBudget,
      totalExpenditure: totalExpenditure,
      overallPercentage: totalBudget > 0 ? Number(((totalExpenditure / totalBudget) * 100).toFixed(2)) : 0
    };

    // Transform KPI data
    // Group KPIs by scheme
    const kpiByScheme: Record<string, KPI[]> = {};
    data.kpis.forEach((kpi, index) => {
      if (!kpiByScheme[kpi.scheme]) {
        kpiByScheme[kpi.scheme] = [];
      }
      kpiByScheme[kpi.scheme].push({
        id: `uploaded-kpi-${index}`,
        kpiName: kpi.kpi,
        status: String(kpi.status || ""),
        numeratorValue: kpi.numerator as string | number,
        denominatorValue: kpi.denominator as string | number,
        remarks: kpi.remarks || ""
      });
    });

    const newSchemes = Object.keys(kpiByScheme).map((schemeName, index) => ({
      id: index + 200,
      name: schemeName,
      shortName: schemeName.substring(0, 10),
      nodal: "Uploaded",
      sourceSystem: "Excel Upload",
      responsibleInstitution: "Uploaded",
      dataFrequency: "Monthly",
      kpis: kpiByScheme[schemeName]
    }));

    setDashboardData({
      ...dashboardData,
      financial: newFinancial,
      schemeFinancial: newSchemeFinancial,
      schemes: newSchemes.length > 0 ? newSchemes : dashboardData.schemes,
      totalBudget: newTotalBudgetSummary
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 pb-20 lg:pb-6">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {/* Page Title & Upload */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "financial" && "Financial Progress"}
                  {activeTab === "schemes" && "Schemes & KPIs"}
                  {activeTab === "actions" && "Action Items"}
                  {activeTab === "alerts" && "Smart Alerts"}
                  {activeTab === "forecasting" && "Trend Forecasting"}
                  {activeTab === "meetings" && "Meeting Notes & Decisions"}
                  {activeTab === "ai-insights" && "AI Insights"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "overview" && "52nd Dashboard Meeting - Housing & Urban Development Department, Odisha"}
                  {activeTab === "financial" && "Budget vs Expenditure Analysis for FY 2025-26"}
                  {activeTab === "schemes" && "Comprehensive view of all schemes with Key Performance Indicators"}
                  {activeTab === "actions" && "Track action items and decisions from dashboard meetings"}
                  {activeTab === "alerts" && "Proactive notifications for KPIs below thresholds"}
                  {activeTab === "forecasting" && "AI-powered predictions for year-end scheme performance"}
                  {activeTab === "meetings" && "Track decisions from dashboard meetings with outcomes"}
                  {activeTab === "ai-insights" && "Ask questions about dashboard data using AI"}
                </p>
              </div>
              <div className="w-full md:w-80">
                <UploadBox onDataUpload={handleDataUpload} />
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <OverviewStats 
                  schemesData={dashboardData.schemes} 
                  totalBudgetSummary={dashboardData.totalBudget} 
                />
                <FinancialSummary 
                  financialProgressSummary={dashboardData.financial}
                  transferFromState={dashboardData.transfer}
                  totalBudgetSummary={dashboardData.totalBudget}
                />
              </div>
            )}

            {activeTab === "financial" && (
              <div className="space-y-6">
                <FinancialSummary 
                  financialProgressSummary={dashboardData.financial}
                  transferFromState={dashboardData.transfer}
                  totalBudgetSummary={dashboardData.totalBudget}
                />
                <BudgetTable schemeFinancialData={dashboardData.schemeFinancial} />
              </div>
            )}

            {activeTab === "schemes" && (
              <SchemesList 
                schemesData={dashboardData.schemes}
                schemeFinancialData={dashboardData.schemeFinancial}
              />
            )}

            {activeTab === "actions" && (
              <ActionItemsTable />
            )}

            {activeTab === "alerts" && (
              <SmartAlerts />
            )}

            {activeTab === "forecasting" && (
              <TrendForecasting />
            )}

            {activeTab === "meetings" && (
              <MeetingNotes />
            )}

            {activeTab === "ai-insights" && (
              <AIInsights />
            )}
          </div>
        </main>
      </div>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
