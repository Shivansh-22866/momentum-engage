import { MomentumData, AnomalyAlert } from "@/types/agent";
import { generateObject } from 'ai';
import { groq } from '@ai-sdk/groq';
import { z } from 'zod';

export async function analyzeWithGroq(insights: string) {
  const schema = z.object({
    summary: z.string(),
    outlook: z.enum(['bullish', 'bearish', 'neutral']),
    keySignals: z.array(z.string()),
    riskLevel: z.enum(['low', 'medium', 'high']),
    confidence: z.number().min(0).max(1),
    reason: z.string(),
    review: z.string()
  });

  const result = await generateObject({
    model: groq('llama3-8b-8192'),
    schema,
    prompt: `
You are an expert Web3 momentum analyst. Given the multi-channel data and recent anomalies, return a structured JSON object with these fields:

- summary: A concise overview of current project momentum.
- outlook: 'bullish' | 'bearish' | 'neutral'
- keySignals: array of key metric changes (e.g., spike in commits, drop in liquidity)
- riskLevel: 'low' | 'medium' | 'high'
- confidence: float from 0–1 representing your analytical certainty
- reason: a multi-paragraph explanation combining GitHub, Twitter, Onchain, and Community data along with anomaly patterns.
- review: go through all data streams and tell which one of them might be a weak point

Data:
${insights}
`
  });

  return result.object;
}

export function formatMomentumContext(data: MomentumData, alerts: AnomalyAlert[] = []): string {
  const alertText = alerts.length > 0
    ? alerts.map(alert => `- [${alert.metric}] ${alert.description} (Value: ${alert.value}, Expected: ${alert.expectedRange.join(" - ")})`).join("\n")
    : 'No recent anomaly alerts.';

  return `
# 🔍 Momentum Analysis Context

## 📦 GitHub Activity
- Stars: ${data.github.stars}
- Forks: ${data.github.forks}
- Commits: ${data.github.commits}
- Contributors: ${data.github.contributors}
- Issues: ${data.github.issues}
- Pull Requests: ${data.github.pullRequests}
- Releases: ${data.github.releases}
- Velocity: ${data.github.velocity.toFixed(2)} commits/day

## 🐦 Twitter Signals
- Mentions: ${data.twitter.mentions}
- Sentiment: ${data.twitter.sentiment.toFixed(2)}
- Engagement: ${data.twitter.engagement}
- Followers: ${data.twitter.followers}
- Likes: ${data.twitter.likes}
- Retweets: ${data.twitter.retweets}
- Impressions: ${data.twitter.impressions}

## 🧠 Community Interaction
- Discord Messages: ${data.interactionPatterns.discordMessages}
- Telegram Messages: ${data.interactionPatterns.telegramMessages}
- Reddit Posts: ${data.interactionPatterns.redditPosts}
- Medium Posts: ${data.interactionPatterns.mediumPosts}
- GitHub Discussions: ${data.interactionPatterns.githubDiscussions}
- Total Community Mentions: ${data.communityMentions}

## 🔗 Onchain Activity
- Transactions: ${data.onchain.transactions}
- Unique Addresses: ${data.onchain.uniqueAddresses}
- Volume: ${data.onchain.volume.toFixed(2)}
- Liquidity: $${data.onchain.liquidity.toFixed(2)}
- Holders: ${data.onchain.holders}
- Transfer Count: ${data.onchain.transferCount}

## ⚠️ Recent Anomaly Alerts
${alertText}

### Notes:
Use this context to identify cross-signal convergence, detect abnormal movements, and predict momentum shifts.
`;
}
