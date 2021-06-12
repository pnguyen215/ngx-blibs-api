import { Injectable } from '@angular/core';
import { BlibsBaseUtilsService } from './blibs-base-utils.service';

@Injectable({
  providedIn: 'root'
})
export class BlibsCollectionUtilsService {

  constructor(
    private blibsBaseUtilsService: BlibsBaseUtilsService
  ) { }

  countFrequencies(arrays: any, lengthOfArray: number): Map<any, any> {
    const map = new Map();
    const result = new Map();
    const keys = [];
    // Traverse through array elements and
    // count frequencies
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

    // Traverse through map and print frequencies
    keys.forEach((key) => {
      // document.write(key + ' ' + map.get(key) + '<br>');
      result.set(key, map.get(key));
    });

    return result;
  }

  extractUrl(url: string): Map<any, any> {
    if (!this.blibsBaseUtilsService.areNotNull(url)) {
      return new Map();
    }
    const map = new Map();
    const parser = new URL(url);

    map.set('protocol', parser.protocol);
    map.set('host', parser.host);
    map.set('port', parser.port);
    map.set('hostname', parser.hostname);
    map.set('querySearch', parser.search);
    map.set('queryParams', parser.searchParams);

    return map;
  }

  isArrayEmpty(arrays: any): boolean {
    if (!Array.isArray(arrays)) {
      return false;
    }

    return arrays.length === 0;
  }

  iterateMap(map: Map<any, any>): void {
    map.forEach((value, key) => {
      console.log(key + '=' + this.blibsBaseUtilsService.toJson(value));
    });
  }

  iterateMapOverKeys(map: Map<any, any>): any[] {
    const result = [];
    Array.from(map.keys()).forEach(key => {
      result.push(key);
    });

    return result;
  }

  iterateMapOverValues(map: Map<any, any>): any[] {
    const result = [];
    Array.from(map.values()).forEach(value => {
      result.push(value);
    });

    return result;
  }
}
