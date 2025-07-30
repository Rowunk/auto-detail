// src/utils/__tests__/sorting.test.ts
import { sortServiceKeys } from '../sorting';
import { serviceDatabase } from '../../services/serviceDatabase';

describe('sortServiceKeys', () => {
    it('orders by CATEGORY_PRECEDENCE across categories', () => {
        // pick one from each of a few categories, in reverse-precedence order
        const keys = [
            'headliner-cleaning',   // interior (precedence index 3)
            'snow-foam',            // wash     (0)
            'paint-sealant',        // protection (4)
            'wheel-cleaning-basic', // wheels   (1)
        ].reverse();

        const sorted = sortServiceKeys(keys);
        const categories = sorted.map(k => serviceDatabase[k].category);
        expect(categories).toEqual([
            'wash',    // snow-foam
            'wheels',  // wheel-cleaning-basic
            'interior',// headliner-cleaning
            'protection'// paint-sealant
        ]);
    });

    it('alphabetically sorts within the same category', () => {
        // two 'exterior' services, names begin with 'A' vs 'B'
        const pair = ['iron-decon', 'bug-removal']; // bug vs iron
        const sorted = sortServiceKeys(pair);
        expect(sorted).toEqual(['bug-removal', 'iron-decon']);
    });

    it('returns a new array and is pure (does not mutate input)', () => {
        const input = ['hand-wash', 'door-jambs', 'final-rinse'];
        const copy = [...input];
        sortServiceKeys(input);
        expect(input).toEqual(copy);
    });
});
