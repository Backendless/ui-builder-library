export function enrichWithUids(array) {
  return array.map((item, i) => ({ ...item, uid: i }));
}

export function removeId(array) {
  return array.map(item => {
    delete item.uid;
    return item;
  });
}
