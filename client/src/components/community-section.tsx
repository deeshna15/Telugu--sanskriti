import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Heart } from "lucide-react";

export default function CommunitySection() {
  const stats = [
    { value: "75M+", label: "Global Speakers", color: "text-primary" },
    { value: "50+", label: "Countries", color: "text-secondary" },
    { value: "1000+", label: "Years of Literature", color: "text-accent" },
    { value: "8th", label: "Most Spoken in India", color: "text-destructive" }
  ];

  const contributions = [
    {
      icon: "fas fa-pencil-alt",
      title: "Share Stories",
      description: "Contribute folk tales, family stories, or cultural experiences"
    },
    {
      icon: "fas fa-chalkboard-teacher",
      title: "Teach Others",
      description: "Help others learn Telugu language and culture"
    },
    {
      icon: "fas fa-hands-helping",
      title: "Volunteer",
      description: "Support community events and cultural preservation"
    }
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center" data-testid="text-community-title">
        Our Global Telugu Community
      </h2>
      
      {/* Community Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const statImages = [
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
          ];
          return (
            <Card key={index} data-testid={`stat-${index}`} className="overflow-hidden relative">
              <div className="absolute inset-0">
                <img 
                  src={statImages[index]}
                  alt={stat.label}
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <CardContent className="text-center p-6 relative">
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Community Events */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="overflow-hidden" data-testid="card-ugadi-celebrations">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
            alt="Community celebration" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Annual Ugadi Celebrations</h3>
            <p className="text-muted-foreground mb-4">
              Join Telugu communities worldwide in celebrating the New Year with traditional food, 
              cultural programs, and community bonding.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>March-April Every Year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden" data-testid="card-learning-circles">
          <img 
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
            alt="Cultural learning gathering" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Language Learning Circles</h3>
            <p className="text-muted-foreground mb-4">
              Connect with local Telugu learning groups where beginners and experts share knowledge 
              through interactive sessions.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              <span>Weekly Meetups Worldwide</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Contributions */}
      <div className="bg-gradient-to-r from-secondary to-primary p-8 rounded-xl text-white" data-testid="section-contributions">
        <h3 className="text-2xl font-bold mb-6 text-center">How You Can Contribute</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {contributions.map((contribution, index) => (
            <div key={index} className="text-center" data-testid={`contribution-${index}`}>
              <i className={`${contribution.icon} text-3xl mb-4 opacity-90`}></i>
              <h4 className="font-semibold mb-2">{contribution.title}</h4>
              <p className="text-sm opacity-90">{contribution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
