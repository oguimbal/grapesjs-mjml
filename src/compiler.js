const parser = new DOMParser();

function evalInContext(js, context = {}) {
  try {
    return function() {
        return eval(`
            var $Data = this;
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
      }.call(context);
  }
  catch(e) {
    console.error(e);
    alert(e.message);
  }
}

function renderNode(node, context) {
  const attrs = [];
  for(let attrName of node.getAttributeNames()) {
    const attrValue = evalText(node.getAttribute(attrName), context);
    attrs.push(`${attrName}="${attrValue}"`);
  }
  const tagName = node.tagName;
  const lines = [
    `<${tagName} ${attrs.join(' ')}>`,
  ];
  const children = [];
  let text = '';
  for(let child of node.childNodes) {
    if(child.nodeType === 3) {
      text += child.nodeValue;
    }
    else {
      children.push(evalText(text, context));
      text = '';
      const childCodes = toCode(child, context);
      if(childCodes) {
        childCodes.forEach(childCode => {
          children.push(childCode);
        });
      }
    }
  }
  if(text) {
    children.push(evalText(text, context));
  }
  lines.push(children.join('\n'));
  lines.push(`</${tagName}>`);
  return lines.join('\n');
}

function evalText(text = '', context = {}) {
  return text.replace(/\{!([^}]*)\}/gm, (match, group) => String(evalInContext(group, context)));
}

function toCode(node, context) {
  if(!node || node.nodeType !== 1) {
    return [];
  }

  if(node.hasAttribute('data-if')) {
    const conditionalCode = node.getAttribute('data-if');
    const passed = evalInContext(conditionalCode, context);
    if(!passed) {
      return [];
    }
  }

  const result = [];
  if(node.hasAttribute('data-repeat')) {
      const repeatCode = node.getAttribute('data-repeat');
      let [ varName, iterations ] = repeatCode.split(' in ');
      if(!varName || !iterations) {
          throw new Error('Invalid looping code for ' + repeatCode);
      }
      varName = varName.trim();
      iterations = iterations.trim();
      const list = evalInContext(iterations, context) || [];
      for(let item of list) {
          const newContext = Object.assign({}, context, { [varName]: item });
          result.push(renderNode(node, newContext));
      }
  }
  else {
      [node].forEach(node => {
          result.push(renderNode(node, context));
      });
  }

  return result;
}

const mergeContext = (context, userContext) => {
  const newContext = {};
  userContext && userContext.forEach(item => {
    newContext[item.name] = item.value;
  });

  return Object.assign({}, context, { '$User': newContext });
};

export default (code = '', context = {}, userContext = {}) => {
  if(!code) {
      return code;
  }

  const allContext = mergeContext(context, userContext);

  const doc = parser.parseFromString(code,"text/xml");
  return toCode(doc.children[0], allContext)[0];
}
