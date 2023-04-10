import { useEffect, useRef } from 'react';

import Chart from './chartjs';

const { cn } = BackendlessUI.CSSUtils;

export default function LineChartComponent({ component, elRef }) {
  const {
    classList, display, style, disabled, height, width, type,
    chartTitleVisibility, chartTitle, chartTitleFontSize, chartBackgroundColor,
    yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth, labels, datasets, options
  } = component;

  const chartRef = useRef(null);

  useChart(chartRef, {
    type,
    labels,
    datasets,
    options,
    chartTitle,
    chartTitleFontSize,
    chartTitleVisibility,
    yGridLineVisibility,
    xGridLineVisibility,
    gridLinesColor,
    gridLinesWidth
  });

  const styles = { ...style, width, height };

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ styles }
      className={
        cn("bl-customComponent-lineChart", classList, { "bl-customComponent-lineChart--disabled": disabled })
      }>
      <canvas ref={ chartRef } style={{ backgroundColor: chartBackgroundColor, width: "100%", height: "100%" }} />
    </div>
  );
}

const useChart = (chartRef, props) => {
  const {
    type, labels, datasets, options, chartTitleVisibility, chartTitleFontSize,
    chartTitle, yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth
  } = props;
  const chartInstance = useRef();

  useEffect(() => {
    chartInstance.current = new Chart(chartRef.current, {
      type,
      data: { labels, datasets },
      options: {
        ...options,
        plugins: {
          title: {
            display: chartTitleVisibility,
            text: chartTitle,
            font: {
              size: chartTitleFontSize
            }
          }
        },
        scales: {
          y: {
            grid: {
              display: yGridLineVisibility,
              color: gridLinesColor,
              lineWidth: gridLinesWidth
            }
          },
          x: {
            grid: {
              display: xGridLineVisibility,
              color: gridLinesColor,
              lineWidth: gridLinesWidth
            },
          }
        }
      }
    });

    return () => { chartInstance.current.destroy() };
  }, []);

  useEffect(() => {
    const { current: chart } = chartInstance;

    if (chart) {
      chart.type = type;
      chart.options = {
        ...options,
        plugins: {
          title: {
            display: chartTitleVisibility,
            text: chartTitle,
            font: {
              size: chartTitleFontSize
            }
          }
        },
        scales: {
          y: {
            grid: {
              display: yGridLineVisibility,
              color: gridLinesColor,
              lineWidth: gridLinesWidth
            }
          },
          x: {
            grid: {
              display: xGridLineVisibility,
              color: gridLinesColor,
              lineWidth: gridLinesWidth
            }
          }
        }
      };
      chart.data.labels = labels;
      chart.data.datasets = datasets;

      chart.update();
    }
  }, [
    type, labels, datasets, options, chartTitleVisibility, chartTitleFontSize,
    chartTitle, yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth
  ]);
};
