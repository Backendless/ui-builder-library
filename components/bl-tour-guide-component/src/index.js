import { useEffect, useState } from 'react';

import Joyride, { ACTIONS, STATUS } from './lib/react-joyride.min';

const { cn } = BackendlessUI.CSSUtils;

export default function TourGuideComponent({ component, eventHandlers, elRef }) {
  const { onChange } = eventHandlers;
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

  useEffect(() => {
    setSteps(options);
    setStepsKey(stepsKey + 1);
  }, [options]);

  const onStartClick = event => {
    event.preventDefault();

    setRun(true);
  };

  const onCallback = tourState => {
    const { status, action } = tourState;

    const isNextStepAction = action === ACTIONS.NEXT && status !== STATUS.FINISHED;
    const isChangeStepAction = isNextStepAction || action === ACTIONS.PREV || action === ACTIONS.GO;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED || action === ACTIONS.RESET) {
      setRun(false);
    }

    if (continuous && isChangeStepAction) {
      setTimeout(() => {
        setRun(false);
        setRun(true);
      });
    }

    onChange({ tourState });
  };

  useComponentActions(component, setRun, helpers);

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

function useComponentActions(component, setRun, helpers) {
  Object.assign(component, {
    start     : () => setRun(true),
    stop      : () => setRun(false),
    skip      : () => helpers?.skip(),
    close     : () => helpers?.close(),
    reset     : () => helpers?.reset(),
    open      : () => helpers?.open(),
    goNext    : () => helpers?.next(),
    goPrevious: () => helpers?.prev(),
    goTo      : index => helpers?.go(index),
  });
}
