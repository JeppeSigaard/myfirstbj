import { describe, expect, test } from "vitest";
import { blackjackHighest } from "./BlackjackHighest";

describe("BlackjackHighest", () => {
  test("Play cards", () => {
    expect(blackjackHighest(["king", "ace", "two"])).toBe("below king");
    expect(blackjackHighest(["queen", "ace", "ten"])).toBe("blackjack queen");
    expect(blackjackHighest(["queen", "ace", "seven"])).toBe("below queen");
    expect(blackjackHighest(["five", "six", "king"])).toBe("blackjack king");
    expect(blackjackHighest(["five", "eight", "jack"])).toBe("above jack");
    expect(
      blackjackHighest(["four", "four", "four", "four", "four", "ace"]),
    ).toBe("blackjack four");
    expect(blackjackHighest(["three", "eight", "queen"])).toBe(
      "blackjack queen",
    );
    expect(blackjackHighest(["four", "seven", "ace"])).toBe("below seven");
    expect(blackjackHighest(["jack", "ace"])).toBe("blackjack ace");
    expect(
      blackjackHighest(["two", "three", "four", "five", "six", "ace"]),
    ).toBe("blackjack six");
    expect(blackjackHighest(["ace", "ace", "four", "five"])).toBe(
      "blackjack ace",
    );

    expect(
      blackjackHighest([
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "ace",
        "five",
      ]),
    ).toBe("blackjack five");
  });

  test("ties and order", () => {
    expect(blackjackHighest(["ten", "jack"])).toBe("below jack");
    expect(blackjackHighest(["jack", "ten"])).toBe("below jack");
    expect(blackjackHighest(["jack", "queen", "king"])).toBe("above king");
  });

  test("aces", () => {
    expect(blackjackHighest(["king", "queen", "ace", "five"])).toBe(
      "above king",
    );
    expect(blackjackHighest(["ace", "ace", "king", "queen"])).toBe(
      "above king",
    );
    expect(blackjackHighest(["ace"])).toBe("below ace");
    expect(blackjackHighest(["ace", "ace"])).toBe("below ace");
    expect(blackjackHighest(Array(21).fill("ace"))).toBe("blackjack ace");
  });

  test("single card", () => {
    expect(blackjackHighest(["two"])).toBe("below two");
  });

  test("invalid input", () => {
    expect(() => blackjackHighest(["joker"])).toThrow("Unknown card: joker");
    expect(() => blackjackHighest([])).toThrow("At least one card is required");
  });
});
