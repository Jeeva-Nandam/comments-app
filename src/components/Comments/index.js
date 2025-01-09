import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {commentList: [], nameInput: '', textAreaInput: ''}

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }
  onChangeTextInput = event => {
    this.setState({textAreaInput: event.target.value})
  }
  onAddComment = event => {
    event.preventDefault()
    const {nameInput, textAreaInput} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    }`

    const newComments = {
      id: v4(),
      name: nameInput,
      comment: textAreaInput,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComments],
      nameInput: '',
      textAreaInput: '',
    }))
  }
  onToggle = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }
  deleteComment = commentId => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }
  render() {
    const {nameInput, textAreaInput, commentList} = this.state
    return (
      //   <div>
      //     <h1>Comments</h1>
      //     <p>say something about 4.0 Technologies</p>
      //     <form className="flex-align" onSubmit={this.onAddComment}>
      //       <input
      //         type="text"
      //         placeholder="Your Name"
      //         value={nameInput}
      //         onChange={this.onChangeName}
      //       />
      //       <textarea
      //         rows="6"
      //         placeholder="your comment"
      //         value={textAreaInput}
      //         onChange={this.onChangeTextInput}
      //       />
      //       <button type="submit">Add Comment</button>
      //     </form>
      //     <ul>
      // {commentList.map(eachComment => (
      //   <CommentItem
      //     key={eachComment.id}
      //     commentDetails={eachComment}
      //     onToggle={this.onToggle}
      //   />
      // ))}
      //     </ul>
      //   </div>
      // )

      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeName}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={textAreaInput}
                onChange={this.onChangeTextInput}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentList.length}</span>
            Comments
          </p>
          <ul className="comments-list">
            {commentList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                onToggle={this.onToggle}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
