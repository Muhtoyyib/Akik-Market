# Performance measurements

Home page task 5.2 targets LCP of 2.5 s or less and CLS below 0.1 in a Lighthouse mobile run on the built page.

## 2026-11-06, Home, local production build

**Setup**

- Lighthouse 12.8.2, mobile defaults (Slow 4G: 150 ms RTT, about 1.6 Mbps down, 4x CPU slowdown).
- Playwright's Chromium.
- `dist/client` served locally with gzip on text files, to match the CDN.

| Throttling           | Performance | LCP   | FCP   | CLS   |
| -------------------- | ----------- | ----- | ----- | ----- |
| Simulated (default)  | 92          | 3.3 s | 1.4 s | 0     |
| Applied (`devtools`) | 95          | 1.7 s | 1.7 s | 0.002 |

The same runs scored accessibility 100, best practices 96 and SEO 100.

**Status: CLS passes. LCP passes under applied throttling and fails the simulated estimate.**

What was measured:

- **LCP element:** the hero video's poster.
- **Without gzip:** a plain static server (no compression) gave a simulated LCP of 6.1 s, so always serve compressed when measuring.
- **Ruled out:** changing the hero clip's preload from `auto` to `metadata` didn't move the simulated LCP. Nor did drawing the poster as an `<img>` under the video, with or without the clip preloading. Neither change was kept.

What's inferred, not proven:

- In the unthrottled load, LCP painted at about 0.6 s, after the scripts had already run. The simulator replays everything that happened before LCP on the slow network, so it charges the full JavaScript download and CPU cost (168 KB gzipped) to LCP.
- If that's right, cutting JavaScript is what would lower the simulated number. Lighthouse estimates 198 KB of unused JavaScript.

**Next step:** run PageSpeed Insights on the deployed Vercel URL. If the field-like LCP is over 2.5 s there, reduce the JavaScript Home loads; start with the Base UI chunks and the code that only the design-system route needs.
