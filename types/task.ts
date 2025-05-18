/** Task data structure used throughout the app */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  /** The content/description of the task */
  text: string;
  /** Whether the task has been completed */
  completed: boolean;
} 