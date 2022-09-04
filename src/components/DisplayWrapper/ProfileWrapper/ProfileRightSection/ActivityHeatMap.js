import React from "react";
import "./ActivityHeatMap.css";
import { Heatmap } from "contribution-heatmap";
import { useDispatch, useSelector } from "react-redux";
import Plot from "react-plotly.js";

const ActivityHeatMap = () => {
  let received = useSelector((state) => state.userContributionReducer.data);
  // let user = { ...received.data };
  console.log(received.data);
  // console.log(Object.keys(response).length !== 0);
  const dispatch = useDispatch();
  const dailyContribution = new Array(364).fill(0);

  let count = 0;

  // if (Object.keys(response).length !== 0) {
  //   for (let i = 0; i < response.contributionCalendar.weeks.length; i++) {
  //     for (
  //       let j = 0;
  //       j < response.contributionCalendar.weeks[i].contributionDays.length;
  //       j++
  //     ) {
  //       dailyContribution[count++] =
  //         response.contributionCalendar.weeks[i].contributionDays[
  //           j
  //         ].contributionCount;
  //     }
  //   }
  // }

  //heatmap

  //date

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  Date.prototype.minusDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
  };

  function getDates(startDate, stopDate) {
    let mm, dd, yyyy;

    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      mm = String(new Date(currentDate).getMonth() + 1).padStart(2, "0"); //January is 0!
      dd = String(new Date(currentDate).getDate()).padStart(2, "0");
      yyyy = new Date(currentDate).getFullYear();
      dateArray.push(yyyy + "-" + mm + "-" + dd);

      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  var dateRange = getDates(new Date().minusDays(363), new Date());
  console.log(dateRange);

  var xValues = ["A", "B", "C", "D", "E"];

  // var yValues = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var yValues = [
    "Saturday",
    "Friday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Monday",
    "Sunday",
  ];

  var zValues = [
    [1, 8, 0, 1, 3],
    [1, 0, 0, 1, 0],
    [1, 2, 0, 3, 3],
    [1, 8, 0, 1, 3],
    [1, 5, 0, 4, 3],
    [1, 4, 0, 2, 3],
    [1, 6, 0, 1, 3],
  ];

  var colorscaleValue = [
    [0, "#ebedf0"],
    [0.2, "#c6e48b"],
    [0.4, "#40c463"],
    [0.6, "#30a14e"],
    [1, "#216e39"],
  ];

  var mapData = [
    {
      x: xValues,
      y: yValues,
      z: zValues,
      type: "heatmap",
      colorscale: colorscaleValue,
      showscale: true,
    },
  ];

  // [
  //   {
  //     x: [1, 2, 3],
  //     y: [2, 6, 3],
  //     type: 'scatter',
  //     mode: 'lines+markers',
  //     marker: {color: 'red'},
  //   },
  //   {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
  // ]

  console.log(dailyContribution);
  return (
    <div className="ActivityHeatMap">
      <div className="activity-calendar">
        <div className="calender-header">
          {/* { Object.keys(response).length !== 0 && <span className="activity-calender-count-text">
            {response.contributionCalendar.totalContributions} contributions in
            the last year
          </span>} */}
        </div>
        {/* <Heatmap
          colour={["#ebedf0", "#c6e48b", "#40c463", "#30a14e", "#216e39"]}
          squareNumber={364}
          count={[...dailyContribution]}
          squareGap="4px"
          squareSize="10px"
        ></Heatmap> */}
        <Plot
          data={mapData}
          layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
        />
      </div>
    </div>
  );
};

export default ActivityHeatMap;
