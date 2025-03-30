async function fetchData(url, options, cb) {
  try {
    let res = await fetch(url, options);
    let data = await res.json();
    cb(data);
  } catch (error) {
    // console.log("Error in fetching data,", cb);
    //console.log(error);
    cb(error);
  }
}
export default fetchData;
