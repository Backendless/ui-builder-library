import { useEffect, useMemo, useRef } from 'react';
import Chart from './chartjs';

const { cn } = BackendlessUI.CSSUtils;

export default function CategoryChartComponent({ component, elRef }) {
  const { chartRef } = useChartLogic(component);
  const { classList, display, style, disabled, height, width, backgroundColor } = component;
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

function useChartLogic(component) {
  const {
    options, yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth,
    legendVisibility, titleVisibility, title, titleFontSize,
    display, type, labels, datasets
  } = component;

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartConfig = {
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
  }

  useEffect(() => {
    if (!display) {
      return;
    }

    let requireRerender = false;

    const optionsConfig = { ...options };

    if (isDataChange(chartConfig, optionsConfig)) {
      requireRerender = true;
      Object.assign(chartConfig, optionsConfig);
    }

    const scaleConfig = {
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
    };

    if (isDataChange(chartConfig.scales, scaleConfig)) {
      requireRerender = true;
      Object.assign(chartConfig.scales.y, scaleConfig.y);
      Object.assign(chartConfig.scales.x, scaleConfig.x);
    }

    const pluginsConfig = {
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
    };

    if (isDataChange(chartConfig.plugins, pluginsConfig)) {
      requireRerender = true;
      Object.assign(chartConfig.plugins.legend, pluginsConfig.legend);
      Object.assign(chartConfig.plugins.title, pluginsConfig.title);
    }

    if (chartInstance.current && requireRerender) {
      chartInstance.current.data = { labels, datasets };
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
  }, [chartRef.current, display, type, labels, datasets, chartConfig, options,
    legendVisibility, titleVisibility, title, titleFontSize,
    yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth]);

  return { chartRef };
}

function isDataChange(prevData, nextData) {
  if (prevData === nextData) {
    return false;
  }

  if (typeof prevData !== typeof nextData) {
    return true;
  }

  if (prevData === null || prevData === undefined || nextData === null || nextData === undefined) {
    return false;
  }

  if (typeof prevData === 'object' && typeof nextData === 'object') {
    const prevKeys = Object.keys(prevData);
    const nextKeys = Object.keys(nextData);

    if (prevKeys.length !== nextKeys.length) {
      return true;
    }

    for (let key of prevKeys) {
      if (!isDataChange(prevData[key], nextData[key])) {
        return false;
      }
    }

    return true;
  }

  return prevData !== nextData;
}
