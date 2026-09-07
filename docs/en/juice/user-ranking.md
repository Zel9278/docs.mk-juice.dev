# User ranking

A user ranking based on post count and reaction count.

## How to view it

On the "User Ranking" tab of the explore page (`/explore`), you can see the top 3 users for each. You can view it even without logging in. The number of users shown can be changed from the JUICE feature settings in the control panel (3 by default).

- **Post count ranking**: Post count excluding plain renotes (without quote). Quote renotes are counted toward the post count.
- **Reaction count ranking**: The number of reactions received on your own posts.

## Aggregation period

The aggregation period defaults to 12-hour blocks. To avoid the ranking looking unnaturally empty right at the boundary of a period, the score from the previous period is also blended in.
