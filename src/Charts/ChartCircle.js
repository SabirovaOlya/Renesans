import React, {useState, useEffect} from 'react';
import { RingProgress } from '@ant-design/plots';


function DemoRingProgress({size}){

  const [circle, setCircle] = useState(70)

  useEffect(()=>{
    if(window.innerWidth >= 1600){
      setCircle(100)
    }

  },[])

  const config = {
    height: circle,
    width: circle,
    autoFit: false,
    percent: 0.6212,
    color: ['#5B8FF9', '#E8EDF3'],
  };
  return <RingProgress {...config} />;
}
export default DemoRingProgress