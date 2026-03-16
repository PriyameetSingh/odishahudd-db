import { 
  LayoutDashboard, 
  PieChart, 
  FileText, 
  ClipboardList, 
  Settings,
  Building2,
  Droplets,
  Bus,
  Home,
  Leaf,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Bell,
  TrendingUp,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { verticals } from "@/data/dashboardData";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const verticalIcons: Record<string, React.ReactNode> = {
  "SUJALA": <Droplets className="h-4 w-4" />,
  "Swachha Odisha": <Leaf className="h-4 w-4" />,
  "MSBY": <Building2 className="h-4 w-4" />,
  "Urban Mobility": <Bus className="h-4 w-4" />,
  "Samruddha Sahara": <Home className="h-4 w-4" />,
  "Capacity Building": <GraduationCap className="h-4 w-4" />,
  "CSS": <FileText className="h-4 w-4" />,
};

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [verticalsOpen, setVerticalsOpen] = useState(false);

  const mainNavItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "financial", label: "Financial Progress", icon: <PieChart className="h-4 w-4" /> },
    { id: "schemes", label: "Schemes & KPIs", icon: <FileText className="h-4 w-4" /> },
    { id: "actions", label: "Action Items", icon: <ClipboardList className="h-4 w-4" /> },
    { id: "alerts", label: "Smart Alerts", icon: <Bell className="h-4 w-4" /> },
    { id: "forecasting", label: "Trend Forecasting", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "meetings", label: "Meeting Notes", icon: <BookOpen className="h-4 w-4" /> },
    { id: "ai-insights", label: "AI Insights", icon: <Sparkles className="h-4 w-4" /> },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar">
      <ScrollArea className="flex-1 py-4">
        <div className="px-3 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
          {mainNavItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                activeTab === item.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>

        <div className="px-3 mt-6">
          <Collapsible open={verticalsOpen} onOpenChange={setVerticalsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between px-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Verticals
                </span>
                {verticalsOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
              {verticals.map((vertical) => (
                <Button
                  key={vertical.name}
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm font-normal"
                  onClick={() => setActiveTab("schemes")}
                >
                  <div className={`h-2 w-2 rounded-full ${vertical.color}`} />
                  <span className="truncate">{vertical.name}</span>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="px-3 mt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Data Sources
          </p>
          <div className="space-y-1 text-xs text-muted-foreground px-3">
            <p className="py-1">• IFMS (Finance)</p>
            <p className="py-1">• SBM Portal (National)</p>
            <p className="py-1">• PMAY-Urban Portal</p>
            <p className="py-1">• SAHAJOG App</p>
            <p className="py-1">• Janasunani Portal</p>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
};
