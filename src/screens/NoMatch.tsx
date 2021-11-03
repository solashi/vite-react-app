import { Link } from 'react-router-dom'

const NoMatch: React.VFC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

export { NoMatch }
