import { useEffect, useState } from 'react';

import Joyride, { ACTIONS, EVENTS, STATUS } from './lib/react-joyride.min';

const { cn } = BackendlessUI.CSSUtils;

export default function TourGuideComponent({ component, eventHandlers: { onChange }, elRef }) {
  const {
    classList, display, style, controlVisibility, controlLabel, options, continuous, autoStart, closeOnEscape,
    closeOnClickOverlay, scrolling, labels, scrollOffset, scrollDuration, scrollToFirstStep, spotlightClicks,
    progressVisibility, skipButtonVisibility, overlayVisibility, backButtonVisibility, closeButtonVisibility,
    spotlightPadding, beaconSize, arrowColor, backgroundColor, overlayColor, primaryColor, textColor, width,
  } = component;

  const tooltipStyles = { width, beaconSize, arrowColor, backgroundColor, overlayColor, primaryColor, textColor };

  const [run, setRun] = useState(autoStart);
  const [steps, setSteps] = useState(options);
  const [helpers, setHelpers] = useState(null);
  const [stepsKey, setStepsKey] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    setSteps(options);
    setStepsKey(stepsKey + 1);
  }, [options]);

  const onStartClick = event => {
    event.preventDefault();

    setRun(true);
  };

  const updateTourState = (run, index) => {
    setStepIndex(index);
    setRun(run);
  };

  const onCallback = tourState => {
    const { status, action, index, type } = tourState;

    onChange({ tourState });

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      // Need to set our running state to false, so we can restart if we click start again.
      updateTourState(false, 0);
    }

    if (type !== EVENTS.STEP_AFTER && type !== EVENTS.TARGET_NOT_FOUND) {
      return;
    }

    if (action === ACTIONS.NEXT || action === ACTIONS.CLOSE) {
      return setStepIndex(index + 1);
    }

    if (action === ACTIONS.PREV) {
      setStepIndex(index - 1);
    }
  };

  useComponentActions(component, helpers, stepIndex, setRun, updateTourState);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-tourGuide', classList) } style={ style }>
      { controlVisibility && (
        <button type="button" aria-label="start tour" onClick={ onStartClick }>{ controlLabel }</button>
      ) }

      <Joyride
        key={ stepsKey }
        stepIndex={ stepIndex }
        steps={ steps }
        continuous={ continuous }
        run={ run }
        disableCloseOnEsc={ !closeOnEscape }
        disableOverlay={ !overlayVisibility }
        disableOverlayClose={ !closeOnClickOverlay }
        disableScrolling={ !scrolling }
        getHelpers={ helpers => setHelpers(helpers) }
        hideBackButton={ !backButtonVisibility }
        hideCloseButton={ !closeButtonVisibility }
        locale={ labels }
        scrollOffset={ scrollOffset }
        scrollDuration={ scrollDuration }
        scrollToFirstStep={ scrollToFirstStep }
        showProgress={ progressVisibility }
        showSkipButton={ skipButtonVisibility }
        spotlightClicks={ spotlightClicks }
        spotlightPadding={ spotlightPadding }
        styles={{ options: tooltipStyles }}
        callback={ onCallback }
      />
    </div>
  );
}

function useComponentActions(component, helpers, stepIndex, setRun, updateTourState) {
  const goTo = index => {
    setRun(false);
    // Need to set the necessary index only after our running state has changed to false
    // so the setStepIndex does not fire a callback
    setTimeout(() => updateTourState(true, index));
  };

  const goPrevious = () => {
    if (stepIndex) {
      helpers?.prev();
    }
  };

  Object.assign(component, {
    goTo, goPrevious,
    goNext: () => helpers?.next(),
    skip  : () => helpers?.skip(),
    close : () => helpers?.close(),
    open  : () => helpers?.open(),
    start : () => setRun(true),
    stop  : () => setRun(false),
    reset : () => updateTourState(false, 0),
  });
}
