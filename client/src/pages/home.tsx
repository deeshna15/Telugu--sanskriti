import { useState } from "react";
import Navigation from "@/components/navigation";
import AboutSection from "@/components/about-section";
import LiteratureSection from "@/components/literature-section";
import CommunitySection from "@/components/community-section";
import LearningSection from "@/components/learning-section";
import InteractiveSection from "@/components/interactive-section";
import StoriesSection from "@/components/stories-section";

export type TabType = "about" | "literature" | "community" | "learning" | "interactive" | "stories";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutSection />;
      case "literature":
        return <LiteratureSection />;
      case "community":
        return <CommunitySection />;
      case "learning":
        return <LearningSection />;
      case "interactive":
        return <InteractiveSection />;
      case "stories":
        return <StoriesSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-telugu">తె</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Telugu Sanskriti</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Preserving and promoting the beautiful Telugu language and culture for future generations. 
              Join us in this journey of cultural celebration and learning.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-youtube"
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2023 Telugu Sanskriti. Made with ❤️ for Telugu language and culture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
