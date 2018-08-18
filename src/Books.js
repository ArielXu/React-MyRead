import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
  static PropTypes = {
    showingBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }
  render () {
    return (
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {this.props.showingBooks.map((book) => (
            <li key={book.id}>
              <div className='book'>
                <div className='book-top'>
                  {book.imageLinks && <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />}
                  <div className='book-shelf-changer'>
                    <select 
                      value={book.shelf}
                      onChange={(event) => {this.props.onChangeShelf(book, event.target.value)}}
                    >
                      <option value='none' disabled>Move to...</option>
                      <option value='none'>None</option>
                      <option value='currentlyReading'>Currently Reading</option>
                      <option value='wantToRead'>Want to Read</option>
                      <option value='read'>Read</option>
                    </select>
                  </div>
                </div>
                <div className='book-title'>{book.title}</div>
                {book.author && <div className='book-authors'>{book.author}</div>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Books
