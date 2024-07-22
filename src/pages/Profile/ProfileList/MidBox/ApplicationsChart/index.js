import React from 'react';
import './styles.css'
import { Mix } from '@ant-design/plots';

const ApplicationsChart = () => {
    const expectData = [
        {
            value: 100,
            name: 'Applications',
        },
        {
            value: 80,
            name: 'Be reviewed',
        },
        {
            value: 60,
            name: 'Received responses',
        },
        {
            value: 40,
            name: 'Interviews',
        },
        {
            value: 30,
            name: 'Offers',
        },
    ];
    const actualData = [
        {
            value: 80,
            name: 'Applications',
        },
        {
            value: 50,
            name: 'Be reviewed',
        },
        {
            value: 30,
            name: 'Received responses',
        },
        {
            value: 10,
            name: 'Interviews',
        },
        {
            value: 5,
            name: 'Offers',
        },
    ];
    const config = {
        appendPadding: [8, 40, 8, 18],
        syncViewPadding: true,
        meta: {
            value: {
                sync: true,
            },
        },
        tooltip: {
            shared: true,
            showMarkers: false,
            showTitle: false,
        },
        plots: [
            {
                type: 'funnel',
                options: {
                    data: expectData,
                    yField: 'value',
                    xField: 'name',
                    shape: 'pyramid',
                    color: ['#ebedf0', '#c7baff', '#9f85ff', '#7b5fff', '#5839ff'],
                    conversionTag: false,
                    label: {
                        position: 'center',
                        style: {
                            fill: 'rgba(0,0,0,0.65)',
                        },
                        offsetX: 10,
                    },
                    funnelStyle: {
                        fillOpacity: 0.85,
                    },
                },
            },
            {
                type: 'funnel',
                options: {
                    data: actualData,
                    yField: 'value',
                    xField: 'name',
                    shape: 'pyramid',
                    color: ['#ebedf0', '#c7baff', '#9f85ff', '#7b5fff', '#5839ff'],
                    conversionTag: false,
                    label: false,
                    funnelStyle: {
                        lineWidth: 1,
                        stroke: '#fff',
                    },
                },
            },
        ],
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    return <Mix {...config} className="chart-container" />;
};
export default ApplicationsChart;