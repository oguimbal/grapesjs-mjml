const parser = new DOMParser();

function evalInContext(js, context = {}) {
  return eval(`
      var $Data = JSON.parse('${JSON.stringify(context)}');
      function lt(a, b) {
        return a < b;
      }
      function lte(a, b) {
        return a <= b;
      }
      function gt(a, b) {
        return a > b;
      }
      function gte(a, b) {
        return a >= b;
      }
      function and() {
        return Array.prototype.slice.call(arguments).reduce(function(prev, item) {
          return prev && item;
        }, true);
      }
      function or() {
        return Array.prototype.slice.call(arguments).reduce(function(prev, item) {
          return prev || item;
        }, false);
      }
      ;${js}
  `);
}

function toCode(node, context) {
  if(!node) {
    return '';
  }

  if(node.nodeType === 3) {
    return (node.nodeValue || '').replace(/\{!([^}]*)\}/gm, (match, group) => String(evalInContext(group, context)));
  }

  if(node.hasAttribute('data-if')) {
    const conditionalCode = node.getAttribute('data-if');
    const passed = evalInContext(conditionalCode, context);
    if(!passed) {
      return '';
    }
  }

  const attrs = [];
  for(let attrName of node.getAttributeNames()) {
    const attrValue = node.getAttribute(attrName);
    attrs.push(`${attrName}="${attrValue}"`);
  }

  const children = [];
  for(let child of node.childNodes) {
    const childCode = toCode(child, context);
    if(childCode) {
      children.push(childCode);
    }
  }

  const tagName = node.tagName;
  const lines = [
    `<${tagName} ${attrs.join(' ')}>`,
    children.join('\n'),
    `</${tagName}>`,
  ];

  return lines.join('\n');
}

export default (code = '', context = {}) => {
  if(!code) {
      return code;
  }

  const doc = parser.parseFromString(code,"text/xml");
  return toCode(doc.children[0], context);
}
