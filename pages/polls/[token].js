import Layout from '../../components/layout'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Router from 'next/router'

class Poll extends React.Component {
  state = {
    answer: null
  }

  handleSelect = (e) => {
    this.setState({
      answer: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://polls-api.profeit.com"
    axios.post(
      `${host}/polls/${this.props.poll.token}/poll_responses`,
      { poll_response: { answer: this.state.answer } },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(response => {
      Router.push(`/polls/${this.props.poll.token}/results`)
    })
  }

  render() {
    const pollLocation = `https://polls.aprofeit.com/polls/${this.props.poll.token}`
    return (
      <Layout>
        <h2 className="mt-4 mb-4">{this.props.poll.question}</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            {this.props.poll.answer_list.map(answer => {
              return (
                <Form.Check custom type="radio" id={`option-${answer}`} label={answer} name="answer" value={answer} onClick={this.handleSelect} />
              )
            })}
          </Form.Group>

          <p>Share <a href={pollLocation}>{pollLocation}</a> with whoever else you want to answer the poll before submitting your own answer if you want any other answers other than you own.</p>

          <Button variant="primary" type="submit">
            Respond
          </Button>
        </Form>
      </Layout>
    )
  }
}

export async function getServerSideProps(context) {
  const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://polls-api.profeit.com"
  const response = await axios.get(`${host}/polls/${context.query.token}`)
  return { props: { poll: response.data } }
}

export default Poll
