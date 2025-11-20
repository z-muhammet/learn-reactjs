import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PropTypes from 'prop-types';

function App() {
  return (
    <div style={{width: '100%',height: '100%', display: 'flex', flexDirection: 'column'}}>
      <Header />
      <Main />
    </div>
  )
}

function Header() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '20%', backgroundColor: "gray"}}>
      <header>
        {Demowelcomeh1('Header Section')}
      </header>
    </div>
  )
}

function Demowelcomeh1(part) {
  return <h1>Welcome to jsx props demo // {part}</h1>
  
}

function Main() {
  return (
    <div style={{width: '100%',height: '80%', backgroundColor: "red", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div>
        {Demowelcomeh1('Main Section')}
      </div>
      <div style={{width: '100%',minHeight: '80%',backgroundColor: "red", display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '8px'}}>
        <LeftMenu />
        <div style={{width: '80%',height: '100%',backgroundColor: "yellow", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <ContentList />
        </div>
      </div>

    </div>
  )
}

function LeftMenu() {
  return (
    <div style={{width:'20%',height:'100%',backgroundColor:'blue',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',padding:'8px'}}>
      {Demowelcomeh1('Left Menu Section')}
      {Demowelcomeh1('Left Menu Section')}
      {Demowelcomeh1('Left Menu Section')}
      {Demowelcomeh1('Left Menu Section')}
      
    </div>
  )
}

function Content({ item }) {
  return (
    <div style={{width: '80%',height: '100%',backgroundColor: "yellow", display: 'flex', flexDirection:'column', justifyContent: 'start', alignItems: 'start'}}>
      <h2>{item.title}</h2>
      <p>{item.body}</p>
      <img src={item.image} alt={item.title} style={{width: '10%'}}/>

    </div>
  )
}

function ContentList() {
  const contentItems = [
    {
      "title": "First Content",
      "body": "This is the body of the first content.",
      "image": "/img/1.png"
    },
    {
      "title": "Second Content",
      "body": "This is the body of the second content.",
      "image": "/img/2.png"
    },
    {
      "title": "Third Content",
      "body": "This is the body of the third content.",
      "image": "/img/3.png"
    },
    {
      "title": "Fourth Content",
      "body": "This is the body of the fourth content.",
      "image": "/img/4.png"
    }
  ];
  return (
    contentItems.map((item, index) => (
      <Content key={index} item={item} />
    ))
  ) 
}

Content.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  })
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
