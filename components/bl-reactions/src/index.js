import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Picker } from './lib/emoji-mart';

const { cn } = BackendlessUI.CSSUtils;

const DEFAULT_REACTIONS = [{
  'id': 'custom',
  'emojis': [
    'grin', 'sweat_smile', 'rolling_on_the_floor_laughing', 'joy', 'slightly_smiling_face', 'upside_down_face', 'wink',
    'blush', 'heart_eyes', 'stuck_out_tongue_winking_eye', 'zany_face', 'hugging_face', 'face_with_peeking_eye',
    'thinking_face', 'exploding_head', 'ghost', 'ok_hand', '+1', '-1', 'clap', 'raised_hands', 'heart_hands',
    'handshake', 'pray', 'muscle', 'eyes', 'astonished', 'disappointed_relieved', 'sob', 'scream', 'disappointed',
    'man-facepalming', 'woman-facepalming', 'man-shrugging', 'woman-shrugging', 'see_no_evil', '100', 'heart', 'tada',
    'champagne', 'birthday', 'palm_tree', 'bulb', 'heavy_plus_sign', 'heavy_minus_sign',
] }];

export default function ReactionsComponent({ component, eventHandlers, elRef }) {
  const {
    classList, style, display, availableReactions, theme, perLine, emojiSize, emojiButtonSize, emojiButtonRadius,
    emojiButtonColors, initialReactions, initialReactionsByUser, userReactionsCount,
  } = component;
  const { onEmojiSelect } = eventHandlers;

  const available = useMemo(() => isValidReactionsSet(availableReactions) && availableReactions, [availableReactions]);
  const started = useMemo(() => validateReactions(initialReactions), [initialReactions]);
  const startedByUser = useMemo(() => validateReactions(initialReactionsByUser), [initialReactionsByUser]);

  const [reactionsSet, setReactionsSet] = useState(available || DEFAULT_REACTIONS);
  const [reactionShown, setReactionShown] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState(started || []);
  const [selectedEmojisByUser, setSelectedEmojisByUser] = useState(startedByUser || []);

  const ref = useRef(null);
  const instance = useRef(null);

  useEffect(() => setSelectedEmojis(started), [started]);
  useEffect(() => setSelectedEmojisByUser(startedByUser), [startedByUser]);
  useEffect(() => setReactionsSet(available), [available]);

  const onReactionClick = useCallback(() => setReactionShown(!reactionShown), [reactionShown]);

  const handleEmojiSelect = useCallback((emoji, event) => {
    const emojiId = emoji.id;
    const emojiIndex = selectedEmojisByUser.findIndex(selectedEmoji => selectedEmoji.id === emojiId);
    const emojiIndexInCommon = selectedEmojis.findIndex(selectedEmoji => selectedEmoji.id === emojiId);

    if (emojiIndex !== -1) {
      // Если эмодзи уже выбрано юзером, уменьшаем его счетчик на 1
      const updatedEmojisByUser = [...selectedEmojisByUser];
      updatedEmojisByUser[emojiIndex] = {
        ...updatedEmojisByUser[emojiIndex],
        count: updatedEmojisByUser[emojiIndex].count - 1,
      };

      // Если эмодзи уже выбрано в общем списке, уменьшаем его счетчик на 1
      if (emojiIndexInCommon !== -1) {
        const updatedEmojis = [...selectedEmojis];
        updatedEmojis[emojiIndexInCommon] = {
          ...updatedEmojis[emojiIndexInCommon],
          count: updatedEmojis[emojiIndexInCommon].count - 1,
        };

        // Удаляем эмодзи, если его счетчик стал равен 0
        if (updatedEmojis[emojiIndexInCommon].count === 0) {
          updatedEmojis.splice(emojiIndexInCommon, 1);
        }
        setSelectedEmojis(updatedEmojis);
      }

      // Удаляем эмодзи юзера, если его счетчик стал равен 0
      if (updatedEmojisByUser[emojiIndex].count === 0) {
        updatedEmojisByUser.splice(emojiIndex, 1);
      }

      setSelectedEmojisByUser(updatedEmojisByUser);
    } else {
      // Если эмодзи не выбрано, добавляем его как новую эмоцию
      const updatedEmojis = [...selectedEmojis];
      const updatedEmojisByUser = [...selectedEmojisByUser];

      if (emojiIndexInCommon === -1) {
        updatedEmojis.push({ id: emojiId, count: 1 });
      } else {
        updatedEmojis[emojiIndexInCommon] = {
          ...updatedEmojis[emojiIndexInCommon],
          count: updatedEmojis[emojiIndexInCommon].count + 1,
        };
      }

      if (emojiIndex === -1) {
        updatedEmojisByUser.push({ id: emojiId, count: 1 });
      } else {
        updatedEmojisByUser[emojiIndex] = {
          ...updatedEmojisByUser[emojiIndex],
          count: updatedEmojisByUser[emojiIndex].count + 1,
        };
      }

      if (userReactionsCount > 0 && updatedEmojisByUser.length > userReactionsCount) {
        const shifted = updatedEmojisByUser.shift();
        const id = shifted.id;
        const index = updatedEmojis.findIndex(emoji => emoji.id === id);

        // уменьшаем его счетчик на 1 в общем списке эмоций
        updatedEmojis[index] = {
          ...updatedEmojis[index],
          count: updatedEmojis[index].count - 1,
        };

        // Удаляем эмодзи, если его счетчик стал равен 0
        if (updatedEmojis[index].count === 0) {
          updatedEmojis.splice(index, 1);
        }
      }

      setSelectedEmojis(updatedEmojis);
      setSelectedEmojisByUser(updatedEmojisByUser);
    }

    onEmojiSelect({ event, emoji: { id: emojiId } });
  }, [selectedEmojis, selectedEmojisByUser, userReactionsCount, onEmojiSelect]);

  const propsPicker = useMemo(() => ({
    previewPosition  : 'none',
    skinTonePosition : 'none',
    searchPosition   : 'none',
    navPosition      :'none',
    maxFrequentRows  : 0,
    set              : 'apple',
    categories       : [reactionsSet[0]['id']],
    custom           : reactionsSet,
    perLine          : perLine,
    theme            : theme,
    emojiSize        : emojiSize,
    emojiButtonSize  : emojiButtonSize,
    emojiButtonRadius: emojiButtonRadius,
    emojiButtonColors: emojiButtonColors,
    onEmojiSelect    : handleEmojiSelect,
  }), [reactionsSet, perLine, theme, emojiSize, emojiButtonSize,
    emojiButtonColors, emojiButtonRadius, handleEmojiSelect]);

  useEffect(() => {
    instance.current = new Picker({ ...propsPicker, ref });

    return () =>  instance.current = null;
  }, [propsPicker]);

  Object.assign(component, {
    open                      : () => setReactionShown(true),
    close                     : () => setReactionShown(false),
    getSelectedReactions      : () => selectedEmojis,
    getSelectedReactionsByUser: () => selectedEmojisByUser,
    getAllAvailableReactions  : () => reactionsSet[0].emojis,
    setSelectedReactions      : reactions => setSelectedEmojis(validateReactions(reactions)),
    setSelectedReactionsByUser: reactions => setSelectedEmojisByUser(validateReactions(reactions)),
  });

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-reactions', classList) } ref={ elRef } style={ style }>
      <ReactionControl
        emojiSize={ emojiSize }
        selectedEmojis={ selectedEmojis }
        selectedEmojisByUser={ selectedEmojisByUser }
        onReactionClick={ onReactionClick }
        handleEmojiSelect={ handleEmojiSelect }
      />

      <div
        ref={ ref }
        className="reactions"
        style={{ display: reactionShown ? 'block' : 'none', top: `${ emojiSize + 13 }px` }}></div>
    </div>
  );
}

