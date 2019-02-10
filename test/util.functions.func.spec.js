import { html } from "../src/util/functions/func";

test('func - html', () => {
    var str = html ``
    expect(str).toEqual('');
});


test('func - html 2', () => {
    var str = html`${'a'}`
    expect(str).toEqual('a');
});

test('func - html short tag ', () => {
    var str = html`<Image a='1' /> <Image b='2' />`
    expect(str).toEqual(`<Image a='1' ></Image> <Image b='2' ></Image>`);
});

