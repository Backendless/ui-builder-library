import { useEffect, useState } from 'react';

import primereact from './lib/core';

const { Mention } = primereact.mention;
const { cn } = BackendlessUI.CSSUtils;

const DEFAULT_FIELD_BLACK_LIST = ['created', '___class', 'ownerId', 'updated', 'objectId'];

export default function MentionComponent({ component, eventHandlers }) {
  const {
    trigger, suggestions, field, scrollHeight, autoHighlight, placeholder, delay, autoresize, rows, cols,
    hideField, classList, style, display
  } = component;
  const { onChange, onFocus, onBlur, onShow, onHide } = eventHandlers;

  const [processedSuggestions, setProcessedSuggestions] = useState([]);
  const triggers = useTriggers(trigger);
  const [fieldBlackList, setFieldBlackList] = useState(DEFAULT_FIELD_BLACK_LIST);

  useEffect(() => {
    if (hideField?.length) {
      const hideValues = hideField.split(',').map(el => el.trim());
      setFieldBlackList(prev => [...prev, ...hideValues]);
    }
  }, [hideField]);

  const searchHandler = event => {
    const eventTrigger = event.trigger;

    for (const trigger of triggers) {
      if (trigger === eventTrigger) {
        const query = event.query;
        const orderedSuggestions = suggestions.filter(suggestion => suggestion.trigger === eventTrigger)[0].suggestions;
        let finalSuggestions;

        if (!query.trim().length) {
          finalSuggestions = orderedSuggestions;
        } else {
          finalSuggestions = orderedSuggestions
            .filter(suggestion => suggestion.field.toLowerCase().startsWith(query.toLowerCase()));
        }
        setProcessedSuggestions(finalSuggestions);
      }
    }
  };

  const itemTemplate = (suggestion, options) => {
    const trigger = options.trigger;
    const fields = [];

    for (const field in suggestion) {
      if (!fieldBlackList.includes(field)) {
        fields.push(field);
      }
    }

    if (triggers.some(availableTrigger => availableTrigger === trigger)) {
      return (<div className="content">
        {
          fields.map(field => {
            if (field === 'img' && suggestion.img) {
              return (<img src={ suggestion[field] } className="img"/>);
            } else if (suggestion[field]) {
              return (<span className="text"> { suggestion[field] } </span>);
            }

            return null;
          })
        }
      </div>);
    }
    setProcessedSuggestions([]);

    return null;
  };

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
      itemTemplate={ itemTemplate }
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

const useTriggers = trigger => (trigger ? trigger.split(',').map(el => el.trim()) : ['@']);
