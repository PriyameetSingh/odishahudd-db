import { LayoutDashboard, PieChart, FileText, ClipboardList, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav = ({ activeTab, setActiveTab }: MobileNavProps) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "financial", label: "Financial", icon: <PieChart className="h-5 w-5" /> },
    { id: "schemes", label: "Schemes", icon: <FileText className="h-5 w-5" /> },
    { id: "actions", label: "Actions", icon: <ClipboardList className="h-5 w-5" /> },
    { id: "ai-insights", label: "AI", icon: <Sparkles className="h-5 w-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
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
      </div>
    </nav>
  );
};
