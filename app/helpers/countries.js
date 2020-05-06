import { helper } from '@ember/component/helper';

function countryNameFromCode([countries, code]) {
  const country = countries.filter(c => c.code === code)[0];
  return country.name;
}

export default helper(countryNameFromCode);
