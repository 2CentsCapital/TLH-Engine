import { JargonProvider } from "@/components/answers/JargonContext";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function FundsLayout({ children }: { children: React.ReactNode }) {
  return (
    <JargonProvider>
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
    </JargonProvider>
  );
}
