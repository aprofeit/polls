import Layout from '../components/layout';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Router from 'next/router'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import Link from 'next/link'
import PollList from '../components/PollList'

export default class Index extends React.Component {
  state = {
    question: "",
    answers: "",
    submitted: false,
    recentPolls: null
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({submitted: true})

    const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://polls-api.profeit.com"

    axios.post(
      `${host}/polls`,
      { poll: { question: this.state.question, answers: this.state.answers } },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(function(response) {
      Router.push(`/polls/${response.data.token}`)
    })
  }

  handleQuestionChange = (e) => {
    this.setState({
      question: e.target.value
    })
  }

  handlePollOptionsChange = (e) => {
    this.setState({
      answers: e.target.value
    })
  }

  componentDidMount = () => {
    const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://polls-api.profeit.com"
    axios.get(
      `${host}/polls`,
      { heaaders: { 'Content-Type': 'application/json' } }
    ).then(response => (
      this.setState({
        recentPolls: response.data.polls
      })
    ))
  }

  render() {
    return (
      <Layout>
        <h4 className="mt-4 mb-1">Recent</h4>
        {this.state.recentPolls ? <PollList polls={this.state.recentPolls} /> : <Spinner animation="border" size="sm" className="mb-3" />}

        <h4 className="mb-3">New</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="pollQuestion">
            <Form.Label hidden>Question</Form.Label>
            <Form.Control type="text" placeholder="Question" value={this.state.question} onChange={this.handleQuestionChange} required />
          </Form.Group>

          <Form.Group controlId="pollOptions">
            <Form.Label hidden>Options</Form.Label>
            <Form.Control type="text" placeholder="Answers" value={this.state.answers} onChange={this.handlePollOptionsChange} required />
            <Form.Text className="font-weight-lighter">Enter the potential answers seperated by commas. For example: "Red, blue, green" would create "Red", "blue", and "green" as three options for the poll.</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={this.state.submitted}>
            Create {this.state.submitted && <Spinner animation="border" size="sm" />}
          </Button>
        </Form>
      </Layout>
    );
  }
}
