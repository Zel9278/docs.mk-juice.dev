# Approval-based signup

Juice Server uses "approval-based signup", which requires a reason for registration and reviews it before an admin approves the account. Not everyone can register instantly.

## Registration flow

1. On the signup screen, in addition to the usual fields such as email address, you enter a "reason for registration" (up to 4096 characters).
2. After completing registration, your account enters a pending-approval state, and you cannot log in until it is approved.
3. An admin (a user with moderator or admin permissions) reviews the reason for registration and either approves or rejects it.
4. Once approved, you can log in. If rejected, you will be notified.

The reason for registration is not disclosed to other general users or applicants — **only admins** can view it.

## Checking your application status

Since you cannot log in while pending approval, you can use a dedicated confirmation code to check your application status (pending, approved, or rejected). Please keep the confirmation code shown at the time of registration in a safe place.

For background on why this server uses approval-based signup, see [About this server's operating policy](../about-juice-server.md).
