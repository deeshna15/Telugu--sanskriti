import { Card, CardContent } from "@/components/ui/card";
import { Languages, Palette, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4" data-testid="text-hero-title">
          Welcome to Telugu Sanskriti
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-description">
          Discover the rich heritage, vibrant culture, and timeless traditions of the Telugu language and its people. 
          Join us on a journey through literature, arts, community, and learning.
        </p>
      </div>

      {/* Hero Image */}
      <div className="mb-12 rounded-xl overflow-hidden shadow-2xl" data-testid="img-hero">
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
          alt="Telugu cultural celebration" 
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="cultural-card" data-testid="card-language-heritage">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <Languages className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Rich Language Heritage</h3>
            <p className="text-muted-foreground">
              Telugu is one of the oldest Dravidian languages, spoken by over 75 million people worldwide 
              with a literary tradition spanning over 1000 years.
            </p>
          </CardContent>
        </Card>

        <Card className="cultural-card" data-testid="card-arts-culture">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Palette className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Vibrant Arts & Culture</h3>
            <p className="text-muted-foreground">
              From classical dance forms like Kuchipudi to intricate handicrafts, Telugu culture is a 
              tapestry of artistic expressions and traditions.
            </p>
          </CardContent>
        </Card>

        <Card className="cultural-card" data-testid="card-community-bond">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Strong Community Bond</h3>
            <p className="text-muted-foreground">
              Telugu communities worldwide maintain strong connections through festivals, traditions, 
              and shared cultural values that unite generations.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-center" data-testid="section-mission">
        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
        <p className="text-white/90 text-lg max-w-4xl mx-auto">
          To preserve, promote, and share the beautiful Telugu language and culture with the world, 
          ensuring future generations can connect with their rich heritage through modern, engaging experiences.
        </p>
      </div>
    </div>
  );
}
