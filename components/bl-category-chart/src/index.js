import { useEffect, useMemo, useRef, useState } from 'react';
import Chart from './chartjs';

const { cn } = BackendlessUI.CSSUtils;

export default function CategoryChartComponent({ component, elRef }) {
  const { classList, display, style, disabled, height, width } = component;
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
      <CategoryChart component={ component }/>
    </div>
  );
}

function CategoryChart({ component }) {
  const { chartRef } = useChart(component);

  return (
    <canvas ref={ chartRef } style={{ backgroundColor: component.backgroundColor, width: '100%', height: '100%' }}/>
  );
}

function useChart(component) {
  const {
    options, yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth,
    legendVisibility, titleVisibility, title, titleFontSize, type, labels, datasets
  } = component;

  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartData = useMemo(() => ({ labels, datasets }), [labels, datasets]);

  const pluginsOptions = useMemo(() => ({
    legend: { display: legendVisibility },
    title: {
      display: titleVisibility,
      text: title,
      font: {
        size: titleFontSize,
      },
    },
  }), [legendVisibility, titleVisibility, title, titleFontSize]);

  const scaleOptions = useMemo(() => ({
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
  }), [yGridLineVisibility, xGridLineVisibility, gridLinesColor, gridLinesWidth]);

  useEffect(() => {
    const newChartInstance = new Chart(chartRef.current, {
      type,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: pluginsOptions,
        scales: scaleOptions,
        ...options,
      },
    });

    setChartInstance(newChartInstance);

    return () => newChartInstance.destroy();
  }, [type]);

  useEffect(() => {
    if (!chartInstance) {
      return;
    }

    let requireRerender = false;

    if (chartData) {
      requireRerender = true;
      chartInstance.data = chartData;
    }

    if (pluginsOptions) {
      requireRerender = true;
      chartInstance.options.plugins = pluginsOptions;
    }

    if (scaleOptions) {
      requireRerender = true;
      chartInstance.options.scales = scaleOptions;
    }

    if (options) {
      requireRerender = true;
      Object.assign(chartInstance.options, options);
    }

    if (requireRerender) {
      chartInstance.update();
    }
  }, [chartInstance, chartData, pluginsOptions, scaleOptions, options]);

  return { chartRef };
}
