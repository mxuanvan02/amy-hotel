import { StaticPage } from "@/components/layout/StaticPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p className="lead text-xl mb-12">
        We'd love to hear from you. Whether you have a question about a booking,
        feedback on your stay, or just want to say hello, our team is ready to
        assist.
      </p>

      <div className="grid gap-12 md:grid-cols-2 not-prose">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--color-secondary)] mt-1" />
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-[var(--color-muted)]">
                    123 Vo Nguyen Giap, Son Tra, Da Nang, Vietnam
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--color-secondary)]" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href="tel:+84123456789"
                    className="text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                  >
                    +84 123 456 789
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--color-secondary)]" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:info@amyaccommodation.com"
                    className="text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                  >
                    info@amyaccommodation.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
              Business Hours
            </h3>
            <p className="text-[var(--color-muted)]">
              Monday - Friday: 8:00 AM - 6:00 PM
            </p>
            <p className="text-[var(--color-muted)]">
              Saturday - Sunday: 9:00 AM - 5:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-6">
            Send us a Message
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Write your message here..."
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </StaticPage>
  );
}
