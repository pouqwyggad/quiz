export interface Packs {
  cardPacks: Pack[]
  page: number,
  pageCount: number,
  cardPacksTotalCount: number,
  minCardsCount: number,
  maxCardsCount: number,
  token: string
  tokenDeathTime: number
}

export interface Pack {
  _id: string,
  user_id: string,
  user_name: string,
  name: string,
  private: boolean,
  path:string,
  grade: number,
  shots: number,
  cardsCount: number,
  deckCover: string,
  type: string,
  rating: number,
  more_id: string,
  created: string,
  updated: string,
  __v: number
}
