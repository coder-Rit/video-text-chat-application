import "./style.css";

const Page404 = () => {
  return (
    <main className="bsod badcontainer">
    <h1 className="neg title"><span className="bg">Error Page Not Found - 404</span></h1>
    <p>An error has occured, to continue:</p>
    <p>* Return to our homepage.<br />
    * Send us an e-mail about this error and try later.</p>
    <nav className="nav">
      <a href="/" className="link">Return to homepage</a>
    </nav>
  </main>
  )
}

export default Page404