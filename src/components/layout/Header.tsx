import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { authApi } from "@/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, Settings, LogOut } from "lucide-react";
import { NotificationPanel } from '../notifications/NotificationPanel';

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ml_academy_token");
    if (token) {
      setIsLoading(true);
      authApi.getCurrentUser()
        .then(u => setUser(u))
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="rounded-md h-12 w-12" />
          <span className="font-bold text-xl">Machine Learn</span>
        </Link>

        {isMobile ? (
          <MobileNav user={user} isLoading={isLoading} handleLogout={handleLogout} />
        ) : (
          <DesktopNav user={user} isLoading={isLoading} handleLogout={handleLogout} />
        )}
      </div>
    </header>
  );
};

const DesktopNav = ({
  user,
  isLoading,
  handleLogout,
}: {
  user: any;
  isLoading: boolean;
  handleLogout: () => void;
}) => {
  return (
    <nav className="flex items-center gap-6">
      <Link to="/theory" className="nav-link">
        Theory
      </Link>
      <Link to="/practice" className="nav-link">
        Practice
      </Link>
      <Link to="/leaderboard" className="nav-link">
        Leaderboard
      </Link>
      <Link to="/courses" className="nav-link">
        Courses
      </Link>
      <Link to="/shop" className="nav-link">
        Shop
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>

      <div className="min-w-[120px] flex items-center justify-end ml-4">
        {isLoading ? (
          <div className="w-full h-9 bg-gray-200 animate-pulse rounded-md"></div>
        ) : user ? (
          <div className="flex items-center gap-4">
            <NotificationPanel />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-0 h-9 w-9 overflow-hidden"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={
                        user.avatar_url
                          ? `http://localhost:8000${user.avatar_url}`
                          : undefined
                      }
                    />
                    <AvatarFallback>
                      {user.username
                        ? user.username.charAt(0).toUpperCase()
                        : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="end">
                <div className="p-2 border-b mb-2">
                  <p className="font-medium">{user.full_name || user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="grid gap-1">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/profile?tab=settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

const MobileNav = ({ user, isLoading, handleLogout }: { user: any, isLoading: boolean, handleLogout: () => void }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          {user && (
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b">
              <NotificationPanel />
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar_url ? `http://localhost:8000${user.avatar_url}` : undefined} />
                <AvatarFallback>
                  {user.username ? user.username.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.full_name || user.username}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}
          
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
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to="/shop" className="nav-link">
              Shop
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </SheetClose>
          
          {isLoading ? (
            <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md mt-4"></div>
          ) : user ? (
            <>
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full mt-2 justify-start">
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full mt-2 justify-start">
                  <Link to="/profile?tab=settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button 
                  variant="destructive" 
                  className="w-full mt-2" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </SheetClose>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Header;
