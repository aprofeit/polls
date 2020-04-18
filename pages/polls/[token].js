import Layout from '../../components/layout'
import axios from 'axios'

class Poll extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <p>{this.props.poll.question}</p>
          <p>{this.props.poll.answer_list}</p>
        </div>
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
