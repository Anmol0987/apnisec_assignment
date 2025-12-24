type RateLimitEntry = {
  count: number;
  resetAt: number;
};
export class RateLimiter {
  private static store = new Map<string, RateLimitEntry>();

  private static WINDOW_MS = 15 * 60 * 1000;
  private static LIMIT = 100;

  static check(key: string) {
    const now = Date.now();
    const entry = this.store.get(key);
    if (!entry || now > entry.resetAt) {
      this.store.set(key, {
        count: 1,
        resetAt: now + this.WINDOW_MS,
      });
      return {
        remaining: this.LIMIT - 1,
        resetAt: now + this.WINDOW_MS,
      };
    }
    if (entry.count >= this.LIMIT) {
      throw new Error("RATE LIMIT EXCEED");
    }

    entry.count++;
    return {
      remaining: this.LIMIT - entry.count,
      resetAt: entry.resetAt,
    };
  }
}
