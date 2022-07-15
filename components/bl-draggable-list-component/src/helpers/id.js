export function enrichWithUids(list) {
  return list.map((item, i) => ({ ...item, uid: i }));
}

export function omitUids(list) {
  return list.map(item => {
    delete item.uid;
    return item;
  });
}
