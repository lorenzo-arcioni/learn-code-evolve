
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-primary-foreground font-bold">ML</span>
          </div>
          <span className="font-bold text-xl">ML Learn</span>
        </Link>

        {isMobile ? (
          <MobileNav />
        ) : (
          <nav className="flex items-center gap-6">
            <Link to="/theory" className="nav-link">
              Theory
            </Link>
            <Link to="/practice" className="nav-link">
              Practice
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Button asChild variant="secondary" className="ml-4">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <SheetClose asChild>
            <Link to="/theory" className="nav-link">
              Theory
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to="/practice" className="nav-link">
              Practice
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="secondary" className="w-full mt-4">
              <Link to="/login">Log in</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild className="w-full mt-2">
              <Link to="/signup">Sign up</Link>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Header;
