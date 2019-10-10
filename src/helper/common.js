/**
 * key值切换value值
 * 参数说明：
 * key为需要切换的key值(必传)
 * baseList为切换依据的数组，必须为数组，且不能为空数组，数组对象必须有两对键值对(必传)
 **/
const keySwitchValue = (param, baseList) => {
  //判断baseList是否是数组
  const isarr = Array.isArray(baseList);
  const length = baseList.length;
  // 获取数组对象的key，组合成一个数组
  const keyList = Object.keys(baseList[0]);
  let value = '';
  // baseList必须为数组，且不能为空数组，数组对象必须有两对键值对
  if (isarr && length > 0 && keyList.length === 2) {
    baseList.forEach((obj)=> {
      keyList.forEach((item, index) => {
        if (obj[item] === param) {
          value = index === 0 ? obj[keyList[1]] : obj[keyList[0]];
        }
      });
    });
  } else {
    console.log('keySwitchValue函数传参错误，请传入非空数组！');
  }
  return value;
};

export {
  keySwitchValue
};
