import "server-only";
import { randomBytes } from "crypto";
import { getMongoDb } from "@/lib/mongodb";

/** Generate a cryptographically random hex token. */
export function generateVerificationToken(): string {
  return randomBytes(32).toString("hex");
}

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Store a verification token in the DB, linked to a user.
 * Deletes any existing unexpired token for this user first.
 */
export async function createVerificationToken(
  userId: string,
  email: string,
): Promise<string> {
  const db = await getMongoDb();
  const token = generateVerificationToken();
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MS);

  // Upsert: replace any existing token for this user
  await db.collection("verification_tokens").updateOne(
    { identifier: userId },
    {
      $set: {
        token,
        identifier: userId,
        email,
        expires: expiresAt,
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  return token;
}

/**
 * Verify a token: look it up, check expiry, mark user's emailVerified, delete token.
 * Returns the user's email on success, or null if invalid/expired.
 */
export async function verifyEmailToken(
  token: string,
): Promise<{ email: string } | null> {
  const db = await getMongoDb();

  const record = await db.collection("verification_tokens").findOne({ token });
  if (!record) return null;

  if (new Date() > record.expires) {
    // Clean up expired token
    await db.collection("verification_tokens").deleteOne({ _id: record._id });
    return null;
  }

  const userId = record.identifier;

  // Mark user as verified
  await db.collection("users").updateOne(
    { _id: userId as any },
    { $set: { emailVerified: new Date() } },
  );

  // Delete the used token
  await db.collection("verification_tokens").deleteOne({ _id: record._id });

  return { email: record.email };
}
