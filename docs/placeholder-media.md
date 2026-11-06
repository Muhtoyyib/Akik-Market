# Placeholder media

Stand-ins for the owner's own photos and footage, downloaded on 2026-11-06 at the client lead's request ("source online, we will change later"). Replace each with Akik's real media before launch; the imagery spec requires real media only.

Photo originals live in `media/placeholders/` (not deployed). `bun run images` writes WebP copies to `public/placeholders/` at 480, 960 and 1600px wide plus the original width, never wider than the original. `photo()` in `src/lib/responsive-image.ts` builds each image's `srcset` from the same widths. The clip stays in `public/placeholders/`. Content in `src/lib/content/home.ts` refers to the originals' paths, and every one is marked `placeholder(...)`. The asset budget in `vitest.shared.ts` limits file sizes (checked by `src/lib/__tests__/asset-budget.test.ts`, and the JavaScript by `bun run budget` after the build).

To replace a photo, put the new original in `media/placeholders/` under the same name, run `bun run images`, and run the tests.

| File                                           | Shows                                                                                             | Source                                                                                                                                                                                                                                                                                       | Licence                                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `hero-montage.webm`, `hero-montage-poster.jpg` | Montage: hands texting on a phone, a tower at dusk, then a slow push-in on the Toyota photo below | Mixkit clips [1711](https://mixkit.co/free-stock-video/a-person-texting-on-a-smartphone-1711/) and [49872](https://mixkit.co/free-stock-video/modern-building-in-an-aerial-shot-at-dusk-49872/), plus `division-autos-photo.jpg`'s source; 2.8s each, crossfaded, re-encoded to VP9 (926 KB) | Mixkit Stock Video Free License (both clip pages checked on 2026-11-06); Unsplash License |
| `division-phones-photo.jpg`                    | Smartphones on display stands in a store                                                          | [Unsplash 8M0bVuFI7MY](https://unsplash.com/photos/smartphones-displayed-on-stands-in-a-store-8M0bVuFI7MY), Jason Leung                                                                                                                                                                      | [Unsplash License](https://unsplash.com/license)                                          |
| `division-engineering-photo.jpg`               | Modern white house among palm trees                                                               | [Unsplash rB4ieDuc1W0](https://unsplash.com/photos/modern-white-house-surrounded-by-lush-green-palm-trees-rB4ieDuc1W0)                                                                                                                                                                       | [Unsplash License](https://unsplash.com/license)                                          |
| `division-autos-photo.jpg`                     | Black Toyota SUV parked in front of a house                                                       | [Unsplash 82eEgGST404](https://unsplash.com/photos/black-toyota-suv-parked-in-front-of-house-82eEgGST404), gaspar zaldo                                                                                                                                                                      | [Unsplash License](https://unsplash.com/license)                                          |

Images are cropped to 4:5 at 800x1000.

Mixkit marks some clips "Restricted" (personal use only). Every car and SUV clip checked on 2026-11-06 was Restricted, so the car shot is made from a licensed photo instead. Check a clip's page licence before adding it. This file keeps the sources so each one can be checked and replaced.

## Featured now

Item photos in `public/placeholders/featured/`, fetched through the [Openverse](https://openverse.org) image proxy on 2026-11-06 (Unsplash's own site now blocks automated requests, and StockSnap's CDN challenged the first burst). Cropped to 4:5 at 512x640 from StockSnap's 960px files. Item names, details and prices in the content source are invented stand-ins; the photos don't show those exact models.

| File                            | Shows                                | Source                                                                                | Licence                                                   |
| ------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `featured/phone-iphone.jpg`     | White iPhone on a wooden desk        | [StockSnap](https://stocksnap.io/photo/iphone-mobile-XMVLGZZTW3), Negative Space      | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/phone-samsung.jpg`    | White Android phone on a desk        | [StockSnap](https://stocksnap.io/photo/smartphone-mobile-O4V3KXZI1T), Negative Space  | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/phone-white.jpg`      | White phone beside a notebook        | [StockSnap](https://stocksnap.io/photo/smartphone-mobile-IU6HNPC2NT), Negative Space  | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/laptop-macbook.jpg`   | MacBook and iPad on a desk           | [StockSnap](https://stocksnap.io/photo/macbook-laptop-RMATTE7HXJ), Wilfred Iven       | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/laptop-desk.jpg`      | Laptop, glasses and coffee on a desk | [StockSnap](https://stocksnap.io/photo/macbook-laptop-DWLWL9USBG), Lia Leslie         | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/audio-headphones.jpg` | Headphones on a laptop               | [StockSnap](https://stocksnap.io/photo/headphones-audio-WM2HLLDW0K), Álvaro Bernal    | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/home-duplex.jpg`      | Two-storey house with garage at dusk | [StockSnap](https://stocksnap.io/photo/house-home-LJ515CPAKI), Binyamin Mellish       | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/home-bungalow.jpg`    | Bungalow after rain                  | [StockSnap](https://stocksnap.io/photo/house-home-L9VZ6SOGBB), Binyamin Mellish       | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/home-terrace.jpg`     | Large house by a lake                | [StockSnap](https://stocksnap.io/photo/house-home-JO8UW3FDNJ), Evelyn Paris           | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/home-modern.jpg`      | Wood-clad modern house               | [StockSnap](https://stocksnap.io/photo/woodpaneling-house-582053B25E), Jay Mantri     | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/home-apartment.jpg`   | Living room interior                 | [StockSnap](https://stocksnap.io/photo/interior-design-D0NOMANBA7), Dahl House Design | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/car-audi.jpg`         | Blue Audi from the rear              | [StockSnap](https://stocksnap.io/photo/car-vehicle-0B45312K5M), Mike Birdy            | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/car-mercedes.jpg`     | Silver Mercedes front, headlights on | [StockSnap](https://stocksnap.io/photo/cars-silver-4JQNHSXUDH), Mike Birdy            | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/car-landrover.jpg`    | White Land Rover Defender            | [StockSnap](https://stocksnap.io/photo/white-suv-39452134C9), Jeff Sheldon            | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/car-porsche.jpg`      | Silver Porsche 911 in a car park     | [StockSnap](https://stocksnap.io/photo/parking-car-FOS61VCHQR), Alex Iby              | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/car-mustang.jpg`      | Red Ford Mustang front               | [StockSnap](https://stocksnap.io/photo/red-car-8MBNGUYS92), avinash patel             | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `featured/car-sedan.jpg`        | Silver sedan side window             | [StockSnap](https://stocksnap.io/photo/auto-window-SEXSRO0DFS), Matt Bango            | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |

## Customer stories

Stills (1600x900) taken from the 1080p files of Mixkit clips; the spec asks for photo-only stories until the owner supplies real customer footage. No faces are shown, so no one reads as a real customer.

| File                       | Shows                                      | Source                                                                                           | Licence                                              |
| -------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `stories/story-phones.jpg` | Hands typing on a phone                    | [Mixkit 4915](https://mixkit.co/free-stock-video/hands-of-a-person-typing-on-a-cell-phone-4915/) | Mixkit Stock Video Free License (checked 2026-11-06) |
| `stories/story-homes.jpg`  | Living room with a grey sofa               | [Mixkit 3110](https://mixkit.co/free-stock-video/minimalist-room-with-gray-sofa-3110/)           | Mixkit Stock Video Free License (checked 2026-11-06) |
| `stories/story-cars.jpg`   | Hands on a steering wheel at the dashboard | [Mixkit 72](https://mixkit.co/free-stock-video/dashboard-of-a-car-72/)                           | Mixkit Stock Video Free License (checked 2026-11-06) |

The house-keys clip (15064) and the suburban and beach-house clips (48394, 27543) were Restricted, so they were not used.

## Projects banner

| File                 | Shows                                                  | Source                                                                                         | Licence                                                   |
| -------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `projects-house.jpg` | Two-storey house with a tiled roof and a formal garden | [rawpixel](https://www.rawpixel.com/image/5941076/free-public-domain-cc0-photo), via Openverse | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |

Only a 1024x768 copy was available (Openverse and rawpixel both cap downloads at 1024px), so it is a little soft on high-density screens. It is not an Akik building; its alt text is empty so the page doesn't claim it is.

## Buy with confidence

| File                  | Shows                              | Source                                                                                                                                        | Licence                                              |
| --------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `trust-handshake.jpg` | Two hands in a handshake, no faces | Still from [Mixkit 30004](https://mixkit.co/free-stock-video/hands-in-a-handshake-with-a-person-in-a-suit-30004/), cropped to 4:5 at 800x1000 | Mixkit Stock Video Free License (checked 2026-11-06) |

Every handshake, keys and handover clip of a real-estate scene checked on Mixkit (15773, 5889, 13126, 6518, 36136) was Restricted.

## News

Cropped to 3:2 at 960x640.

| File                   | Shows                       | Source                                                                                              | Licence                                                   |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `news/news-phones.jpg` | Hand holding a phone        | [StockSnap](https://stocksnap.io/photo/iphone-smartphone-ODN23L0AC9), Adrianna Calvo, via Openverse | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `news/news-homes.jpg`  | Bedroom with a lamp at dusk | Still from [Mixkit 3112](https://mixkit.co/free-stock-video/interior-of-a-department-room-3112/)    | Mixkit Stock Video Free License (checked 2026-11-06)      |
| `news/news-cars.jpg`   | Side of a white car         | [StockSnap](https://stocksnap.io/photo/white-car-QX09ZRX5DA), David Cohen, via Openverse            | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |

## Founder

The spec wants the founder himself in these photos; until the owner sends some, three faceless stand-ins follow the story's order (phones, building, cars). Unlike other placeholders these carry alt text, because the spec requires the front photo to be described.

| File                           | Shows                                       | Source                                                                                                                     | Licence                                                   |
| ------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `founder/founder-phones.jpg`   | A tablet and sales papers on a desk         | [StockSnap](https://stocksnap.io/photo/samsung-galaxy-QVKE96OD36), Wilfred Iven, via Openverse                             | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `founder/founder-building.jpg` | A building going up at sunset, with a crane | Still from [Mixkit 3971](https://mixkit.co/free-stock-video/sunset-behind-a-building-under-construction-3971/)             | Mixkit Stock Video Free License (checked 2026-11-06)      |
| `founder/founder-road.jpg`     | An open road at sunrise                     | Still from [Mixkit 52454](https://mixkit.co/free-stock-video/traveling-along-from-the-driver-point-of-view-over-an-52454/) | Mixkit Stock Video Free License (checked 2026-11-06)      |

## Visit us

Cropped to 4:3 at 1024x768 and heavily blurred, so the store's own advertising and any faces can't be read. Not Akik's shop; replace with a photo of the Iwo Road shop.

| File             | Shows                              | Source                                                                                                            | Licence                                                   |
| ---------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `visit-shop.jpg` | An electronics shop floor, blurred | [Flickr](https://www.flickr.com/photos/202390793@N05/54402036941), "Airport electronics store" by grandmasterhuon | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
