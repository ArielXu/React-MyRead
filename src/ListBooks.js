import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Books from './Books'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  static PropTypes = {
    showingBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }
  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <Books 
                showingBooks={this.props.books.filter(book => book.shelf === 'currentlyReading')}
                onChangeShelf={(book, shelf) => {
                  this.props.onChangeShelf(book, shelf)
                }}
                />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <Books 
                showingBooks={this.props.books.filter(book => book.shelf === 'wantToRead')}
                onChangeShelf={(book, shelf) => {
                  this.props.onChangeShelf(book, shelf)
                }}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <Books 
                showingBooks={this.props.books.filter(book => book.shelf === 'read')}
                onChangeShelf={(book, shelf) => {
                  this.props.onChangeShelf(book, shelf)
                }}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks