type Described<T> = {
    [K in keyof T]: {
        readonly id: T[K];
        readonly description: string;
    }
}[keyof T];

// tslint:disable-next-line: ban-types
type NonFunctional<T> = T extends Function ? never : T;

/**
 * @param enumeration - enum object
 * @param separatorRegex - separator regex default is _
 * @returns - new object {id: any, description: string}
 */
/*
* Example:
  export enum GoalProgressMeasurements {
      Percentage = 1,
      Numeric_Target = 2,
      Completed_Tasks = 3,
      Average_Milestone_Progress = 4,
      Not_Measured = 5
  }

  console.log(enumToDescribedArray(GoalProgressMeasurements))
  // Produces:
  [
      {id: 1, description: "Percentage"},
      {id: 2, description: "Numeric Target"},
      {id: 3, description: "Completed Tasks"},
      {id: 4, description: "Average Milestone Progress"},
      {id: 5, description: "Not Measured"}
  ]
*/
export function enumToDescribedArray<T>(enumeration: T, separatorRegex: RegExp = /_/g): Described<T>[] {
    return (Object.keys(enumeration) as Array<keyof T>)
        .filter(key => isNaN(Number(key)))
        .filter(key => typeof enumeration[key] === 'number' || typeof enumeration[key] === 'string')
        .map(key => ({
            id: enumeration[key],
            description: String(key).replace(separatorRegex, ' '),
        }));
}

/**
 * @param enumeration - enum object
 * @returns - new object {id: any}
 * Example:
 */
/*
1. String/ numeric enum
enum Colors1 {
  WHITE = 0,
  BLACK = 1
}
console.log(Object.values(Colors1)); // ['WHITE', 'BLACK', 0, 1]
console.log(enumToArray(Colors1));   // [0, 1]

2. Heterogenous enum
enum Colors4 {
  WHITE = "white",
  BLACK = 0
}
console.log(Object.values(Colors4)); // ["BLACK", "white", 0]
console.log(enumToArray(Colors4));   // ["white", 0]
*/
export function enumToArray<T>(enumeration: T): NonFunctional<T[keyof T]>[] {
    return Object.keys(enumeration)
        .filter(key => isNaN(Number(key)))
        .map(key => enumeration[key])
        .filter(value => typeof value === 'number' || typeof value === 'string');
}

