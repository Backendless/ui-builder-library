import { useEffect, useState } from 'react';

import { MemberProgressChartItem } from './member-progress-chart-item';
import { validate } from './validate';

const { cn } = BackendlessUI.CSSUtils;
const percentageMarksList = [0, 25, 50, 75, 100];

export default function GroupMemberGoalProgressComponent({ component }) {
  const { disable, classList, members } = component;
  
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    setMembersList(validate(members));
  }, [members]);
  
  return (
    <div className={ cn('bl-customComponent-groupMemberGoalProgress', ...classList, { disable }) }>
      <div className="chart">
        <div className="chart__items">
          <div className="chart__grids">
            { percentageMarksList.map(item => (
              <div className="chart__y-grid-line" style={{ left: `${item}%` }} />
            )) }
          </div>
          { membersList.length > 0 && membersList.map(({ objectId, name, goal, progress }) => (
            <MemberProgressChartItem
              key={ objectId }
              name={ name ? name : 'Name' }
              goal={ goal ? goal : 1 }
              progress={ progress ? progress : 0 }
            />
          )) }
        </div>
        <div className="chart__percentage-marks">
          { percentageMarksList.map(item => (
            <div className="chart__percentage-marks-item" style={{ left: `${item}%` }}>{ `${item}%` }</div>
          )) }
        </div>
      </div>
    </div> 
  );
};
