import Head from 'next/head'

const Layout = props => {
  return (
    <div>
      <Head>
        <script src="https://kit.fontawesome.com/f65374cc08.js" crossOrigin="anonymous"></script>
      </Head>
      <div className="container fluid pt-3">
        {props.children}
      </div>
    </div>
  )
};

export default Layout;
