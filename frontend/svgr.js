const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};
${variables.interfaces};
const ${variables.componentName} = ({backgroundColor, ...props}) => (
  ${variables.jsx}
);
${variables.exports};
`;
};

module.exports = {
  template
}