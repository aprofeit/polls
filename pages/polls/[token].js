import Layout from '../../components/layout'
import { useRouter } from 'next/router'

const PollWithRouting = (props) => {
  const router = useRouter()
  return <Poll {...props} router={router} />
}

class Poll extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <p>{this.props.router.query.token}</p>
        </div>
      </Layout>
    )
  }
}

export default PollWithRouting
