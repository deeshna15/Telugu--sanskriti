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
      <header className="bg-card shadow-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4" data-testid="header-logo">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl font-telugu">తె</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Telugu Sanskriti</h1>
                <p className="text-sm text-muted-foreground">Preserving Our Cultural Heritage</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1" data-testid="desktop-navigation">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    )}
                    data-testid={`tab-${tab.id}`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </nav>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-card border-b border-border transition-all duration-300",
        isMobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-2" data-testid="mobile-navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "justify-start font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
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

      {/* Mobile Tab Strip (Alternative compact view) */}
      <div className="md:hidden bg-card border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex overflow-x-auto space-x-2 pb-2" data-testid="mobile-tab-strip">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "whitespace-nowrap text-sm transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
                data-testid={`tab-strip-${tab.id}`}
              >
                {tab.mobileLabel || tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
