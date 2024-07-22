import React, { useState } from 'react';
import './styles.css';
import api from "../../../../../API/BaseURL/BaseURL";

const ContributionCell = ({ contribution, date }) => {
    const [showData, setShowData] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    const handleMouseEnter = (event) => {
        setShowData(true);
        setMousePosition({x: event.clientX, y: event.clientY});
    };

    const handleMouseLeave = () => {
        setShowData(false);
    };

    const getColorClass = (contribution) => {
        if (contribution === 0) return 'color-0';
        if (contribution === 1) return 'color-1';
        if (contribution === 2) return 'color-2';
        if (contribution === 3) return 'color-3';
        if (contribution >= 4) return 'color-4';
        return '';
    };

    return (
        <div
            className={`contribution-cell ${contribution > 0 ? 'has-contributions' : ''} ${getColorClass(
                contribution
            )}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showData && (
                <div className="contribution-data" style={{top: mousePosition.y - 30, left: mousePosition.x}}>
                    <span>{`${contribution} applications on ${date}`}</span>
                </div>
            )}
        </div>
    );
};

const ApplicationsGrid = () => {
    const year = new Date().getFullYear();
    const daysInYear = getDaysInYear(year);
    const contributionsData = generateContributionsData(daysInYear);

    const weeksInYear = Math.ceil(daysInYear / 7); // Calculate the number of weeks

    return (
        <div className="contribution-container">
            <div className="month-labels">
                <div className="month-label">Jan</div>
                <div className="month-label">Feb</div>
                <div className="month-label">Mar</div>
                <div className="month-label">Apr</div>
                <div className="month-label">May</div>
                <div className="month-label">Jun</div>
                <div className="month-label">Jul</div>
                <div className="month-label">Aug</div>
                <div className="month-label">Sep</div>
                <div className="month-label">Oct</div>
                <div className="month-label">Nov</div>
                <div className="month-label">Dec</div>
            </div>

            <div className="grid-container">
                <div className="weekdays">
                    <div className="weekday">Mon</div>
                    <div className="weekday">Wed</div>
                    <div className="weekday">Fri</div>
                </div>
                <div className="contributions-grid">
                    {Array.from({ length: weeksInYear }, (_, weekIndex) => {
                        const startIndex = weekIndex * 7;
                        const endIndex = Math.min(startIndex + 7, daysInYear); // Adjust the end index to avoid displaying dates beyond December 31st

                        return (
                            <div className="contributions-column" key={weekIndex}>
                                {Array.from({ length: endIndex - startIndex }, (_, dayIndex) => {
                                    const index = startIndex + dayIndex;
                                    const contribution = contributionsData[index] || 0;
                                    const date = getDateForIndex(index);

                                    return (
                                        <ContributionCell
                                            contribution={contribution}
                                            date={date}
                                            key={index}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// 获取一年中的天数
const getDaysInYear = (year) => {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return isLeapYear ? 366 : 365;
};

// 给定的贡献数据
const generateContributionsData = (daysInYear) => {
// 这里假设从后端获取的贡献数据存储在 contributionsDataMap 对象中，键为日期，值为贡献数据
    const contributionsDataMap = {
        '6/1/2023': 3,
        '6/2/2023': 2,
        '6/5/2023': 1,
        '6/6/2023': 4,
        '1/1/2023': 10,
// 其他日期的贡献数据...
    };
    // 将 contributionsDataMap 转换为一个长度为 daysInYear 的数组，不足的部分补充默认值 0
    const contributionsData = Array.from({length: daysInYear}, (_, index) => {
        const date = getDateForIndex(index);
        return contributionsDataMap[date] || 0;
    });

    return contributionsData;
}

// const generateContributionsData = (daysInYear) => {
//     let userId = localStorage.getItem('userId');
//     console.log("userId: ", userId);
//     api
//         .post('user/applyRecord/', userId)
//         .then((res) => {
//             if (res.status === 200) {
//                 const contributionsDataMap = res.data;
//                 const contributionsData = Array.from({ length: daysInYear }, (_, index) => {
//                     const date = getDateForIndex(index);
//                     return contributionsDataMap[date] || 0;
//                 });
//
//                 return contributionsData;
//             }
//         })
//         .catch((error) => {
//             console.error('Failed to fetch contributions data:', error);
//             return [];
//         })
// }

// 获取对应索引的日期
const getDateForIndex = (index) => {
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1); // 当年的1月1日
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + index);
    return currentDate.toLocaleDateString();
};

export default ApplicationsGrid;