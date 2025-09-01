import { TabType } from "@/pages/home";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, Book, Users, GraduationCap, Gamepad2, Scroll, Menu } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  mobileLabel?: string;
}

const tabs: TabConfig[] = [
  { id: "about", label: "About", icon: Info },
  { id: "literature", label: "Literature & Arts", icon: Book, mobileLabel: "Literature" },
  { id: "community", label: "Community", icon: Users },
  { id: "learning", label: "Start Learning", icon: GraduationCap, mobileLabel: "Learning" },
  { id: "interactive", label: "Interactive", icon: Gamepad2 },
  { id: "stories", label: "Folk Stories", icon: Scroll, mobileLabel: "Stories" },
];

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-card shadow-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3" data-testid="header-logo">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg font-telugu">తె</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary">Telugu Sanskriti</h1>
                <p className="text-xs text-muted-foreground">Preserving Our Cultural Heritage</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-primary">Telugu Sanskriti</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1" data-testid="desktop-navigation">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "font-medium transition-all text-xs",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                    data-testid={`tab-${tab.id}`}
                  >
                    <Icon className="mr-1.5 h-3.5 w-3.5" />
                    {tab.label}
                  </Button>
                );
              })}
            </nav>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-primary hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <div className={cn(
        "lg:hidden bg-card border-b border-border transition-all duration-300 shadow-lg",
        isMobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-2 gap-2" data-testid="mobile-navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "justify-start font-medium transition-all text-sm",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                  data-testid={`tab-mobile-${tab.id}`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.mobileLabel || tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
