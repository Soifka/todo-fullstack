function sum(a, b) {
    return Number(a) + Number(b);
}

describe('sum tests', () => {
    test('add 5 to 10 expect 15', () => {
    expect(sum(5, 10)).toBe(15);
    })

    test('add 2:string to 3:string expect 5', () => {
        expect(sum('2', '3')).toBe(5);
    })

    test('add 0.1 to 0.2 expect 0.3', () => {
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    })
})

