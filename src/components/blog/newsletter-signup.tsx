import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });

    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-gradient-surface border-primary/10 shadow-blog-md">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated
              </h3>
              <p className="text-muted-foreground">
                Get the latest articles and insights delivered straight to your inbox.
                No spam, unsubscribe at any time.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background border-primary/20 focus:border-primary"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-primary hover:shadow-blog-glow transition-all duration-300 group"
              >
                {isLoading ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Join 1,000+ developers who read our weekly newsletter.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}