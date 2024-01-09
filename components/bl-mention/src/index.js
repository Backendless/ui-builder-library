import { useCallback, useEffect, useState } from 'react';

import primereact from './lib/core';

import { filterSuggestions, orderFields, stringToList, updateSuggestionsMap, useTriggers } from './helpers.js';
import { SuggestionCard } from './suggestion-card.js';

const { Mention } = primereact.mention;
const { cn } = BackendlessUI.CSSUtils;

const BLACKLISTED_FIELDS = new Set(['created', '___class', 'ownerId', 'updated', 'objectId']);

export default function MentionComponent({ component, eventHandlers }) {
  const {
    trigger, suggestions, field, scrollHeight, autoHighlight, placeholder, delay, autoresize, rows, cols,
    hideField, classList, style, display,
  } = component;
  const { onChange, onFocus, onBlur, onShow, onHide, onSearch } = eventHandlers;

  const [suggestionsMap, setSuggestionsMap] = useState(() => new Map());
  const [processedSuggestions, setProcessedSuggestions] = useState([]);
  const triggers = useTriggers(trigger);
  const [blacklistedFields, setBlacklistedFields] = useState(BLACKLISTED_FIELDS);

  useEffect(() => {
    updateSuggestionsMap(suggestions, setSuggestionsMap);
  }, [suggestions]);

  useEffect(() => {
    if (hideField?.length) {
      const hidenFields = stringToList(hideField);
      setBlacklistedFields(new Set([...BLACKLISTED_FIELDS, ...hidenFields]));
    }
  }, [hideField]);

  const searchHandler = useCallback(async ({ trigger: eventTrigger, query }) => {
    if (!triggers.includes(eventTrigger)) {
      return;
    }

    if (query) {
      await onSearch({ searchValue: query })?.then(result => updateSuggestionsMap(result, setSuggestionsMap));
    }

    const suggestionsByTrigger = suggestionsMap.get(eventTrigger);
    const filteredSuggestions = filterSuggestions(suggestionsByTrigger, query, field);

    setProcessedSuggestions(filteredSuggestions);
  }, [triggers, suggestionsMap]);

  const itemRenderer = useCallback((suggestion, options) => {

    const trigger = options.trigger;

    const orderedFields = orderFields(suggestion, blacklistedFields);

    const hasAvailableTrigger = triggers.some(availableTrigger => availableTrigger === trigger);

    if (hasAvailableTrigger) {
      return (<SuggestionCard fields={ orderedFields } suggestion={ suggestion }/>);
    }

    setProcessedSuggestions([]);

    return null;
  }, [blacklistedFields, triggers]);

  const onShowHandler = useCallback(() => {
    if (processedSuggestions.length) {
      onShow({ suggestions: processedSuggestions });
    }
  }, [processedSuggestions]);

  const onChangeHandler = useCallback(e => {
    onChange({ value: e.target.value });
  }, []);

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
      onChange={ onChangeHandler }
      onFocus={ onFocus }
      onBlur={ onBlur }
      onShow={ onShowHandler }
      onHide={ onHide }
    />
  );
}
