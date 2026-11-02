export enum MediaType {
  Video = 'video',
  Audio = 'audio',
  Image = 'image',
  File = 'file',
}

export interface Media {
  id: string;
  type: MediaType;
  url: string;
  filename: string;
  size: number;
  createdAt: Date;
}
