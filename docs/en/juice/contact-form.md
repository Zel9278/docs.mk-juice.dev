# Contact form

A contact form you can submit without logging in (the admin can require login instead).

## How to submit

- Choose a category and a reply method (email address, or your Misskey username), then submit.
- You can optionally include device information (OS, browser, screen size, etc.) in the body — useful when reporting a technical issue.

## How the admin side handles it

- The control panel has a list and detail view. You can manage status (Unhandled / In progress / Handled / Closed), write admin notes, and assign a person in charge.
- When a new inquiry is received, it can notify via a System Webhook (the `receivedContactForm` event).
- Categories can be added, edited, reordered, and enabled/disabled from the JUICE feature settings in the control panel.
- The maximum body length can also be changed from the JUICE settings (10,000 characters by default).

## About permissions

Handling (changing status, assigning a person in charge, deleting) can be delegated per-role, not just to moderators. However, since inquiry content includes personal information such as email addresses and IP addresses, this information is masked for anyone handling it who isn't a moderator (handling itself can be delegated, but viewing personal information is limited to moderators/admins).

Non-moderator users with this permission can reach the list screen directly from the "Tools" menu, without going through the control panel.
