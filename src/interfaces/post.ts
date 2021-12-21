export interface Post {
  _id: string;
  title: string;
  thumb: string;
  preview: string;
  description: string;
  createDate: string;
  updated?: string;
  creator?: string;
  tags: string[];
  category: string;
}

export interface PostItem {
  id: string;
  title: string;
}
