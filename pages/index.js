import Layout from '../components/layout';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Index() {
  return (
    <Layout>
      <h1 class="mt-4 mb-4">New Poll</h1>
      <Form>
        <Form.Group controlId="pollQuestion">
          <Form.Label hidden>Question</Form.Label>
          <Form.Control type="text" placeholder="Poll Question" />
        </Form.Group>

        <Form.Group controlId="pollOptions">
          <Form.Label hidden>?Options</Form.Label>
          <Form.Control type="text" placeholder="Answers" />
          <Form.Text className="font-weight-lighter">Enter the potential answers seperated by commas. Example: "Red, blue, green."</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
}
