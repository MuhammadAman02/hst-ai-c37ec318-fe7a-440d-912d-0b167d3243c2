import { useLocation } from "react-router-dom";
import {
  BarChart3,
  Shield,
  TrendingUp,
  FileText,
  Settings,
  AlertTriangle,
  PieChart,
  Activity
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Portfolio Risk",
    url: "/portfolio",
    icon: PieChart,
  },
  {
    title: "Market Risk",
    url: "/market",
    icon: TrendingUp,
  },
  {
    title: "Compliance",
    url: "/compliance",
    icon: Shield,
  },
  {
    title: "Risk Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Alerts",
    url: "/alerts",
    icon: AlertTriangle,
  },
];

const adminItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "System Health",
    url: "/health",
    icon: Activity,
  },
];

export function AppSidebar() {
  const location = useLocation();
  console.log("AppSidebar rendered, current path:", location.pathname);
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">RiskManager</h2>
            <p className="text-xs text-muted-foreground">Enterprise Risk Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Risk Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a 
                      href={item.url} 
                      className={cn(
                        "flex items-center gap-2",
                        location.pathname === item.url && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', item.url);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                        console.log("Navigation to:", item.url);
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a 
                      href={item.url} 
                      className={cn(
                        "flex items-center gap-2",
                        location.pathname === item.url && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', item.url);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                        console.log("Navigation to:", item.url);
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}