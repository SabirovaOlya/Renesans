import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';

const DemoDualAxes = ({array}) => {
  const [uvBillData, setUvBillData] = useState([])
  let acceptedList =[]
  let deniedList =[]
  
  function GetInfo(){
    array?.pop()
    array?.map(item =>{
      acceptedList.push({
        time:item?.date,
        value:item?.accepted,
        type:'Tasdiqlangan'
      })
      deniedList.push({
        time:item?.date,
        value:item?.denied,
        type:'Rad etilgan'
      })
    })
    setUvBillData(uvBillData.concat(acceptedList, deniedList)) 
  }

  useEffect(()=>{
    GetInfo()
  },[])

  const transformData = [
    
  ];
  const config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }
          
          return {
            opacity: 0.5,
          };
        },
      },
    ],
    colorField: 'type',
    color:['#19CDD7','#DDB27C'],
  };
  return <DualAxes {...config} />;
};

export default DemoDualAxes;