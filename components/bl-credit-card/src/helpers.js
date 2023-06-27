const eloStringPattern = '^401178|^401179|^431274|^438935|^451416|^457393|^457631|^457632|^504175|^627780|^636297' +
  '|^636369|^636368|^(506699|5067[0-6]\\d|50677[0-8])|^(50900\\d|5090[1-9]\\d|509[1-9]\\d{2})|^65003[1-3]' +
  '|^(65003[5-9]|65004\\d|65005[0-1])|^(65040[5-9]|6504[1-3]\\d)|^(65048[5-9]|65049\\d|6505[0-2]\\d|65053[0-8])' +
  '|^(65054[1-9]|6505[5-8]\\d|65059[0-8])|^(65070\\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\\d|650920)' +
  '|^(65165[2-9]|6516[6-7]\\d)|^(65500\\d|65501\\d)|^(65502[1-9]|6550[3-4]\\d|65505[0-8])|^(65092[1-9]|65097[0-8])';

const eloPattern = new RegExp(eloStringPattern);
const defaultNumberFormat = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/;
const longNumberFormat = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,7})?/;
const expiryFormat = /^\D*(\d{1,2})(\D+)?(\d{1,2})?/;

const Cards = [
  {
    type     : 'amex',
    pattern  : /^3[47]/,
    format   : /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length   : [15],
    cvcLength: [4],
    luhn     : true,
  },
  {
    type     : 'dankort',
    pattern  : /^5019/,
    format   : defaultNumberFormat,
    length   : [16],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'dinersclub',
    pattern  : /^(36|38|30[0-5])/,
    format   : /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length   : [14],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'discover',
    pattern  : /^(6011|65|64[4-9]|622)/,
    format   : defaultNumberFormat,
    length   : [16],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'elo',
    pattern  : eloPattern,
    format   : defaultNumberFormat,
    length   : [16],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'hipercard',
    pattern  : /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
    format   : longNumberFormat,
    length   : [14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'jcb',
    pattern  : /^(308[8-9]|309[0-3]|3094[0]{4}|309[6-9]|310[0-2]|311[2-9]|3120|315[8-9]|333[7-9]|334[0-9]|35)/,
    format   : longNumberFormat,
    length   : [16, 19],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'laser',
    pattern  : /^(6706|6771|6709)/,
    format   : longNumberFormat,
    length   : [16, 17, 18, 19],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'maestro',
    pattern  : /^(50|5[6-9]|6007|6220|6304|6703|6708|6759|676[1-3])/,
    format   : longNumberFormat,
    length   : [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'mastercard',
    pattern  : /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    format   : defaultNumberFormat,
    length   : [16],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'troy',
    pattern  : /^9792/,
    format   : defaultNumberFormat,
    length   : [16],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'unionpay',
    pattern  : /^62/,
    format   : longNumberFormat,
    length   : [16, 17, 18, 19],
    cvcLength: [3],
    luhn     : false,
  },
  {
    type     : 'visaelectron',
    pattern  : /^4(026|17500|405|508|844|91[37])/,
    format   : defaultNumberFormat,
    length   : [16],
    cvcLength: [3],
    luhn     : true,
  },
  {
    type     : 'visa',
    pattern  : /^4/,
    format   : defaultNumberFormat,
    length   : [13, 16],
    cvcLength: [3],
    luhn     : true,
  },
];

const ValidExpiryLength = 7;
const ValidationErrorMessages = {
  cardNumber: 'Invalid Card Number',
  expiry    : 'Invalid Expiration Date',
  cvc       : 'Invalid CVC',
};

export const RegexPatterns = {
  ALL_DIGITS    : /\d/g,
  ALL_NON_DIGITS: /\D+/g,
  ALL_SPACES    : / /g,
  ONLY_DIGITS   : /^\d+$/,
};

function clearNumber(value = '') {
  return value.replace(RegexPatterns.ALL_NON_DIGITS, '');
}

export function getCardByNumber(value) {
  const cardNumber = clearNumber(value);
  let foundCard;

  for (const card of Cards) {
    const match = cardNumber.match(card.pattern);

    if (match && (!foundCard || match[0].length > foundCard[1][0].length)) {
      foundCard = [card, match];
    }
  }

  return foundCard && foundCard[0];
}

export function formatCreditCardNumber(value, card) {
  const cardNumber = clearNumber(value);

  let parts = cardNumber.match(card?.format || longNumberFormat);

  if (!parts) {
    return cardNumber;
  }

  if (parts.length > 1) {
    parts.shift();
    parts = parts.filter(p => p);

    return parts.join(' ');
  }

  return parts[0];
}

export function formatCVC(value, card) {
  const cvc = clearNumber(value);
  const maxLength = card?.cvcLength || 4;

  return cvc.slice(0, maxLength);
}

export function formatExpirationDate(expiry) {
  const parts = expiry.match(expiryFormat);

  if (!parts) {
    return '';
  }

  let month = parts[1] || '';
  let separator = parts[2] || '';
  let year = parts[3] || '';

  if (month === '00') {
    month = '0';
  }

  if (year === '00') {
    year = '0';
  }

  if (month.length === 1 && month > 1) {
    month = `0${ month }`;
    separator = ' / ';
  } else if (month.length === 1 && year.length > 0) {
    month = month + year[0];
    separator = ' / ';
    year = year.slice(1);
  } else if (month.length === 1 && year.length === 0) {
    separator = '';
  } else if (separator === ' /' && year.length === 0) {
    month = month.slice(0, 1);
    separator = '';
  } else if (month.length === 2 || separator.length > 0 || year.length > 0) {
    separator = ' / ';
  }

  if (month > 12) {
    year = month[1] + year;
    month = `0${ month[0] }`;
    separator = ' / ';
  }

  return month + separator + year;
}

export function validateCardDetails(card, cardNumber, expiry, cvc) {
  if (!validateCardNumber(cardNumber, card)) {
    throw new Error(ValidationErrorMessages.cardNumber);
  }

  if (!validateCardExpiry(expiry)) {
    throw new Error(ValidationErrorMessages.expiry);
  }

  if (!validateCardCVC(cvc, card)) {
    throw new Error(ValidationErrorMessages.cvc);
  }
}

export function validateCardExpiry(value) {
  if (value?.length !== ValidExpiryLength) {
    return false;
  }

  const { month, year } = getExpirationDate(value);
  const expiry = new Date(year, month);
  const currentTime = new Date();

  return expiry > currentTime;
}

export function getExpirationDate(value) {
  let [month, year] = value.split(' / ', 2);

  let prefix = (new Date()).getFullYear();
  prefix = prefix.toString().slice(0, 2);
  year = prefix + year;

  month = parseInt(month, 10);
  year = parseInt(year, 10);

  return { month, year };
}

export function validateCardCVC(cvc, card) {
  if (!cvc) {
    return false;
  }

  if (card) {
    return card.cvcLength.includes(cvc.length);
  } else {
    return cvc.length >= 3 && cvc.length <= 4;
  }
}

export function validateCardNumber(value = '', card) {
  const cardNumber = value.replace(RegexPatterns.ALL_SPACES, '');

  if (!RegexPatterns.ONLY_DIGITS.test(cardNumber) || !card) {
    return false;
  }

  return card.length.includes(cardNumber.length) && (card.luhn === false || checkByLuhnAlgorithm(cardNumber));
}

function checkByLuhnAlgorithm(value) {
  let odd = true;
  let sum = 0;
  const digits = (value + '').split('').reverse();

  for (let digit of digits) {
    digit = parseInt(digit, 10);
    odd = !odd;

    if (odd) {
      digit *= 2;
    }

    if (digit > 9) {
      digit -= 9;
    }

    sum += digit;
  }

  return sum % 10 === 0;
}
