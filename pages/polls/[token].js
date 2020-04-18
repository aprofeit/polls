import Layout from '../../components/layout'
import axios from 'axios'

class Poll extends React.Component {
  render() {
    console.log(this.props.poll)
    return (
      <Layout>

        <h2 className="mt-4 mb-4">{this.props.poll.question}</h2>

        <div className="mb-3">
          <code>
            {this.props.poll.answer_list.map(function(answer) {
              return (<li>{answer}</li>)
            })}
          </code>
        </div>
        <p className="font-weight-lighter">This is where you'd normally choose an answer. But this isn't done.</p>
      </Layout>
    )
  }
}

export async function getServerSideProps(context) {
  const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://stocks-api.profeit.com"
  const response = await axios.get(`${host}/polls/${context.query.token}`)
  return { props: { poll: response.data } }
}

export default Poll
