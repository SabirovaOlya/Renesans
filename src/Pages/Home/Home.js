import React,{useState, useEffect} from 'react'
import DemoDualAxes from '../../Charts/ChartBar'
import DemoBar from '../../Charts/ChartHoriz.js'
import DemoRingProgress from '../../Charts/ChartCircle'

import './Home.css'
function Home() {

  const [pieSize, setPieSize] = useState(80);
  
  useEffect(()=>{
    if(window.innerWidth >= 1600){
      setPieSize(100)
    }

  },[])
 

  return (
    <section >

    <div className='little-statistics'>
      {/* first */}
      <div className='circle-total'>
        <div className='circle_total_parts'>
          <div className='total-part'>
            <p className='price-total'>
              $34,152
            </p>
            <p className='total-text'>
              Total Revenue
            </p>
          </div>
          <div className='total-part-circle-blue'>
            <i className='bx bx-bar-chart'></i>
          </div>
        </div>
        <div className='total-end'>
          <p className='total-end-text-green'>
            <span><i className='bx bx-up-arrow-alt'></i> 2.65%</span> since last week
          </p>
        </div>
      </div>

      {/* second */}
      <div className='circle-total'>
        <div className='circle_total_parts'>
          <div className='total-part'>
            <p className='price-total'>
              5,643
            </p>
            <p className='total-text'>
              Orders
            </p>
          </div>
          <div className='total-part-circle-pie'>
            <DemoRingProgress size={pieSize}/>
          </div>
        </div>
        <div className='total-end'>
          <p className='total-end-text-red'>
            <span><i className='bx bx-down-arrow-alt'></i> 0.82%</span> since last week
          </p>
        </div>
      </div>

      {/* third */}
      <div className='circle-total'>
        <div className='circle_total_parts'>
          <div className='total-part'>
            <p className='price-total'>
              45,254
            </p>
            <p className='total-text'>
              Customers
            </p>
          </div>
          <div className='total-part-circle-pie'>
            <DemoRingProgress size={pieSize}/>
          </div>
        </div>
        <div className='total-end'>
          <p className='total-end-text-red'>
            <span><i className='bx bx-down-arrow-alt'></i> 6.24%</span> since last week
          </p>
        </div>
      </div>

      {/* fourth */}
      <div className='circle-total'>
        <div className='circle_total_parts'>
          <div className='total-part'>
            <p className='price-total'>
              +12.58%
            </p>
            <p className='total-text'>
              Growth
            </p>
          </div>
          <div className='total-part-circle-yellow'>
            <i className='bx bx-bar-chart'></i>
          </div>
        </div>
        <div className='total-end'>
          <p className='total-end-text-green'>
            <span><i className='bx bx-up-arrow-alt'></i> 10.51%</span> since last week
          </p>
        </div>
      </div>

    </div>
    
    <div className='big-statistics'>
      <div className='barChart'>
        <DemoDualAxes></DemoDualAxes>
      </div>
      
      <div className='horizChart'>
        <DemoBar></DemoBar>
      </div>
    </div>
    </section>
  )
}


export default Home