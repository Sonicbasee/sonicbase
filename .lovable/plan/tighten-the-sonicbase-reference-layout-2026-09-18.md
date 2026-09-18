# Tighten the Sonicbase reference layout

## Changes
- Replace the home Shop section’s “Shop All” action with the reference-style category pills: Trending, Bestsellers, Box Sets, and Merch.
- Remove News from the desktop navigation and place Contact in its position; keep the remaining routes accessible elsewhere.
- Reduce the overall type scale and button dimensions while preserving the existing hierarchy and monochrome style.
- Shorten the news feature cards by using a wider image proportion, tighter spacing, and smaller copy.
- Shorten the social cards and turn the strip into a seamless, continuously moving loop.
- Keep motion disabled for visitors who prefer reduced motion.

## Verification
- Check the home, shop, and news pages at desktop and mobile widths.
- Confirm the social loop is continuous, category controls fit without overlap, and navigation works.
- Confirm no browser errors remain after the update.

## Technical details
- Reuse the current design tokens and shared controls.
- Implement the social loop with duplicated content and a CSS transform animation, without changing the supplied imagery.
