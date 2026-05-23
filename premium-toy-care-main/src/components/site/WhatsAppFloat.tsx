import { MessageCircle, PhoneCall } from "lucide-react";

const whatsappMessage = encodeURIComponent(
  "Hello MyToysCare, I want to enquire about toy repair/rental service. Please contact me."
);

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:right-6">
      <a
  href="tel:+916204594205"
  aria-label="Call MyToysCare"
  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant transition-transform hover:scale-110 sm:h-14 sm:w-14 relative z-[9999]"
  style={{ pointerEvents: "auto" }}
>
  <PhoneCall className="h-5 w-5 sm:h-6 sm:w-6" />
</a>
      <a
        href={`https://wa.me/916204594205?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant animate-pulse-glow transition-transform hover:scale-110 sm:h-16 sm:w-16"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" />
      </a>
    </div>
  );
}