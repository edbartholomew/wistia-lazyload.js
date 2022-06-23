# wistia-lazyload.js - Lazy Load Wistia Videos

![npm](https://img.shields.io/npm/v/wistia-lazyload.js) ![npm](https://badges.hiptest.com:/bundlephobia/min/wistia-lazyload.js) ![npm](https://img.shields.io/npm/dm/wistia-lazyload.js) ![npm](https://img.shields.io/npm/l/wistia-lazyload.js)

**wistia-lazyload.js** is a lightweight and flexible vanilla JavaScript library to make lazy loading Wistia videos super easy! Wistia videos load a lot of resources in order for them to work, which can negatively impact the load time of your site. Using wistia-lazyload.js you can you can defer the loading of videos outside the viewport until just before a user scrolls to them, improving your site's performance and giving your users a better experience.

### Key Features

* Easily embed and lazy load Wistia videos
* Built to prevent [content shifting](https://web.dev/cls/)
* Support for [Wistia embed options](https://wistia.com/support/developers/embed-options#list-of-all-options) including [popovers](https://wistia.com/support/developers/popover-customization#options)
* Add placeholder images (these can also be lazy loaded)
* Customisable styling: you can override the default styles with your own

Check out the [live demo](https://edbartholomew.github.io/wistia-lazyload.js) to see it in action!

---

## Table of Contents

1. [Download](#download)
2. [Installation](#installation)
	1. [Module Import](#installation-module-import)
	2. [Local & Script Tag](#installation-local-script-tag)
	3. [CDN & Script Tag](#installation-cdn-script-tag)
3. [Getting Started](#getting-started)
4. [Placeholder Images](#placeholder-images)
5. [Customisation](#customisation)
	1. [Wistia Embed Options](#wistia-embed-options)
	2. [Custom Styling](#custom-styling)
6. [Browser Support](#browser-support)
7. [Non-Affiliation Disclaimer](#non-affiliation-disclaimer)
8. [Licence](#licence)

<a name="installation"></a>

## 1. Download

Download the [wistia-lazyload.min.js](dist/wistia-lazyload.min.js) script (alternatively you can download the files via npm: ``npm install wistia-lazyload.js --save-dev``). If you wish to use a CDN you can skip to [here](#installation-cdn-script-tag).

## 2. Installation

<a name="installation-module-import"></a>

### Option 1: Module Import

Import the script file into your main JavaScript file.

```js
import wistiaLazyload from "./wistia-lazyload.js";
```

<a name="installation-local-script-tag"></a>

### Option 2: Local & Script Tag

Include the downloaded script in the head of your HTML.

```html
<script src="wistia-lazyload.min.js" defer></script>
```

<a name="installation-cdn-script-tag"></a>

### Option 3: CDN & Script Tag

Include the script using CDN in the head of your HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/wistia-lazyload.js@1.0.0/dist/wistia-lazyload.min.js" defer></script>
```

<a name="getting-started"></a>

## 3. Getting Started

Add the following to your website and swap the video ID for your own one.

```html
<div class="wistia-lazyload">
  <div data-video-id="vhkqhqhzyq"></div>
</div>
```

<a name="placeholder-images"></a>

## 4. Placeholder Images

You can add a placeholder image that will appear before the Wistia video is downloaded. There are two options for this, use ``src`` to have the image download immediately or ``data-src`` to lazy load the image.

```html
<div class="wistia-lazyload">
  <img data-src="placeholder.webp">
  <div data-video-id="vhkqhqhzyq"></div>
</div>
```

<a name="customisation"></a>

## 5. Customisation

<a name="wistia-embed-options"></a>

### Wistia Embed Options

If you would like to use some of the [Wistia embed options](https://wistia.com/support/developers/embed-options#list-of-all-options) you can do so by [adding the options as classes](https://wistia.com/support/developers/embed-options#setting-options-on-standard-and-popover-embeds) to the inner div.

```html
<div class="wistia-lazyload">
  <div data-video-id="vhkqhqhzyq" class="videoFoam=true playerColor=ff0000"></div>
</div>
```

<a name="custom-styling"></a>

### Custom Styling

The included styles are designed to stop [content shifting](https://web.dev/cls/) and ensure the videos are only visible once they are ready to be watched. If you would prefer to use your own styles you can do so by overriding the default styles using ``!important``. Use the ``.wistia-lazyload`` class which is used before the video has loaded and the ``.wistia-lazyloaded`` class which is used once the video is ready to be watched. For example, the default aspect ratio is 16/9 but if you wanted to change that you could add the following to your CSS.

```css
.wistia-lazyload, {
  aspect-ratio: 4/3 !important;
}
```

Inline styles can also be used override the defaults.

```html
<div class="wistia-lazyload" style="aspect-ratio: 4/3;">
  <div data-video-id="vhkqhqhzyq"></div>
</div>
```

<a name="browser-support"></a>

## 6. Browser Support

In order for the library to know when to load the videos it uses the relatively new [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), which has been supported by all the main browsers since 2019, and in many case earlier ([compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#browser_compatibility)). For browsers that do **not** currently support this API the videos will load immediately. If you would like to lazy load Wistia videos even on older browsers you may want to include a [polyfill ](https://github.com/GoogleChromeLabs/intersection-observer) (untested) in your project.

<a name="non-affiliation-disclaimer"></a>

## 7. Non-Affiliation Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Wistia Inc, or any of its subsidiaries or its affiliates. The name Wistia as well as related names, marks, emblems and images are registered trademarks of their respective owners.

The official Wistia website can be found at [wistia.com](https://wistia.com).

<a name="licence"></a>

## 8. Licence

**wistia-lazyload.js** is licenced under the [MIT Licence](LICENSE).