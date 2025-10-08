import GenericCard from "@/components/atomic/GenericCard";
import PillButton from "@/components/atomic/PillButton";
import { personalInfo } from "@/data/portfolio";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission - could integrate with email service
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const message = formData.get("message");
    
    // For now, open default email client
    window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact&body=${message}`;
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="p-3 rounded-lg gradient-primary">
            <Mail className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">
            Get In Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Let's Work Together
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <GenericCard variant="flat" padding="sm">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-foreground hover:text-primary transition-smooth"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </GenericCard>

              <GenericCard variant="flat" padding="sm">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-foreground hover:text-primary transition-smooth"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </GenericCard>

              <GenericCard variant="flat" padding="sm">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">{personalInfo.location}</p>
                  </div>
                </div>
              </GenericCard>
            </div>
          </div>

          {/* Contact Form */}
          <GenericCard variant="elevated">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <PillButton type="submit" variant="gradient" size="lg" className="w-full">
                <Send className="w-5 h-5" />
                Send Message
              </PillButton>
            </form>
          </GenericCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
