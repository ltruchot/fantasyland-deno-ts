
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { Bool, Coord, Setoid } from "./Setoid.ts";

Deno.test("Setoid equality", () => {
    const testEquals = <T>(a: Setoid<T>, b: Setoid<T>, c: Setoid<T>) => {
        const reflexivity = a.equals(a);
        const commutativity = a.equals(b) === b.equals(a);
        const transitivity = a.equals(b) && b.equals(c) ? a.equals(c) : true;
        assertEquals(reflexivity, true);
        assertEquals(commutativity, true);
        assertEquals(transitivity, true);
    }

    const c1 = new Coord(1,2);
    const c2 = new Coord(3,4);
    const c3 = new Coord(5,6);
    testEquals(c1, c1, c1);
    testEquals(c1, c2, c3);
    testEquals(c2, c1, c1);
    testEquals(c3, c2, c1);
});



