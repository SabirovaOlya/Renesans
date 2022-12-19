import React,{useState, useEffect} from 'react'
import DemoDualAxes from '../../Charts/ChartBar'
import DemoBar from '../../Charts/ChartHoriz.js'
import DemoRingProgress from '../../Charts/ChartCircle'
import DemoRingProgress2 from '../../Charts/ChartCircle2'
import https from '../../assets/https'

import './Home.css'
function Home() {

  const [pieSize, setPieSize] = useState(80);
  const [statisticInfo, setStatisticInfo] = useState({})
  
  useEffect(()=>{
    if(window.innerWidth >= 1600){
      setPieSize(100)
    }
    https
    .get('/statistics')
    .then(res =>{
      setStatisticInfo(res?.data)
    })
    .catch(err =>{
      console.log(err)
    })
  },[])

  return (
    <section >
    <div className='little-statistics'>
      {/* first */}
      <div className='circle-total'>
        <div className='circle_total_parts'>
          <div className='total-part'>
            <p className='price-total'>
              {((statisticInfo?.first?.total_revenue)/1000000).toFixed(2)} mln so'm
            </p>
            <p className='total-text'>
              Portfel
            </p>
          </div>
          <div className='total-part-circle-blue'>
            <i className='bx bx-bar-chart'></i>
          </div>
        </div>
        <div className='total-end'>
          <p className='total-end-text-green'>
            <span><i className='bx bx-up-arrow-alt'></i>{statisticInfo?.first?.changedTR}%</span>o'tgan haftaga ko'ra
          </p>
        </div>
      </div>

      {/* second */}
      <div className='circle-total'>
        <div className='circle_total_parts'>
          <div className='total-part'>
            <p className='price-total'>
              {statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.lastWeek} dona
            </p>
            <p className='total-text'>
              Buyurtma
            </p>
          </div>
          <div className='total-part-circle-pie'>
            <DemoRingProgress procent={(statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.lastWeek/statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all).toFixed(2)} size={pieSize}/>
          </div>
        </div>
        <div className='total-end'>
          <p className='total-end-text-red'>
            <span><i className='bx bx-down-arrow-alt'></i> {(statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.lastWeek/statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all).toFixed(2)}%</span>o'tgan haftaga ko'ra
          </p>
        </div>
      </div>

      {/* third */}
      <div className='circle-total'>
        <div className='circle_total_parts'>
          <div className='total-part'>
            <p className='price-total'>
              {statisticInfo?.clients?.lastWeek} {statisticInfo?.clients?.lastWeek == 1 ? 'klient' : 'klientlar'}
            </p>
            <p className='total-text'>
              Klient
            </p>
          </div>
          <div className='total-part-circle-pie'>
            <DemoRingProgress2 procent={(statisticInfo?.clients?.lastWeek/statisticInfo?.clients?.all).toFixed(2)} size={pieSize}/>
          </div>
        </div>
        <div className='total-end'>
          <p className='total-end-text-red'>
            <span><i className='bx bx-down-arrow-alt'></i>{(statisticInfo?.clients?.lastWeek/statisticInfo?.clients?.all).toFixed(2)}%</span>o'tgan haftaga ko'ra
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
            <span><i className='bx bx-up-arrow-alt'></i> 10.51%</span>o'tgan haftaga ko'ra
          </p>
        </div>
      </div>

    </div>
    
    <div className='big-statistics'>
      <div className='barChart'>
        {statisticInfo?.orders ? (<DemoDualAxes array={statisticInfo?.orders}></DemoDualAxes>) : <></>}
      </div>
      
      <div className='horizChart'>
        <DemoBar products={statisticInfo?.products}></DemoBar>
      </div>
    </div>
    </section>
  )
}


export default Home