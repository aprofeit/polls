import Layout from '../../../components/layout'
import BackButton from '../../../components/BackButton'
import axios from 'axios'

export default class Results extends React.Component {
  render() {
    return (
      <Layout>
        <BackButton label="Home" />
        <h1 className="mt-4 mb-4">Thanks {this.props.poll.token}</h1>
      </Layout>
    )
  }
}

export async function getServerSideProps(context) {
  const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://polls-api.profeit.com"
  const response = await axios.get(`${host}/polls/${context.query.token}`)
  return { props: { poll: response.data } }
}
