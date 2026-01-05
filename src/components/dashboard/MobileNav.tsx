import { LayoutDashboard, PieChart, FileText, Bell, Sparkles, TrendingUp, BookOpen, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav = ({ activeTab, setActiveTab }: MobileNavProps) => {
  const mainNavItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "financial", label: "Financial", icon: <PieChart className="h-5 w-5" /> },
    { id: "schemes", label: "Schemes", icon: <FileText className="h-5 w-5" /> },
    { id: "alerts", label: "Alerts", icon: <Bell className="h-5 w-5" /> },
  ];

  const moreNavItems = [
    { id: "forecasting", label: "Trend Forecasting", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "meetings", label: "Meeting Notes", icon: <BookOpen className="h-4 w-4" /> },
    { id: "ai-insights", label: "AI Insights", icon: <Sparkles className="h-4 w-4" /> },
  ];

  const isMoreActive = moreNavItems.some((item) => item.id === activeTab);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {mainNavItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
              activeTab === item.id ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isMoreActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {moreNavItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={activeTab === item.id ? "bg-accent" : ""}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
