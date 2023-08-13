import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  Title: string;
  Author: string;
  Publication_Year: number;
  Genre: string;
}

const initialBooks: Book[] = [
  {
    "Title": "Devon",
    "Author": "Heller",
    "Publication_Year": 26,
    "Genre": "fiction"
  },
  {
    "Title": "Nikko",
    "Author": "Dibbert",
    "Publication_Year": 21,
    "Genre": "fiction"
  },
  {
    "Title": "Betty",
    "Author": "Oberbrunner",
    "Publication_Year": 12,
    "Genre": "rom-com"
  },
  {
    "Title": "Nikolas",
    "Author": "Adams",
    "Publication_Year": 0,
    "Genre": "biography"
  },
  {
    "Title": "Stephany",
    "Author": "Schaefer",
    "Publication_Year": 0,
    "Genre": "fiction"
  },
  {
    "Title": "Betty",
    "Author": "Oberbrunner",
    "Publication_Year": 12,
    "Genre": "rom-com"
  },
  {
    "Title": "Nikolas",
    "Author": "Adams",
    "Publication_Year": 0,
    "Genre": "biography"
  },
  {
    "Title": "Stephany",
    "Author": "Schaefer",
    "Publication_Year": 0,
    "Genre": "fiction"
  } , {
    "Title": "Betty",
    "Author": "Oberbrunner",
    "Publication_Year": 12,
    "Genre": "rom-com"
  },
  {
    "Title": "Nikolas",
    "Author": "Adams",
    "Publication_Year": 0,
    "Genre": "biography"
  },
  {
    "Title": "Stephany",
    "Author": "Schaefer",
    "Publication_Year": 0,
    "Genre": "fiction"
  } , {
    "Title": "Betty",
    "Author": "Oberbrunner",
    "Publication_Year": 12,
    "Genre": "rom-com"
  },
  {
    "Title": "Nikolas",
    "Author": "Adams",
    "Publication_Year": 0,
    "Genre": "biography"
  },
  {
    "Title": "Stephany",
    "Author": "Schaefer",
    "Publication_Year": 0,
    "Genre": "fiction"
  }
  , {
    "Title": "Betty",
    "Author": "Oberbrunner",
    "Publication_Year": 12,
    "Genre": "rom-com"
  },
  {
    "Title": "Nikolas",
    "Author": "Adams",
    "Publication_Year": 0,
    "Genre": "biography"
  },
  {
    "Title": "Stephany",
    "Author": "Schaefer",
    "Publication_Year": 0,
    "Genre": "fiction"
  }, {
    "Title": "Betty",
    "Author": "Oberbrunner",
    "Publication_Year": 12,
    "Genre": "rom-com"
  },
  {
    "Title": "Nikolas",
    "Author": "Adams",
    "Publication_Year": 0,
    "Genre": "biography"
  },
  {
    "Title": "Stephany",
    "Author": "Schaefer",
    "Publication_Year": 0,
    "Genre": "fiction"
  }
];

const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState: initialBooks,
  reducers: {
    setBookDetails: (state, action) => {
      state.push(action.payload);
    },
    updateBookDetails: (state, action) => {
      const updatedBook = action.payload;
      console.log('Update Book' , updatedBook)
      const indexToUpdate = state.findIndex(book => book.Title === updatedBook.Title);
      console.log("first", indexToUpdate)
      if (indexToUpdate !== -1) {
        state[indexToUpdate] = updatedBook;
      }
    },
    deleteBook: (state, action) => {
      const indexToDelete = action.payload;
      if (indexToDelete >= 0 && indexToDelete < state.length) {
        state.splice(indexToDelete, 1);
      }
    },
  },
});

export const { setBookDetails, deleteBook , updateBookDetails } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;
