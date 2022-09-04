import React from "react";
import "./ActivityHeatMap.css";
import { Heatmap } from "contribution-heatmap";
import { useDispatch, useSelector } from "react-redux";
import Plot from "react-plotly.js";

const ActivityHeatMap = () => {
  let heatmapY = [[], [], [], [], [], [], []];
  let dateByWeekArray = [[], [], [], [], [], [], []];
  console.log(heatmapY);
  let received = useSelector((state) => state.userContributionReducer.data);
  let user = { ...received.data };
  let level1 = { ...user.user };
  let response = { ...level1.contributionsCollection };
  console.log(response);
  // console.log(Object.keys(response).length !== 0);
  const dispatch = useDispatch();
  const dailyContribution = new Array(365).fill(0);

  let count = 0;

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

      let weekday = new Date(currentDate).getDay();
      dateByWeekArray[weekday].push(currentDate);

      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  console.log("date by week-", dateByWeekArray);
  var dateRange = getDates(new Date().minusDays(365), new Date());
  console.log(dateRange);

  // commit filter

  if (Object.keys(response).length !== 0) {
    for (let i = 0; i < response.contributionCalendar.weeks.length; i++) {
      for (
        let j = 0;
        j < response.contributionCalendar.weeks[i].contributionDays.length;
        j++
      ) {
        let weekday = new Date(
          response.contributionCalendar.weeks[i].contributionDays[j].date
        ).getDay();

        let contributions =
          response.contributionCalendar.weeks[i].contributionDays[j]
            .contributionCount;

        heatmapY[weekday].push(contributions);
      }
    }
  }

  console.log(heatmapY);
  var xValues = [
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
  ];

  // var yValues = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var yValues = [
    "Sat",
    "Fri",
    "Thur",
    "Wed",
    "Tue",
    "Mon",
    "Sun",
  ];

  var zValues = heatmapY.map(function (nested) {
    return nested.map((element) => element / 10);
  });
  console.log(zValues);

  var colorscaleValue = [
    [0, "#ebedf0"],
    [0.1, "#c6e48b"],
    [0.3, "#40c463"],
    [0.5, "#30a14e"],
    [1, "#216e39"],
  ];

  var mapData = [
    {
      x: dateByWeekArray[0],
      y: yValues,
      z: [
        zValues[6],
        zValues[5],
        zValues[4],
        zValues[3],
        zValues[2],
        zValues[1],
        zValues[0],
      ],
      type: "heatmap",
      colorscale: colorscaleValue,
      showscale: false,
      xgap: 4,
      ygap: 5,
      hoverinfo: "none",
      hovermode:false
    },
  ];

  var layout = {
    width: 800,
    height: 133,
    margin: {
      t: 20,
      b: 0,
      l: 30,
      r: 0,
    },
    font: {
      family: "Arial",
      size: 11,
      color: "#575757",
    },
    xaxis: {
      showdividers: false,
      showgrid: false,
      showspikes: false,
      side: "top",
      ticklabeloverflow: "hide past div",
      showticklabels: true,
      ticklen: 0,
      // type: "date"
    },
    yaxis: {
      showdividers: false,
      showgrid: false,
      showspikes: false,
      ticklabeloverflow: "hide past div",
      showticklabels: true,
      ticklen: 0,
      // type: "date"
    },

    // grid: {
    //   xside: "top",
    // },
    // margin: {
    //   t: 10,
    // },
  };

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
          {Object.keys(response).length !== 0 && (
            <span className="activity-calender-count-text">
              {response.contributionCalendar.totalContributions} contributions
              in the last year
            </span>
          )}
        </div>
        <div className="plotly-container">
        <div className="plotly">
          <Plot data={mapData} layout={layout} config={{displayModeBar: false}}/>
        </div>

        </div>
      </div>
    </div>
  );
};

export default ActivityHeatMap;
