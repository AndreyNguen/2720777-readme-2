export enum PostStatus {
  Draft = 'draft',
  Published = 'published',
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
}
