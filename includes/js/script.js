"use strict";

/* 
1) Переписать функцию-конструктор MyArray на классы. Дописать методы shift, unshift.
 */

class MyArray {
  constructor(...args) {
    this.length = 0;
    for (let i = 0; i < args.length; i++) {
      this[this.length++] = arguments[i];
    }
  }
  push(...args) {
    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        this[this.length] = args[i];
        this.length++;
      }
    }
    return this.length;
  }
  pop() {
    if (this.length > 0) {
      console.log(this[this.length - 1]);
      delete this[this.length - 1];
      this.length--;
    }
  }
  forEach(callback) {
    if (this.length > 0) {
      for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
      }
    }
  }
  concat(array) {
    let result = new MyArray();

    for (let i = 0; i < this.length; i++) {
      result.push(this[i]);
    }

    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
    }

    return result;
  }

  flat(depth = 1) {
    if (depth < 0) {
      console.error("depth must be a positive value");
      return;
    }
    let newArr = new MyArray();

    if (depth === 0) {
      return this;
    }

    for (let i = 0; i < this.length; i++) {
      if (Array.isArray(this[i])) {
        const buffer = this[i].flat(depth - 1);

        newArr = newArr.concat(buffer);
      } else if (this[i] !== undefined) {
        newArr.push(this[i]);
      }
    }

    return newArr;
  }

  unshift(...args) {
    const bufferThis = this;
    let bufferArr = new MyArray();
    bufferArr = bufferArr.concat(args).concat(this);
    let counter = 0;
    bufferArr.forEach((item) => {
      this[counter++] = item;
      this.length = counter;
    });
    return bufferArr.length;
  }

  shift() {
    const buffer = this;
    if (!this.length) {
      throw new RangeError("Array is empty. .shift() can`t be processed");
    }

    if (this.length === 1) {
      const result = this[0];
      delete this[--this.length];
      return result;
    }
    const result = this[0];
    delete this[0];
    this.forEach((item, index) => {
      if (index > 0) {
        return (this[index - 1] = item);
      }
    });
    delete this[--this.length];
    return result;
  }
}

/* 2) Реализовать класс RangeValidator, со следующими свойствами:
    ■  from (number);
    ■  to (number);
Реализовать getter'ы и setter'ы для обоих свойств
Реализовать getter range, который будет возвращать массив с двумя числами диапазона
Реализовать метод validate, который будет принимать число и проверить входит ли число в указанный диапазон.
 */

class RangeValidator {
  constructor(from, to) {
    this._from = from;
    this._to = to;
  }

  get from() {
    return this._from;
  }

  set from(value) {
    this._from = value;
  }

  get to() {
    return this._to;
  }

  set to(value) {
    this._to = value;
  }

  get range() {
    return [this.from, this.to];
  }

  validate(value) {
    return this.from <= value && this.to >= value;
  }
}

//Задачи по массивам

//3. Сделайте функцию, которая определяет, есть в массиве заданный элемент или нет.

function isFindInArray(value, array) {
  return value === array.find((item) => item === value);
}

/* 4. Дано число. Сложите его цифры. 
Если сумма получилась более 9-ти, опять сложите его цифры. 
И так, пока сумма не станет однозначным числом (9 и менее).

 */

function plusNumbers(value) {
  if (value <= 9) {
    return value;
  }
  let temp = value % 10;
  let result = (value - temp) / 10 + (value % 10);
  return plusNumbers(result);
}

//5.  Напишите функцию, которая возвращает массив состоящий только из уникальных элементов из каждого массива

function uniqueValueInArray(arr) {
  const newArr = [];
  arr.forEach((array) => newArr.push(...array.filter((value1)=>array.filter((value2)=>value1===value2).length===1)));

  return newArr;
}

const arr = [
  [1, 1, 1, 1, 3, 5, 6, 78, 3],
  [1, 3, 4, 6, 8, 9, 0, 0, 8, 7, 6, 4, 43, 4],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11],
];

console.log(uniqueValueInArray(arr));
