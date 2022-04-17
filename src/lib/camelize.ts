const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

type CamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<CamelCase<U>>}` : S;

const camelCase = <T extends string>(s: T): CamelCase<T> =>
  s
    .split('_')
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join('') as never;

type CamelizeKeys<T> = T extends readonly never[]
  ? { [K in keyof T]: CamelizeKeys<T[K]> }
  : {
      [K in keyof T as K extends string ? CamelCase<K> : K]: CamelizeKeys<T[K]>;
    };

export const camelizeKeys = <T>(obj: T): CamelizeKeys<T> => {
  if (Array.isArray(obj)) return obj.map((v) => camelizeKeys(v)) as unknown as CamelizeKeys<T>;
  if (isObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {} as CamelizeKeys<T>,
    );
  }
  return obj as unknown as CamelizeKeys<T>;
};

type SnakeToCamelCase<T extends string> = T extends `${infer R}_${infer U}`
  ? `${R}${Capitalize<SnakeToCamelCase<U>>}`
  : T;

/**
 * Convert snake_case key object to camelCase key object
 * @example
 * ```typescript
 * type SnakeUser = {
 *   user_id: string,
 *   birth_year: number
 *   is_married: boolean,
 * }
 *
 * type CamelUser = SnakeToCamel<SnakeUser>
 * type CamelUser = {
 *   userId: string;
 *   birthYear: number;
 *   isMarried: boolean;
 * }
 * ```
 */
export type SnakeToCamel<T extends object> = {
  [K in keyof T as `${SnakeToCamelCase<string & K>}`]: T[K] extends object
    ? SnakeToCamel<T[K]>
    : T[K] extends unknown[]
    ? 'this is array'
    : // : T[K];
      '失敗';
};

type ThisIsXType<T> = T extends string
  ? 'this is string'
  : T extends number
  ? 'this is number'
  : T extends boolean
  ? 'this is boolean'
  : T extends Array<T>
  ? 'this is array'
  : never;

type SnakeType = {
  // snake_number: number;
  // snake_string: string;
  // snake_boolean: boolean;
  // snake_bigint: bigint;
  // snake_undefined: undefined;
  // snake_null: null;
  // snake_symbol: symbol;
  // snake_nullable?: string;
  // snake_object: {
  //   snake_number: number;
  //   snake_string: string;
  //   snake_boolean: boolean;
  //   snake_bigint: bigint;
  //   snake_undefined: undefined;
  //   snake_null: null;
  //   snake_symbol: symbol;
  //   snake_nullable?: string;
  // };
  snake_array_number: number[];
  // snake_array_string: string[];
  // snake_array_boolean: boolean[];
  // snake_array_bigint: bigint[];
  // snake_array_undefined: undefined[];
  // snake_array_null: null[];
  // snake_array_symbol: symbol[];
  // snake_array_nullable?: string[];
  // snake_array_object: [
  //   snake_object: {
  //     snake_number: number;
  //     snake_string: string;
  //     snake_boolean: boolean;
  //     snake_bigint: bigint;
  //     snake_undefined: undefined;
  //     snake_null: null;
  //     snake_symbol: symbol;
  //     snake_nullable?: string;
  //   },
  // ];
};
type CamelType = SnakeToCamel<SnakeType>;
type CamelType2 = ThisIsXType<SnakeType>;

const tt: CamelType = {
  snakeArrayNumber: undefined,
};
