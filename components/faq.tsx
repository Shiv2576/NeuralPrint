import { BadgeDollarSign, Route, Truck } from "lucide-react";
import Globe from "./ui/globe";

const FAQ = () => {
  return (
    <div id="faq" className="w-full py-12 xs:py-20 px-6">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Quick answers to common questions about our products and services.
        </p>

        {/* Grid Container */}
        <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Box 1: Globe with Overlay Text */}
          <div className="lg:row-span-2 border p-4 rounded-lg shadow-sm flex items-center justify-center min-h-[420px] bg-background relative">
            <Globe className="-m-4 w-[calc(100%+3rem)] h-[calc(100%+3rem)]" />
            <h3 className="absolute top-10 text-center z-10 font-light text-2xl md:text-3xl tracking-wide leading-snug text-foreground">
              Global Reach
              <br />
              Local Impact
            </h3>
          </div>

          {/* Box 2: Tracking */}
          <div className="border p-6 rounded-lg shadow-sm bg-background">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/30">
              <Route className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="mt-4 mb-3 text-xl font-semibold tracking-tight text-foreground">
              How do I track my order?
            </h4>
            <p className="text-base text-muted-foreground">
              Track your order using the link provided in your confirmation
              email, or log into your account to view tracking details.
            </p>
          </div>

          {/* Box 3: International Shipping */}
          <div className="border p-6 rounded-lg shadow-sm bg-background">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30">
              <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="mt-4 mb-3 text-xl font-semibold tracking-tight text-foreground">
              Do you ship internationally?
            </h4>
            <p className="text-base text-muted-foreground">
              Yes, we ship worldwide. Shipping fees and delivery times vary by
              location, and customs duties may apply for some countries.
            </p>
          </div>

          {/* Box 4: Payment Methods */}
          <div className="sm:col-span-2 border p-6 rounded-lg bg-background shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/30">
              <BadgeDollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h4 className="mt-4 mb-3 text-xl font-semibold tracking-tight text-foreground">
              What payment methods do you accept?
            </h4>
            <p className="text-base text-muted-foreground">
              We accept Visa, MasterCard, American Express, PayPal, Apple Pay,
              and Google Pay, ensuring secure payment options for all customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
