function removeAKeyInAnObj(obj, key) {}
function timeStampTodate(tsArr = []) {
  return tsArr.map((ts) => new Date(ts * 1000).toLocaleDateString());
}

export { removeAKeyInAnObj, timeStampTodate };
