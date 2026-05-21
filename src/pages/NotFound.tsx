import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 text-foreground">
      <CyberBackground />
      <div className="terminal-window w-full max-w-lg">
        <div className="terminal-bar">
          <span className="terminal-dot bg-red-500/80" />
          <span className="terminal-dot bg-yellow-400/80" />
          <span className="terminal-dot bg-green-500/80" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">error — bash</span>
        </div>
        <div className="space-y-4 p-8 font-mono text-sm">
          <p className="text-muted-foreground">
            <span className="text-neon-green">$</span> cd {location.pathname}
          </p>
          <h1
            className="glitch font-display text-6xl font-extrabold text-foreground"
            data-text="404"
          >
            404
          </h1>
          <p className="text-destructive">
            bash: route not found: {location.pathname}
          </p>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a href="/" className="btn-neon mt-2">
            <Home className="h-4 w-4" /> cd ~/home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
