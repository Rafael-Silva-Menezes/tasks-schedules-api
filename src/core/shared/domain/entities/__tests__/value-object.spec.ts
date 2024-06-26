import { ValueObject } from '../value-object';

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    readonly value1: string,
    readonly value2: number,
  ) {
    super();
  }
}

describe('ValueObject Unit Tests', () => {
  test('should return true if two objects are equal', () => {
    const valueObject1 = new StringValueObject('value1');
    const valueObject2 = new StringValueObject('value1');
    expect(valueObject1.equals(valueObject2)).toBe(true);

    const complexValueObject1 = new ComplexValueObject('value1', 1);
    const complexValueObject2 = new ComplexValueObject('value1', 1);
    expect(complexValueObject1.equals(complexValueObject2)).toBe(true);
  });

  test('should return true if two objects are not equal', () => {
    const valueObject1 = new StringValueObject('test');
    const valueObject2 = new StringValueObject('test2');
    expect(valueObject1.equals(valueObject2)).toBe(false);
    expect(valueObject1.equals(null as any)).toBe(false);
    expect(valueObject1.equals(undefined as any)).toBe(false);

    const complexValueObject1 = new ComplexValueObject('test', 1);
    const complexValueObject2 = new ComplexValueObject('test', 2);
    expect(complexValueObject1.equals(complexValueObject2)).toBe(false);
    expect(complexValueObject1.equals(null as any)).toBe(false);
    expect(complexValueObject2.equals(undefined as any)).toBe(false);
  });
});
