export function addId(array) {
  return array.map((item, idx) => ({ ...item, uniqId: idx }));
}

export function removeId(array) {
  return array.map(item => {
    delete item.uniqId;
    return item;
  });
}
