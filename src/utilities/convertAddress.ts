/* eslint-disable prettier/prettier */
import { fromBech32, toBech32 } from '@harmony-js/crypto';

const convertToOneAddress = (address: string): string => {
  const converted = toBech32(address);
  return converted;
};

export default convertToOneAddress;
