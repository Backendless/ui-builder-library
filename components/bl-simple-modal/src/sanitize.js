const DEFAULT_WHITE_LIST = {
  A         : ['target', 'href', 'title'],
  ABBR      : ['title'],
  ADDRESS   : [],
  AREA      : ['shape', 'coords', 'href', 'alt'],
  ARTICLE   : [],
  ASIDE     : [],
  AUDIO     : ['autoplay', 'controls', 'loop', 'preload', 'src'],
  B         : [],
  BDI       : ['dir'],
  BDO       : ['dir'],
  BIG       : [],
  BLOCKQUOTE: ['cite'],
  BR        : [],
  CAPTION   : [],
  CENTER    : [],
  CITE      : [],
  CODE      : [],
  COL       : ['align', 'valign', 'span', 'width'],
  COLGROUP  : ['align', 'valign', 'span', 'width'],
  DD        : [],
  DEL       : ['datetime'],
  DETAILS   : ['open'],
  DIV       : [],
  DL        : [],
  DT        : [],
  EM        : [],
  FONT      : ['color', 'size', 'face'],
  FOOTER    : [],
  H1        : [],
  H2        : [],
  H3        : [],
  H4        : [],
  H5        : [],
  H6        : [],
  HEADER    : [],
  HR        : [],
  I         : [],
  IMG       : ['src', 'alt', 'title', 'width', 'height'],
  INS       : ['datetime'],
  LI        : [],
  MARK      : [],
  NAV       : [],
  OL        : [],
  P         : [],
  PRE       : [],
  S         : [],
  SECTION   : [],
  SMALL     : [],
  SPAN      : [],
  SUB       : [],
  SUP       : [],
  STRONG    : [],
  TABLE     : ['width', 'border', 'align', 'valign'],
  TBODY     : ['align', 'valign'],
  TD        : ['width', 'rowspan', 'colspan', 'align', 'valign'],
  TFOOT     : ['align', 'valign'],
  TH        : ['width', 'rowspan', 'colspan', 'align', 'valign'],
  THEAD     : ['align', 'valign'],
  TR        : ['rowspan', 'align', 'valign'],
  TT        : [],
  U         : [],
  UL        : [],
  VIDEO     : ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width'],
};

const ALWAYS_SAFE_REGEX = /(id)|(style)|(class)|^(data-)/;

const isSafeTag = node => !!DEFAULT_WHITE_LIST[node.nodeName] || node.nodeType === 3;

const isUnsafeAttribute = (node, attribute) => {
  if (ALWAYS_SAFE_REGEX.test(attribute)) {
    return false;
  }

  return !DEFAULT_WHITE_LIST[node.nodeName].includes(attribute);
};

const getUnsafeAttrs = node => [...node.attributes].filter(attribute => isUnsafeAttribute(node, attribute.name));

const removeUnsafeAttrs = node => {
  if (node.attributes) {
    if (node.childElementCount) {
      node.childNodes.forEach(child => prepareNode(child));
    }

    const unsafeAttrs = getUnsafeAttrs(node);

    unsafeAttrs.forEach(attr => node.removeAttribute(attr.name));
  }
};

const prepareNode = node => isSafeTag(node) ? removeUnsafeAttrs(node) : node.remove();

export function sanitize(html) {
  const virtualHtml = document.createElement('div');

  virtualHtml.innerHTML = html;

  if (!virtualHtml.childElementCount) {
    return html;
  }

  virtualHtml.childNodes.forEach(node => prepareNode(node));

  return virtualHtml.innerHTML;
}
