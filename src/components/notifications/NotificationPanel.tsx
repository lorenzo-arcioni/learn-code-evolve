import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "Nuovo corso disponibile",
    message: "È disponibile il nuovo corso su Machine Learning!",
    time: "2 ore fa"
  },
  {
    id: 2,
    title: "Completamento lezione",
    message: "Hai completato la lezione su K-Nearest Neighbors",
    time: "1 giorno fa"
  },
  {
    id: 3,
    title: "Offerta speciale",
    message: "Sconto del 20% su tutti i corsi questa settimana",
    time: "2 giorni fa"
  }
];

export const NotificationPanel = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <ScrollArea className="h-80">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium">Notifiche</h4>
            {notifications.map((notification) => (
              <div key={notification.id} className="mb-4 border-b pb-4 last:border-0 last:pb-0">
                <h5 className="text-sm font-medium">{notification.title}</h5>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};