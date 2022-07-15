// описание типа вопроса по жанру
export type GenreAnswer = {
  src: string;
  genre: string;
};

export type QuestionGenre = {
  answers: GenreAnswer[];
  genre: string;
  type: string;
};
//
// описание типа вопроса по артисту
export type ArtistAnswer = {
  artist: string;
  picture: string;
}

export type Song = {
  artist: string;
  src: string;
}

export type QuestionArtist = {
  answers: ArtistAnswer[];
  type: string;
  song: Song;
}
//

// тип вопроса жанр или артист
export type Question = QuestionGenre | QuestionArtist;

// тип коллекции вопросов [{},{}]
export type Questions = Question[];

// тип ответа по жанру
export type UserGenreQuestionAnswer = readonly boolean[];

// тип ответа по артисту
export type UserArtisQuestionAnswer = string;
