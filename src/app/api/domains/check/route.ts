import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const TLD_PRICES: Record<string, { first: number; renew: number; popular?: boolean }> = {
  com: { first: 9.99, renew: 14.99, popular: true },
  net: { first: 11.99, renew: 16.99 },
  org: { first: 10.99, renew: 15.99 },
  io: { first: 39.99, renew: 49.99, popular: true },
  dev: { first: 14.99, renew: 18.99, popular: true },
  app: { first: 17.99, renew: 21.99 },
  co: { first: 24.99, renew: 29.99 },
  ai: { first: 79.99, renew: 89.99, popular: true },
  xyz: { first: 2.99, renew: 12.99 },
  me: { first: 19.99, renew: 24.99 },
};

const DOMAIN_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { domain } = (await req.json().catch(() => ({}))) as { domain?: string };
  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const raw = domain.toLowerCase().trim();
  const parts = raw.split(".");
  if (parts.length < 2) {
    return NextResponse.json(
      { error: "Please include a TLD, e.g. example.com" },
      { status: 400 },
    );
  }

  const sld = parts[0];
  const tld = parts.slice(1).join(".");
  if (!DOMAIN_RE.test(sld)) {
    return NextResponse.json(
      { error: "That doesn't look like a valid domain name" },
      { status: 400 },
    );
  }
  if (!TLD_PRICES[tld]) {
    return NextResponse.json(
      {
        error: `We don't support .${tld} yet. Try ${Object.keys(TLD_PRICES).slice(0, 6).join(", ")}.`,
        supported: Object.keys(TLD_PRICES),
      },
      { status: 400 },
    );
  }

  // Deterministic "is it taken" answer (no real WHOIS in this demo)
  const seed = [...raw].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const available = seed % 3 !== 0;
  const price = TLD_PRICES[tld];

  // Suggest a few alternates
  const alternates = available
    ? [
        `${sld}-hq.${tld}`,
        `get${sld}.com`,
        `${sld}hq.com`,
        `try${sld}.io`,
      ]
    : [`${sld}-hq.${tld}`, `get${sld}.com`, `${sld}hq.com`];

  return NextResponse.json({
    domain: raw,
    available,
    priceFirst: price.first,
    priceRenew: price.renew,
    popular: !!price.popular,
    alternates,
  });
}