function ReactionControl({ emojiSize, selectedEmojis, selectedEmojisByUser, onReactionClick, handleEmojiSelect }) {
  return (
    <div className="reaction-control" style={{ height: `${ emojiSize + 10 }px` }}>

      { selectedEmojis.map(emoji => (
        <div
          className={ cn('reaction-control__emoji',
            { 'user-reaction': selectedEmojisByUser.findIndex(em => em.id === emoji.id) !== -1 }) }
          onClick={ event => handleEmojiSelect(emoji, event) }>
          <em-emoji
            className="reaction-control__emoji--em-emoji"
            id={ emoji.id }
            set="apple"
            size={ emojiSize }></em-emoji>
          <span className="reaction-control__emoji--count">{ emoji.count }</span>
        </div>
      )) }

      <div className="reaction-control__btn" style={{ height: `${ emojiSize + 10 }px` }} onClick={ onReactionClick }>
        <SmileIcon size={ emojiSize }/>
      </div>
    </div>
  );
}

function SmileIcon({ size }) {
  return (
    <>
      <svg width={ size } height={ size } viewBox="-20 -20 440 440">
        <circle cx="200" cy="200" r="196" fill="#fff" stroke="#000" strokeWidth="32" className="circle"/>
        <circle cx="130" cy="130" r="40" fill="#000"/>
        <circle cx="270" cy="130" r="40" fill="#000"/>
        <path d="M120 270 q80 80 160 0" stroke="none" fill="#000"/>
      </svg>
      <span style={{ fontSize: size, lineHeight: `${ size / 2 }px` }}>+</span>
    </>
  );
}

function isValidReactionsSet(availableReactions) {
  if (!Array.isArray(availableReactions) || availableReactions.length !== 1) {
    return false;
  }

  const set = availableReactions[0];

  if (!set || typeof set !== 'object' || !set.id || typeof set.id !== 'string'
    || !set.emojis || !Array.isArray(set.emojis) || set.emojis.length === 0) {
    return false;
  }

  return true;
}

function validateReactions(reactions) {
  if (!reactions || reactions.length === 0) {
    return [];
  }

  for (const reaction of reactions) {
    if (!reaction.id) {
      throw new Error("Every reaction must have an 'id' property.");
    }

    if (typeof reaction.count !== 'number') {
      reaction.count = 1;
    }
  }

  return reactions;
}
