import React from 'react';
import { Bar } from '@ant-design/plots';

const DemoBar = ({products}) => {
  
  const data = [];
  products?.map(item =>{
    data.push({
      year:item?.name,
      value:item?.order_count
    })
  })
  const config = {
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
  };
  return <Bar {...config} />;
};

export default DemoBar;
