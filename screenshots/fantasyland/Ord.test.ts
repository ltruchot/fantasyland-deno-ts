import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { Ord, Size } from "./Ord.ts";

Deno.test("Ord equality", () => {
  const testEquals = <T>(a: Ord<T>, b: Ord<T>, c: Ord<T>) => {
    const reflexivity = a.equals(a);
    const commutativity = a.equals(b) === b.equals(a);
    const transitivity = a.equals(b) && b.equals(c) ? a.equals(c) : true;
    assertEquals(reflexivity, true);
    assertEquals(commutativity, true);
    assertEquals(transitivity, true);
  };
  const testLte = <T>(a: Ord<T>, b: Ord<T>, c: Ord<T>) => {
    const equality = a.lte(a);
    const lesserThan = a.lte(b);
    const greaterThan = !c.lte(b);
    assertEquals(equality, true);
    assertEquals(lesserThan, true);
    assertEquals(greaterThan, true);
  };

  const s = new Size("S");
  const l = new Size("L");
  const xl = new Size("XL");
  testLte(s, l, xl);
});
