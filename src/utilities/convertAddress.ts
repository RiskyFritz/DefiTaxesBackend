/* eslint-disable prettier/prettier */

import converter from 'bech32-converting';

const convertToOneAddress = (address: string): string => {
  const converted = converter('one').toBech32(address) as string;
  return converted;
};

export default convertToOneAddress;
