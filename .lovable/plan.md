# Homepage, logo, and cart panel update

## Changes
- Remove the Artists section from the homepage while keeping the Artists directory and artist pages intact.
- Move the Sonicbase mark into a reusable SVG file under `src/assets` and use that source everywhere the logo appears.
- Replace the top shopping-bag link with an accessible slide-in cart panel matching the reference: empty-cart title, close control, popular-item rows, Shop link, and payment marks.
- Keep all existing navigation and page routes working.

## Validation
- Check the homepage at desktop and mobile sizes.
- Open and close the cart panel, follow its Shop link, and verify all public routes load without browser errors.

## Technical details
- The SVG remains styled through the current theme color so it works over both light and dark areas.
- The cart is a presentation-only empty-cart recommendation panel; checkout and payment processing are not being added.
