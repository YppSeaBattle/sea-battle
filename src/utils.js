import { cbDmg } from './resources/constants';

export function scaleDmg(dmg, enemyCbSize) {
  const newDmg = dmg/cbDmg[enemyCbSize];
  return Math.round(newDmg * 100) / 100;
}