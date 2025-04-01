import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        const firstClassStr = 'someClass';
        expect(classNames(firstClassStr)).toBe(firstClassStr);
    });

    test('with additional class', () => {
        const expectedString = 'someClass class1 class2';
        expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(
            expectedString,
        );
    });

    test('with mods', () => {
        const expectedString = 'someClass class1 class2 hovered scrollable';
        expect(
            classNames('someClass', { hovered: true, scrollable: true }, [
                'class1',
                'class2',
            ]),
        ).toBe(expectedString);
    });

    test('with mods false', () => {
        const expectedString = 'someClass class1 class2 hovered';
        expect(
            classNames(
                'someClass',
                {
                    hovered: true,
                    scrollable: false,
                },
                ['class1', 'class2'],
            ),
        ).toBe(expectedString);
    });

    test('with mods undefined', () => {
        const expectedString = 'someClass class1 class2 hovered';
        expect(
            classNames(
                'someClass',
                {
                    hovered: true,
                    scrollable: undefined,
                },
                ['class1', 'class2'],
            ),
        ).toBe(expectedString);
    });
});
