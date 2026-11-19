const BLACKJACK = 21;

const CARDS = new Map<string, { value: number; priority: number }>([
  ["ace", { value: 11, priority: 0 }],
  ["king", { value: 10, priority: 1 }],
  ["queen", { value: 10, priority: 2 }],
  ["jack", { value: 10, priority: 3 }],
  ["ten", { value: 10, priority: 4 }],
  ["nine", { value: 9, priority: 5 }],
  ["eight", { value: 8, priority: 6 }],
  ["seven", { value: 7, priority: 7 }],
  ["six", { value: 6, priority: 8 }],
  ["five", { value: 5, priority: 9 }],
  ["four", { value: 4, priority: 10 }],
  ["three", { value: 3, priority: 11 }],
  ["two", { value: 2, priority: 12 }],
]);

function getCard(name: string): { value: number; priority: number } {
  const card = CARDS.get(name);
  if (!card) {
    throw new Error(`Unknown card: ${name}`);
  }
  return card;
}

function getStatus(total: number): "above" | "below" | "blackjack" {
  return total > BLACKJACK
    ? "above"
    : total === BLACKJACK
      ? "blackjack"
      : "below";
}

function getHighestCardName(
  dealtCards: string[],
  highAcesCount: number,
): string {
  const nonAces = dealtCards.filter((name) => name !== "ace");

  if (highAcesCount > 0 || nonAces.length === 0) {
    return "ace";
  }

  return dealtCards
    .filter((name) => name !== "ace")
    .reduce((best, name) =>
      getCard(name).priority < getCard(best).priority ? name : best,
    );
}

export function blackjackHighest(dealtCards: string[]): string {
  if (dealtCards.length === 0) {
    throw new Error("At least one card is required");
  }

  let total = dealtCards.reduce((sum, name) => sum + getCard(name).value, 0);
  let highAcesCount = dealtCards.filter((name) => name === "ace").length;

  while (total > BLACKJACK && highAcesCount > 0) {
    total -= 10;
    highAcesCount--;
  }

  return `${getStatus(total)} ${getHighestCardName(dealtCards, highAcesCount)}`;
}
