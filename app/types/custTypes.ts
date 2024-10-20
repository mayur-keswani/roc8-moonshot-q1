export type EmailType = {
  "id": string,
  "from": {
    "email": string,
    "name": string
  },
  "date": number,
  "subject": string,
  "short_description": string,
  body?:TrustedHTML,
  isRead?:boolean,
  isFavorite?:boolean
};

export enum EmailFilterType {
  "ALL" = "all",
  "UNREAD" = "unread",
  "READ" = "read",
  "FAVORITE" = "favorite",
}
