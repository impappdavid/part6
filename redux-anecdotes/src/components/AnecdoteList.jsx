import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, vote}) => (
    <div >
        <div>{anecdote.content}</div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
    </div>
)

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)

    const dispatch = useDispatch()

    const vote = id => {
      dispatch(addVote(id))
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