import Layout from '../../../components/layout'
import BackButton from '../../../components/BackButton'

export default class Results extends React.Component {
  render() {
    return (
      <Layout>
        <BackButton label="Home" />
        <h1 className="mt-4 mb-4">Thanks</h1>
      </Layout>
    )
  }
}
