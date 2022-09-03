import React from "react";
import "./ActivityHeatMap.css";
import { Heatmap } from "contribution-heatmap";
import { useDispatch, useSelector } from "react-redux";

const ActivityHeatMap = () => {
  let response = useSelector((state) => state.userContributionReducer.data);
  console.log(response);
  // console.log(Object.keys(response).length !== 0);
  const dispatch = useDispatch();
  const dailyContribution = new Array(364).fill(0);

  let count = 0;

  if (Object.keys(response).length !== 0) {
    for (let i = 0; i < response.contributionCalendar.weeks.length; i++) {
      for (
        let j = 0;
        j < response.contributionCalendar.weeks[i].contributionDays.length;
        j++
      ) {
        dailyContribution[count++] =
          response.contributionCalendar.weeks[i].contributionDays[
            j
          ].contributionCount;
      }
    }
  }

  console.log(dailyContribution);
  console.log(response);
  return (
    <div className="ActivityHeatMap">
      <div className="activity-calendar">
        <div className="calender-header">
         { Object.keys(response).length !== 0 && <span className="activity-calender-count-text">
            {response.contributionCalendar.totalContributions} contributions in
            the last year
          </span>}
        </div>
        <Heatmap
          colour={["#ebedf0", "#c6e48b", "#40c463", "#30a14e", "#216e39"]}
          squareNumber={364}
          count={[...dailyContribution]}
          squareGap="4px"
          squareSize="10px"
        ></Heatmap>
      </div>
    </div>
  );
};

export default ActivityHeatMap;
