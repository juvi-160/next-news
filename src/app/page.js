import React from 'react'
import LatestNews from './components/LatestNews'
import LatestIndia from './components/LatestIndia'
import LatestWorld from './components/LatestWorld'
import LatestSports from './components/LatestSports'
import LatestBusiness from './components/LatestBusiness'
import Title from './components/Title'


const App = () => {
  return (
  <>
  <div>
    <LatestNews/>
  </div>

  <div className='mb-10 mt-10'>
    <Title title="LATEST INDIA NEWS"/>
    <div>
      <LatestIndia/>
    </div>
  </div>

  <div className='mb-10'>
    <Title title="LATEST WORLD NEWS"/>
    <div>
      <LatestWorld/>
    </div>
  </div>

  <div className='mb-10'>
    <Title title="LATEST SPORTS NEWS"/>
    <div>
      <LatestSports/>
    </div>
  </div>
  <div className='mb-10'>
    <Title title="LATEST BUSINESS NEWS"/>
    <div>
      <LatestBusiness/>
    </div>
  </div>
  
  </>
  )
}

export default App