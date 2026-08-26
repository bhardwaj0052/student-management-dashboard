export type ActivityType = "created" | "updated" | "deleted";

export interface ActivityChange {
  field: string;
  oldVal: string;
  newVal: string;
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: ActivityType;
  studentName: string;
  timestamp: string;
  changes?: ActivityChange[];
}

const STORAGE_KEY = "student-activity";

const readActivities = (): ActivityLog[] => {
  if (typeof window === "undefined") return [];
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? (JSON.parse(storedData) as ActivityLog[]) : [];
  } catch {
    throw new Error("Unable to read activity logs from storage");
  }
};

export function getActivities(): ActivityLog[] {
  try {
    return readActivities();
  } catch {
    throw new Error("Unable to load activity logs");
  }
}

export function addActivity(
  activity: Omit<ActivityLog, "id" | "timestamp">,
): ActivityLog {
  try {
    const newActivity: ActivityLog = {
      ...activity,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date().toISOString(),
    };
    const activities = [newActivity, ...readActivities()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    return newActivity;
  } catch {
    throw new Error("Unable to save activity log");
  }
}
