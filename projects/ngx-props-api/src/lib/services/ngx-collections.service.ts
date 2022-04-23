import { Injectable } from '@angular/core';
import { toJson } from '../utils/propsJsonUtils';

@Injectable({
  providedIn: 'root'
})
export class NgxCollectionsService {

  constructor() { }

  isEmpty(arrays: any): boolean {

    if (!Array.isArray(arrays)) {
      return false;
    }

    return arrays.length === 0;
  }

  isNotEmpty(arrays: any): boolean {
    return !this.isEmpty(arrays);
  }

  isEmptyMap(map: Map<any, any>): boolean {
    return map === null || map.size === 0;
  }

  isNotEmptyMap(map: Map<any, any>): boolean {
    return !this.isEmptyMap(map);
  }

  isEmptySet(set: Set<any>): boolean {
    return set === null || set.size === 0;
  }

  isNotEmptySet(set: Set<any>): boolean {
    return !this.isEmptySet(set);
  }

  iterateMap(map: Map<any, any>): void {

    if (this.isEmptyMap(map)) {
      console.warn('iterateMap()', 'map is null');
      return;
    }

    map.forEach((value, key) => {
      console.log('key=', key, ',value=', toJson(value));
    });
  }

  ofKeysFromMap(map: Map<any, any>): any[] {
    let result = [];

    if (this.isEmptyMap(map)) {
      console.warn('ofKeysFromMap()', 'map is null');
      return result;
    }

    Array.from(map.keys()).forEach(key => {
      result.push(key);
    });

    return result;
  }

  ofValuesFromMap(map: Map<any, any>): any[] {
    let result = [];

    if (this.isEmptyMap(map)) {
      console.warn('ofValuesFromMap()', 'map is null');
      return result;
    }

    Array.from(map.values()).forEach(value => {
      result.push(value);
    });

    return result;
  }

  countFrequencies(arrays: any, lengthOfArray: number): Map<any, any> {
    let map = new Map();
    let result = new Map();
    let keys = [];

    if (this.isEmpty(arrays)) {
      console.warn('countFrequencies()', 'arrays is null');
      return map;
    }

    for (let i = 0; i < lengthOfArray; i++) {
      if (map.has(arrays[i])) {
        map.set(arrays[i], map.get(arrays[i]) + 1);
      } else {
        map.set(arrays[i], 1);
      }
    }

    map.forEach((value, key) => {
      keys.push(key);
    });
    keys.sort((a, b) => a - b);

    keys.forEach((key) => {
      result.set(key, map.get(key));
    });

    return result;
  }
}
