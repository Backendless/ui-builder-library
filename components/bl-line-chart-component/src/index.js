import { useEffect, useRef } from 'react';

import Chart from './chartjs';

const { cn } = BackendlessUI.CSSUtils;

export default function LineChartComponent({ component, elRef }) {
  const { classList, display, style, disabled, height, width, type, labels, datasets, options } = component;

  const chartRef = useRef(null);

  useChart(chartRef, { type, labels, datasets, options });

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
      <canvas ref={ chartRef } style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

const useChart = (chartRef, { type, labels, datasets, options }) => {
  const chartInstance = useRef();

  useEffect(() => {
    chartInstance.current = new Chart(chartRef.current, { type, data: { labels, datasets }, options });

    return () => { chartInstance.current.destroy() };
  }, []);

  useEffect(() => {
    const { current: chart } = chartInstance;

    if (chart) {
      chart.type = type;
      chart.options = options;
      chart.data.labels = labels;
      chart.data.datasets = datasets;

      chart.update();
    }
  }, [type, labels, datasets, options]);
};
