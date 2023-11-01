export interface Cards {
  cards: Card[],
  'packUserId':string,
  'packName':string,
  'packPrivate': boolean,
  'packCreated':string,
  'packUpdated':string,
  'page': number,
  'pageCount': number,
  'cardsTotalCount': number,
  'minGrade': number,
  'maxGrade': number,
  'token': string,
  'tokenDeathTime': number
}

export interface Card {
  _id: string, //
  cardsPack_id: string, //
  user_id: string, //
  question: string, //
  answer: string, //
  grade: number, //
  shots: number,
  comments:string,
  type: string,
  rating: number,
  more_id: string,
  created:string, //
  updated:string, //
  __v: number,
  answerImg?: string,
  answerVideo?: string,
  questionImg?: string,
  questionVideo?: string
}
