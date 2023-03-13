/*
Итератор - это объект, с помощью которого можно перебирать структуры (коллекции), 
не зная их внутреннего устройства

Итератор имеет 
- метод next(), который возвращает следующий элемент объекта (коллекции)
- свойство done, которое показывает, завершен ли обход объекта (коллекции)
*/

const numbers = [1, 2, 3, 4, 5];

// создадим итератор, который будет перебирать этот массив
const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); //--> {value: 1, done: false}
console.log(iterator.next()); //--> {value: 2, done: false}
console.log(iterator.next()); //--> {value: 3, done: false}
console.log(iterator.next()); //--> {value: 4, done: false}
console.log(iterator.next()); //--> {value: 5, done: false}
console.log(iterator.next()); //--> {value: undefined, done: true}

for(const num of numbers) {
    console.log(num);
}


const myIterator = {
    data: [10, 20, 30, 40, 50],
    currentIndex: 0,
    next() {
        if(this.currentIndex < this.data.length) {
            return {
                value: this.data[this.currentIndex++],
                done: false
            };
        } else {
            return {
                value: undefined,
                done: true
            }
        }
    }
};

console.log(myIterator.next()); //--> {value: 10, done: false}
console.log(myIterator.next()); //--> {value: 20, done: false}
console.log(myIterator.next()); //--> {value: 30, done: false}
console.log(myIterator.next()); //--> {value: 40, done: false}
console.log(myIterator.next()); //--> {value: 50, done: false}
console.log(myIterator.next()); //--> {value: undefined, done: true}

const myObject = {
    name: 'Jane',
    surname: 'Doe',
    age: 30,
    city: 'New York'
};

const myObjectIterator = {
    currentKey: Object.keys(myObject)[0],
    next() {
        const keys = Object.keys(myObject);
        const currentIndex = keys.indexOf(this.currentKey);
        if(currentIndex < keys.length && currentIndex != -1) {
            const key = keys[currentIndex];
            this.currentKey = keys[currentIndex + 1];
            return {
                value: myObject[key],
                done: false
            }
        } else {
            return {
                value: undefined,
                done: true
            }
        }
    }
};

console.log(myObjectIterator.next()); //--> {value: 'Jane', done: false}
console.log(myObjectIterator.next()); //--> {value: 'Doe', done: false}
console.log(myObjectIterator.next()); //--> {value: 30, done: false}
console.log(myObjectIterator.next()); //--> {value: 'New York', done: false}
console.log(myObjectIterator.next()); //--> {value: undefined, done: true}


/* Генераторы */

function* myGenerator() {
    yield 1; 
    // yield используется, чтобы приостановить функцию-генератор и вернуть промежуточный результат
    yield 2;
    yield 3;
};

const gen = myGenerator();

console.log(gen.next().value); // value: 1
console.log(gen.next().value); // value: 2
console.log(gen.next().value); // value: 3
console.log(gen.next()); // value: undefined, done: true

function* mySecondGenerator(start, end) {
    for(let i = start; i <= end; i++) {
        yield i;
    }
};

const gen2 = mySecondGenerator(1, 3);

console.log(gen2.next().value);


function* myThirdGenerator() {
    let name = yield;
    console.log(`Hi, ${name}`);
};

const gen3 = myThirdGenerator();

gen3.next(); // запускаем генератор

gen3.next('Ivan'); // передаем значение генератору


/*
function* fetchUrl(url) {
    try {
        const res = yield fetch(url);
        const data = yield res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

const url = 'https://randomuser.me/api';
const iterator2 = fetchUrl(url);

iterator2.next().value
.then((res) => iterator2.next(res).value)
.then((data) => console.log(data));
*/

function* fetchUrl(url) {
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

const url = 'https://randomuser.me/api';
const iterator2 = fetchUrl(url);

iterator2.next().value
.then((response) => iterator2.next(response).value)
.then((data) => console.log(data));


/*
Написати функцію-гененратор, яка генерує числа від 0 до 100.
З кожним викликом число інкрементується на одиницю.

За допомогою написанного генератора - скласти (знайти їх суму) числа 
від 0 до 100.
*/


// Mentor's solution -->

function* newGenerator() {
    let number = 0;
    while(number <= 100) {
        yield number++;
    }
};

let sum = 0;
for(let number of newGenerator()) {
    sum += number
}
console.log(sum)