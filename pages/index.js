import Layout from '../components/layout';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Router from 'next/router'

export default class Index extends React.Component {
  state = {
    question: "",
    answers: "",
    submitted: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({submitted: true})
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

  render() {
    return (
      <Layout>
        <h1 className="mt-4 mb-4">New Poll</h1>
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
