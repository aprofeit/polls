import Layout from '../../components/layout'
import BackButton from '../../components/BackButton'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Router from 'next/router'
import Link from 'next/link'

class Poll extends React.Component {
  apiHost = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://polls.profeit.com"

  state = {
    optionId: null
  }

  handleSelect = (e) => {
    this.setState({
      optionId: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://polls-api.profeit.com"
    axios.post(
      `${host}/polls/${this.props.poll.token}/poll_responses`,
      { poll_response: { option_id: this.state.optionId } },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(response => {
      Router.push(`/polls/${this.props.poll.token}/results`)
    })
  }

  render() {
    const pollLocation = `${this.apiHost}/polls/${this.props.poll.token}`
    return (
      <Layout>
        <BackButton label="Back" />

        <h1 className="mt-2 mb-2" className="h4">{this.props.poll.question}</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            {this.props.poll.poll_options.map(pollOption => {
              return (
                <Form.Check key={pollOption.id} custom type="radio" id={`option-${pollOption.id}`} label={pollOption.label} name="option_id" value={pollOption.id} onClick={this.handleSelect} />
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
