import { useCallback, useEffect, useState } from 'react';

import primereact from './lib/core';
import { filterSuggestions, orderFields, stringToList, useTriggers } from './helpers.js';
import { SuggestionCard } from './suggestion-card.js';

const { Mention } = primereact.mention;
const { cn } = BackendlessUI.CSSUtils;

const DEFAULT_FIELD_BLACKLIST = ['created', '___class', 'ownerId', 'updated', 'objectId'];

export default function MentionComponent({ component, eventHandlers }) {
  const {
    trigger, suggestions, field, scrollHeight, autoHighlight, placeholder, delay, autoresize, rows, cols,
    hideField, classList, style, display
  } = component;
  const { onChange, onFocus, onBlur, onShow, onHide } = eventHandlers;

  const [suggestionsMap, setSuggestionsMap] = useState(new Map());
  const [processedSuggestions, setProcessedSuggestions] = useState([]);
  const triggers = useTriggers(trigger);
  const [fieldsBlacklistSet, setFieldsBlacklistSet] = useState(new Set(DEFAULT_FIELD_BLACKLIST));

  useEffect(() => {
    suggestions?.forEach(el => setSuggestionsMap(prev => prev.set(el.trigger, el.suggestions)));
  }, [suggestions]);

  useEffect(() => {
    if (hideField?.length) {
      const hidenFields = stringToList(hideField);
      setFieldsBlacklistSet(new Set([...DEFAULT_FIELD_BLACKLIST, ...hidenFields]));
    }
  }, [hideField]);

  const searchHandler = useCallback(event => {
    const { trigger: eventTrigger, query } = event;

    for (const trigger of triggers) {
      if (trigger !== eventTrigger) {
        continue;
      }

      const suggestionsByTrigger = suggestionsMap.get(eventTrigger);

      setProcessedSuggestions(filterSuggestions(suggestionsByTrigger, query));
    }
  }, [triggers, suggestionsMap]);

  const itemRenderer = useCallback((suggestion, options) => {

    const trigger = options.trigger;

    const orderedFields = orderFields(suggestion, fieldsBlacklistSet);

    const hasAvailableTrigger = triggers.some(availableTrigger => availableTrigger === trigger);

    if (hasAvailableTrigger) {
      return (<SuggestionCard fields={ orderedFields } suggestion={ suggestion }/>);
    }

    setProcessedSuggestions([]);

    return null;
  }, [fieldsBlacklistSet, triggers]);

  const onShowHandler = () => {
    if (processedSuggestions.length) {
      onShow({ suggestions: processedSuggestions });
    }
  };

  if (!display) {
    return null;
  }

  return (
    <Mention
      trigger={ triggers }
      suggestions={ processedSuggestions }
      field={ field }
      itemTemplate={ itemRenderer }
      onSearch={ searchHandler }
      style={ style }
      className={ cn('bl-customComponent-Mention', classList) }
      scrollHeight={ scrollHeight }
      autoHighlight={ autoHighlight }
      placeholder={ placeholder }
      delay={ delay }
      rows={ rows }
      cols={ cols }
      autoResize={ autoresize }
      onChange={ e => onChange({ value: e.target.value }) }
      onFocus={ onFocus }
      onBlur={ onBlur }
      onShow={ onShowHandler }
      onHide={ onHide }
    />
  );
};
