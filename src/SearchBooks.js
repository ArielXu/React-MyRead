import React, { Component } from 'react'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static PropTypes = {
    onChangeShelf: PropTypes.func.isRequired,
  }
  state = {
    query: '',
    searchResult: [],
    myBooks: [],
    isValidSearch: true,
  }
  searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({myBooks: books})
      })
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
      isValidSearch: this.searchTerms.includes(query)
    }))
  }

  updateBookShelf = (myBooksData, newResults) => {
    const mergedBooks = newResults.map((book) => {
      myBooksData.forEach((myBook) => {
        if (myBook.id === book.id) {
          book.shelf = myBook.shelf
        }
      })
      return book
    })
    return mergedBooks
  }


  updateSearchResult = (query) => {
    const str = query.trim()
    this.updateQuery(str)
    let that = this
    ;((str !== '') && (
      BooksAPI.search(str)
      .then((books) => {
        that.setState(() => ({
          searchResult: books
        }))
      })
      .then((books) => {
        const myBooks = that.state.myBooks
        const searchedBooks = that.state.searchResult
        const results = that.updateBookShelf(myBooks, searchedBooks)
        that.setState(() => ({
          searchResult: results
        }))
      })
    ))
  }

  render () {
    let that = this
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            className="close-search"
            to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search by title or author"
                   value={this.state.query}
                   onChange={(event) => this.updateSearchResult(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          {(this.state.query !== '') &&
            (<Books 
              className="books-grid"
              showingBooks={this.state.searchResult} 
              onChangeShelf={(book, shelf) => {
                this.props.onChangeShelf(book, shelf)
              }}
            />) 
          }
        </div>
      </div>
    )
  }
}
export default SearchBooks
