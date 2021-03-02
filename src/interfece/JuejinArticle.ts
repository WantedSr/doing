interface JuejinDate{
  iso: Date;
}

interface JuejinAuthor{
  avatar: string;
  url: string;
  username: string;
}

interface JuejinArticle{
  collectionCount: number;
  date: JuejinDate;
  id: string;
  originalUrl: string;
  title: string;
  url: string;
  user: JuejinAuthor;
  viewCount: number;
}