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
  return <h1>Welcome to jsx expression demo // {part}</h1>
  
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
          <ContentCreator pieces={6} />
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

function Content({ parts }) {
  return (
    <div style={{width: '80%',height: '100%',backgroundColor: "yellow", display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
      {Demowelcomeh1('Content Section ' + parts)}
    </div>
  )
}
function ContentCreator({ pieces }) {
  const items = [];
  for (let i = 0; i < pieces; i++) {
    items.push(<Content key={i} parts={i} />);
  }
  return <>{items}</>;
}

Content.propTypes = {
    parts: PropTypes.number.isRequired 
};

ContentCreator.propTypes = {
    pieces: PropTypes.number.isRequired 
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
