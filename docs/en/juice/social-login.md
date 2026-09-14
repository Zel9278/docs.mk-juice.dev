# Social login

Lets you link your account with Discord, Google, GitHub, GitLab, or Microsoft, and use those accounts to sign in.

## Setting up a link

From the "JUICE" settings page (under the "Account" category), you can link or unlink your account with each service. Linking an account and using it as a sign-in method are separate toggles.

When a linked account is enabled as a sign-in method, a button for that provider appears on the sign-in screen, letting you log in through the linked account.

## Safety requirements

To use social login as a sign-in method, both of the following must be true:

- **Two-factor authentication (2FA) must be enabled on your Misskey account**
- **You must individually opt in to using it as a sign-in method** (simply linking an account doesn't automatically enable it as one)

This prevents someone from signing into your Misskey account just by taking over a linked account (e.g. your Google account). It's enforced server-side, as a countermeasure against the reason upstream Misskey removed a similar feature in the past.

## Supported providers

- Discord
- Google
- GitHub
- GitLab
- Microsoft

Only the providers an admin has enabled in the control panel's JUICE settings are available.
