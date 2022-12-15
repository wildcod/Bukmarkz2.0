import React, {useMemo, useState} from 'react';
import s from './Statistics.module.scss'
import {PieChart} from "react-minimal-pie-chart";
import {Link} from "react-router-dom";

const Statistics = ({
  categories,
  bookmarks
}) => {
    const [chartData, chartLabels] = useMemo(() => {
        let data = []
        let labels = []
        if(!categories || !categories.length){
            return [data, labels]
        }
        categories.forEach((obj) => {
            let randomColor = "#000000".replace(/0/g, function () {
                return (~~(Math.random() * 16)).toString(16);
            });

            let value = bookmarks.filter((book) => book.category === obj.id).length;

            if (value > 0){
                let insert = {
                    color: randomColor,
                    value: value,
                };
                labels.push({
                    color: randomColor,
                    title: obj.title
                })
                data.push(insert);
            }
        });
        return [data, labels]
    }, [categories, bookmarks])

    const renderRows = useMemo(() => {
        return categories.map((category) => {
            let noBookmarks = bookmarks.filter((book) => book.category === category.id).length;
            let totalBookmarks = bookmarks.length;
            let percentage = (noBookmarks/totalBookmarks).toFixed(2) * 100;
            return (

                <tr key={`group-${category.id}`}>
                    <td>{category.title}</td>
                    <td>{noBookmarks}</td>
                    <td>{percentage}%</td>
                </tr>
            );
        });
    }, [categories, bookmarks])

    return (
        <div className={s.container}>
            {
                chartData && chartData.length ?
                    <div className={s.main}>
                        <div className={s.top}>
                            <div className={s.chart}>
                                <PieChart
                                    animate
                                    animationDuration={500}
                                    animationEasing="ease-out"
                                    center={[50, 50]}
                                    data={chartData}
                                    lengthAngle={360}
                                    lineWidth={50}
                                    paddingAngle={5}
                                    radius={40}
                                    totalValue ={bookmarks.length}
                                    startAngle={5}
                                    viewBoxSize={[100, 100]}
                                    label={(data) => data.dataEntry.title}
                                    labelPosition={65}
                                    labelStyle={{
                                        fontSize: "10px",
                                        fontColor: "FFFFFA",
                                        fontWeight: "800",
                                    }}
                                />
                            </div>
                            <div className={s.labels}>
                                <ul>
                                    {
                                        chartLabels.map(label => (
                                            <li style={{color: label.color}}>
                                                {label.title}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={s.table}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Bookmarks</th>
                                    <th>Percentage</th>
                                </tr>
                                </thead>
                                <tbody>{renderRows}</tbody>
                            </table>
                        </div>
                    </div> :
                    <div className={s.empty}>
                        <span>No bookmarks stored</span>
                        <Link to={'/dashboard'}>
                            START NOW!
                        </Link>
                    </div>
            }
        </div>
    );
};

export default Statistics;
