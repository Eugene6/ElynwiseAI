import { motion } from "framer-motion";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background text-foreground">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-light tracking-tight text-foreground/50">404</h1>
        <div className="w-8 h-[1px] bg-border my-6" />
        <Link href="/" className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase">
          Return
        </Link>
      </motion.div>
    </div>
  );
}