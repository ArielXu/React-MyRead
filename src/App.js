import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooksData = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  componentDidMount() {
    this.getBooksData()
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.getBooksData()
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={(book, shelf) => {
              this.changeShelf(book, shelf)
            }}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            myBooks={this.state.books}
            onChangeShelf={(book, shelf) => {
              this.changeShelf(book, shelf)
            }} 
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
