export function splitProps(props, splitPropsName) {
  let isSplitProps = splitPropsName.reduce((r, propName) => {
    r[propName] = true;
    return r;
  }, {});

  return Object.entries(props).reduce(([props, splitProps], [propName, propValue]) => {
    if (isSplitProps[propName]) {
      splitProps[propName] = propValue;
    } else {
      props[propName] = propValue;
    }

    return [props, splitProps];
  }, [{}, {}]);
}

export function splitComponentProps(props, Component) {
  return splitProps(props, Object.keys(Component.propsType));
}
