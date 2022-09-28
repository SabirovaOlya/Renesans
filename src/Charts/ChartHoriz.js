import React from 'react';
import { Bar } from '@ant-design/plots';

const DemoBar = () => {
  const data = [
    {
      year: 'Desktops',
      value: 38,
    },
    {
      year: 'iPhones',
      value: 52,
    },
    {
      year: 'Android',
      value: 61,
    },
    {
      year: 'Tables',
      value: 115,
    },
    {
      year: 'Cables',
      value: 48,
    }
  ];
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
