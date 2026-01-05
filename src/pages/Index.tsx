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

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 pb-20 lg:pb-6">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "financial" && "Financial Progress"}
                {activeTab === "schemes" && "Schemes & KPIs"}
                {activeTab === "actions" && "Action Items"}
                {activeTab === "ai-insights" && "AI Insights"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {activeTab === "overview" && "52nd Dashboard Meeting - Housing & Urban Development Department, Odisha"}
                {activeTab === "financial" && "Budget vs Expenditure Analysis for FY 2025-26"}
                {activeTab === "schemes" && "Comprehensive view of all schemes with Key Performance Indicators"}
                {activeTab === "actions" && "Track action items and decisions from dashboard meetings"}
                {activeTab === "ai-insights" && "Ask questions about dashboard data using AI"}
              </p>
            </div>

            {/* Content based on active tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <OverviewStats />
                <FinancialSummary />
              </div>
            )}

            {activeTab === "financial" && (
              <div className="space-y-6">
                <FinancialSummary />
                <BudgetTable />
              </div>
            )}

            {activeTab === "schemes" && (
              <SchemesList />
            )}

            {activeTab === "actions" && (
              <ActionItemsTable />
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
