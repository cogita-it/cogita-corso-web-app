import { useEffect, useState } from "react";
import "./Home.css"

function Home() {
  let sentences = [
    "Con ./cogita Chat potrai rimanere in contatto con i tuoi amici in tempo reale",
    "La chat facile e veloce per scambiare informazioni in sicurezza",
    "La migliore app per parlare con persone lontane nel mondo"
  ]

  const [sentenceIndex, setSentenceIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() =>
      setSentenceIndex(index => index < sentences.length - 1 ? index + 1 : 0),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>La chat veloce e sicura per tutti</h1>
        <p>{sentences[sentenceIndex]}</p>
        <button>Inizia subito</button>
        <div className='header-img-container'>
          <img src="./header-girl-texting.jpg" alt="" />
          <img src="./header-people-talking.jpg" alt="" />
        </div>
      </header>
      <div className='features-section'>
        <h2>Le features</h2>
        <div className='feature-list-container'>
          <div className='feature-box'>
            <h3>Sicuro e Veloce</h3>
            <p>Rimani in contatto con i tuoi amici in maniera rapida e veloce. Tutto sincronizzato in tempo reale</p>
          </div>
          <div className='feature-box'>
            <h3>Sicuro e Veloce</h3>
            <p>Rimani in contatto con i tuoi amici in maniera rapida e veloce. Tutto sincronizzato in tempo reale</p>
          </div>
          <div className='feature-box'>
            <h3>Sicuro e Veloce</h3>
            <p>Rimani in contatto con i tuoi amici in maniera rapida e veloce. Tutto sincronizzato in tempo reale</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;