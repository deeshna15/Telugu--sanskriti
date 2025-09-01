import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Story } from "@shared/schema";

export default function StoriesSection() {
  const { data: stories = [], isLoading } = useQuery<Story[]>({
    queryKey: ["/api/stories"],
  });

  const blogPosts = [
    {
      title: "The Evolution of Telugu Script",
      summary: "Explore how the beautiful Telugu script has evolved over centuries, from ancient inscriptions to modern digital typography...",
      date: "Dec 15, 2023"
    },
    {
      title: "Telugu Festivals Around the World",
      summary: "Discover how Telugu communities across the globe celebrate traditional festivals while adapting to local cultures...",
      date: "Dec 10, 2023"
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Telugu Folk Stories</h2>
        <div className="text-center">Loading stories...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center" data-testid="text-stories-title">
        Telugu Folk Stories
      </h2>
      
      {/* Stories Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden cultural-card" data-testid={`story-${story.id}`}>
            {story.imageUrl && (
              <img 
                src={story.imageUrl} 
                alt={story.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-foreground">{story.title}</h3>
                <Badge variant="secondary">{story.category}</Badge>
              </div>
              {story.titleTelugu && (
                <p className="font-telugu text-base text-primary mb-3">{story.titleTelugu}</p>
              )}
              <p className="text-muted-foreground mb-4">{story.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {story.author ? `by ${story.author}` : "Traditional Tale"}
                </span>
                <Button 
                  variant="link" 
                  className="text-primary hover:text-primary/80 font-medium p-0"
                  data-testid={`button-read-story-${story.id}`}
                >
                  Read More →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blog Section */}
      <div className="bg-muted p-8 rounded-xl" data-testid="section-blogs">
        <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Latest Blog Posts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <Card key={index} data-testid={`blog-post-${index}`}>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-3 text-foreground">{post.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{post.summary}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-primary/80 p-0"
                    data-testid={`button-read-blog-${index}`}
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
