export function numKey(keyMapping) {
  for (let i = 0; i < 10; i++) {
    keyMapping[`${i}`] = [`[${i}]`];
  }
  return keyMapping;
}
