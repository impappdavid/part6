import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { appendAnecdoteVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, vote}) => (
    <div >
        <div>{anecdote.content}</div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
        </div>
    </div>
)

const AnecdoteList = () => {

    const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL' || !filter) {
      return anecdotes
    }
    
    return anecdotes.filter(a => 
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
  dispatch(appendAnecdoteVote(anecdote))

  dispatch(setNotification(`you voted '${anecdote.content}'`))
    
  setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return(
        <>
        {sortedAnecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
        </>
    )
}

export default AnecdoteList