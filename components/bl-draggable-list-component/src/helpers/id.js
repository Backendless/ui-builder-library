export function enrichWithUids(list) {
  return list.map((item, i) => ({ ...item, uid: i }));
}

export function omitUids(list) {
  return list.map(item => ({ label: item.label, value: item.value }));
}
