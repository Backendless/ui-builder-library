import { useEffect, useRef } from 'react';

import Chart from './chartjs';

const { cn } = BackendlessUI.CSSUtils;

export default function CategoryChartComponent({ component, elRef }) {
  const {
    classList, display, style, disabled, height, width, type,
    chartTitleVisibility, chartTitle, chartTitleFontSize, chartBackgroundColor, chartLegendVisibility,
    yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth, labels, datasets, options
  } = component;

  const chartRef = useRef(null);

  useChart(chartRef, {
    display,
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

  useEffect(() => {
    Chart.defaults.plugins.legend.display = chartLegendVisibility;
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ styles }
      className={
        cn("bl-customComponent-categoryChart", classList, { "bl-customComponent-categoryChart--disabled": disabled })
      }>
      <canvas ref={ chartRef } style={{ backgroundColor: chartBackgroundColor, width: "100%", height: "100%" }} />
    </div>
  );
}

const useChart = (chartRef, props) => {
  const {
    display, type, labels, datasets, options, chartTitleVisibility, chartTitleFontSize,
    chartTitle, yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth
  } = props;
  const chartInstance = useRef();

  useEffect(() => {
    if (!display) {
      return null;
    }

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

    return () => chartInstance.current.destroy();
  }, [display]);

  useEffect(() => {
    if (!display) {
      return null;
    }

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
      Object.assign(chart.data, { labels, datasets });

      chart.update();
    }
  }, [
    type, labels, datasets, options, chartTitleVisibility, chartTitleFontSize,
    chartTitle, yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth
  ]);
};
