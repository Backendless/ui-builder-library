import { useEffect, useMemo, useRef } from 'react';
import Chart from './chartjs';

const { cn } = BackendlessUI.CSSUtils;

export default function CategoryChartComponent({ component, elRef }) {
  const {
    classList, display, style, disabled, height, width, type, titleVisibility, title, titleFontSize, backgroundColor,
    legendVisibility, yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth, labels, datasets, options
  } = component;

  const chartRef = useRef(null);
  const chartConfig = useChartConfig({
    options,
    legendVisibility,
    titleVisibility,
    title,
    titleFontSize,
    yGridLineVisibility,
    xGridLineVisibility,
    gridLinesColor,
    gridLinesWidth,
  });

  useChart(chartRef, display, type, labels, datasets, chartConfig);

  const styles = { ...style, width, height };

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ styles }
      className={
        cn('bl-customComponent-categoryChart', classList, { 'bl-customComponent-categoryChart--disabled': disabled })
      }>
      <canvas ref={ chartRef } style={{ backgroundColor, width: '100%', height: '100%' }}/>
    </div>
  );
}

const useChart = (chartRef, display, type, labels, datasets, chartConfig) => {
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!display) {
      return;
    }

    if (chartInstance.current) {
      chartInstance.current.data = { labels, datasets };
      chartInstance.current.options = chartConfig;
      chartInstance.current.update();
    } else {
      chartInstance.current = new Chart(chartRef.current, {
        type,
        data: { labels, datasets },
        options: chartConfig,
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartRef.current, display, type, labels, datasets, chartConfig]);
};

const useChartConfig = ({
  options, legendVisibility, titleVisibility, title, titleFontSize,
  yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth,
}) => useMemo(() => ({
  ...options,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: legendVisibility,
    },
    title: {
      display: titleVisibility,
      text: title,
      font: {
        size: titleFontSize,
      },
    },
  },
  scales: {
    y: {
      grid: {
        display: yGridLineVisibility,
        color: gridLinesColor,
        lineWidth: gridLinesWidth,
      },
    },
    x: {
      grid: {
        display: xGridLineVisibility,
        color: gridLinesColor,
        lineWidth: gridLinesWidth,
      },
    },
  },
}), [options, legendVisibility, titleVisibility, title, titleFontSize,
  yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth,]);
