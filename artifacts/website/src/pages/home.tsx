import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/20">
      {/* Minimal Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-8 py-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 transition-colors duration-700 group-hover:bg-primary" />
          <span className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground transition-colors duration-700 group-hover:text-foreground">
            Blank Canvas
          </span>
        </div>
      </motion.header>

      {/* Main Empty Space */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Very subtle architectural texture/grid in the background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Subtle dot pattern mimicking paper texture/structural grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_1%)] opacity-[0.03] bg-[length:32px_32px]" />
          
          {/* Soft vignette to focus the center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_80%)]" />
        </motion.div>
      </main>
    </div>
  );
}
