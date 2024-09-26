module.exports = {
  icon: true,
  replaceAttrValues: {
    '#121212': "{props.color || '#121212'}",
    '#F0F0F0': "{backgroundColor || '#F0F0F0'}",
  },
  template: require('./svgr').template,
  svgProps: {
    width: '{props.size || props.width || 24}',
    height: '{props.size || props.height || 24}',
  },
};