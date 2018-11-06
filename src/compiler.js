function evalInContext(js, context) {
  return eval(`var $Data = JSON.parse('${JSON.stringify(context)}'); ${js}`);
}

export default (code = '', context = {}) => {
  return code.replace(/\{! ([^}]*) \}/g, (match, group) => String(evalInContext(group, context)));
}
