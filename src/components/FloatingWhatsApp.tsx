import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a href="#" className="fixed bottom-8 right-8 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition z-50">
      <MessageCircle className="w-8 h-8" />
    </a>
  );
}
