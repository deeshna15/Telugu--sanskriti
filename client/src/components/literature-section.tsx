import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LiteratureSection() {
  const poets = [
    {
      name: "Vemana",
      nameTelugu: "వేమన",
      description: "Philosophical poet known for his four-line verses",
      symbol: "కవి"
    },
    {
      name: "Sri Krishnadevaraya",
      nameTelugu: "శ్రీ కృష్ణదేవరాయ",
      description: "Vijayanagara emperor and accomplished poet",
      symbol: "రాజ"
    },
    {
      name: "Kaloji Narayana Rao",
      nameTelugu: "కాలోజి నారాయణ రావు",
      description: "Modern poet and freedom fighter",
      symbol: "కల"
    }
  ];

  const literaryWorks = [
    "Andhra Mahabharatam - The Telugu Mahabharata",
    "Sumati Shatakam - Moral verses by Baddena",
    "Amuktamalyada - Epic by Sri Krishnadevaraya"
  ];

  const artForms = [
    "Kuchipudi - Classical dance form",
    "Kalamkari - Traditional textile art",
    "Carnatic Music - Classical music tradition"
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center" data-testid="text-literature-title">
        Literature & Arts
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card data-testid="card-classical-literature">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Classical Literature</h3>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
              alt="Classical literature books" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-muted-foreground mb-4">
              Explore the golden age of Telugu literature with works from legendary poets like Nannaya, 
              Tikkana, and Yerrapragada who translated the Mahabharata into Telugu.
            </p>
            <div className="space-y-2">
              {literaryWorks.map((work, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">{work}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-traditional-arts">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Traditional Arts</h3>
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
              alt="Traditional arts and crafts" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-muted-foreground mb-4">
              Discover the rich artistic heritage including classical dance, music, and traditional crafts 
              that define Telugu culture.
            </p>
            <div className="space-y-2">
              {artForms.map((art, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground">{art}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Poets Section */}
      <div className="bg-muted p-8 rounded-xl" data-testid="section-poets">
        <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Legendary Telugu Poets</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {poets.map((poet, index) => (
            <div key={index} className="text-center" data-testid={`poet-${index}`}>
              <div className={cn(
                "w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center",
                index === 0 ? "bg-primary" : index === 1 ? "bg-secondary" : "bg-accent"
              )}>
                <span className={cn(
                  "text-2xl font-telugu font-bold",
                  index === 0 ? "text-primary-foreground" : 
                  index === 1 ? "text-secondary-foreground" : "text-accent-foreground"
                )}>
                  {poet.symbol}
                </span>
              </div>
              <h4 className="font-semibold text-foreground">{poet.name}</h4>
              <p className="text-sm text-muted-foreground">{poet.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
