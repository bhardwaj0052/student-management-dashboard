import { EventData } from "@/src/components/eventform/eventCard";
import { EventFormData } from "@/src/components/eventform/eventForm";

const STORAGE_KEY = "eventdata";

const readEvents = (): EventData[] => {
  if (typeof window === "undefined") return [];
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData
      ? (JSON.parse(storedData) as Array<Partial<EventData>>).map((event) => ({
          ...event,
          location: event.location ?? "",
        } as EventData))
      : [];
  } catch {
    return [];
  }
};

const writeEvents = (events: EventData[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export function getEvents(): EventData[] {
  return readEvents();
}

export function createEvent(data: EventFormData): EventData {
  const event = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, ...data };
  writeEvents([...readEvents(), event]);
  return event;
}

export function updateEvent(id: EventData["id"], data: EventFormData): EventData {
  const event = { id, ...data };
  writeEvents(readEvents().map((storedEvent) => storedEvent.id === id ? event : storedEvent));
  return event;
}

export function deleteEvent(id: EventData["id"]): void {
  writeEvents(readEvents().filter((event) => event.id !== id));
}