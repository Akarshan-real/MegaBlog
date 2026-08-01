import type { Models } from "appwrite";

export interface AppWriteExtendedTableType extends Models.Row {
  title: string;
  content: string;
  featuredImage: string;
  status: "active" | "inactive";
  userId: string;
}