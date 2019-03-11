import { Length, Position } from "../../src/editor/unit/Length";

beforeEach(() => {
    

})

afterEach( () => {
    
})

test('Length - new Length', () => {
    var unit = new Length(10, 'px');
    expect(unit+"").toEqual('10px');

    var newUnit = unit.plus(10);
    expect(newUnit.value).toEqual(20)

    newUnit.div(10);
    expect(newUnit.value).toEqual(2)

    newUnit.mod(3);
    expect(newUnit.value).toEqual(2)    
});

test('Length - px Length', () => {
    var pxUnit = Length.px(10)
    expect(pxUnit + "").toEqual('10px')

    var newUnit = pxUnit.plus(Length.px(100))
    expect(newUnit.value).toEqual(110);

    var value = newUnit.toPercent(100)
    expect(value+"").toEqual("110%")
    expect(value.isPercent()).toEqual(true);

    value.multi(3);
    expect(+value).toEqual(330);
    expect(value+"").toEqual('330%')
})

test('Length - Length.create', () => {
    var length = Length.create(10)

    expect(length.value).toEqual('10');

    var length = Length.create({
        unit: '%',
        percent: 0
    })
    expect(length + "").toEqual('0%');

    var length = Length.create(Position.CENTER);
    expect(length.value).toEqual('center')
    expect(length.isString()).toEqual(true);
})

test('Length - static method', () => {
    expect(Position.CENTER + "").toEqual('center');
    expect(Position.TOP + "").toEqual('top');
    expect(Position.BOTTOM + "").toEqual('bottom');
    expect(Position.LEFT + "").toEqual('left');
    expect(Position.RIGHT + "").toEqual('right');
})

test('Length - percent to em', () => {
    var length = Length.percent(10);
    expect(+length.toEm(100)).toEqual(0.625);
})