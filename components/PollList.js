import ListGroup from 'react-bootstrap/ListGroup'
import Link from 'next/link'

export default function PollList ({polls}) {
  return (
    <ListGroup variant="flush" className="mb-4">
    {polls.map(poll => {
      return (
        <Link href="/polls/[token]" as={`/polls/${poll.token}`} passHref>
        <ListGroup.Item action>{poll.question}</ListGroup.Item>
        </Link>
      )
    })}
    </ListGroup>
  )
}
