interface Bookmark {
  children: BookTag[];
  dateAdded: number;
  id: string;
  title: string;
}
interface BookTag {
  dateAdded: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
  url?: string;
  dateGroupModified?: number;
  children?: BookTag[];
}