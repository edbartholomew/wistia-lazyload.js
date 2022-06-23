// Import CSS
import css from './wistia-lazyload.min.css';

// Define class
class WistiaLazyload {
	// Class constructor
	constructor() {
		// Define variables
		this.pluginName = 'wistia-lazyload.js';
		this.loadingClassName = 'wistia-lazyload';
		this.loadedClassName = 'wistia-lazyloaded';
		// Create array that will log already requested videos
		this.loadedVideos = [];
		// Call the initialise function
		this.init();
	}

	// Core lazy load function
	lazyLoad(target) {
		// Get the Wistia video ID
		const videoId = target.lastElementChild.dataset.videoId;

		// Check if the video has already been requested
		if (!this.loadedVideos.includes(videoId)) {
			// Store the video ID to log that it has already been requested
			this.loadedVideos.push(videoId);

			// Define variables
			const childElements = target.childElementCount;
			const embed = document.querySelector(`.${this.loadingClassName} > [data-video-id="${videoId}"]`);
			const placeholder = embed.parentElement.querySelector('img');

			//  Lazy load placeholder image if "data-src" is used
			if (childElements > 1 && placeholder.dataset.src) {
				placeholder.style.visibility = 'hidden';
				placeholder.onload = () => {
					// Check if there is more than one style property
					if (placeholder.style.length > 1) {
						placeholder.style.removeProperty('visibility');
					} else {
						placeholder.removeAttribute('style');
					}
				};
				placeholder.src = placeholder.dataset.src;
			}

			// Add Wistia classes
			embed.classList.add('wistia_embed', `wistia_async_${videoId}`);

			// Request Wistia video
			let video = document.createElement('script');
			video.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
			document.body.appendChild(video);

			// Check if the Wistia script is already added before adding it
			if (typeof Wistia === 'undefined') {
				let script = document.createElement('script');
				script.src = 'https://fast.wistia.com/assets/external/E-v1.js';
				document.body.appendChild(script);
			}

			// Wistia JavaScript Player API
			window._wq = window._wq || [];
			_wq.push({
				// Add only the current video ID to the queue
				id: videoId,
				// Add the loaded class once the video has loaded
				onReady: () => {
					target.classList.add(this.loadedClassName);
				},
			});
		} else {
			console.warn(`${this.pluginName} - Duplicate Wistia embed (video ID: ${videoId}). Only the first instance will be loaded.`);
		}
	}

	// Create intersection observer function
	createObserver(video) {
		// Intersection observer callback function
		const callback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.lazyLoad(entry.target);
					observer.unobserve(entry.target);
				}
			});
		};

		// Intersection observer options
		const options = {
			rootMargin: '10%',
		};

		// Define intersection observer
		const observer = new IntersectionObserver(callback, options);

		// Create an intersection observer
		observer.observe(video);
	}

	// Add required styles
	injectStyles() {
		let style = document.createElement('style');
		style.id = `${this.loadingClassName}-injected-styles`;
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	// Initialise function
	init() {
		// Wait for the page to load
		window.addEventListener('load', () => {
			// Create an array containing all the Wistia videos
			const videos = Array.from(document.querySelectorAll(`.${this.loadingClassName}`));

			// Call the inject styles function
			this.injectStyles();

			// Check if the Intersection Observer API is supported by the browser
			if ('IntersectionObserver' in window) {
				// Loop through the videos and create an intersection observer for each one
				videos.forEach((video) => this.createObserver(video));
			} else {
				// If the Intersection Observer API is not supported loop through the videos and immediately download them
				videos.forEach((video) => this.lazyLoad(video));
				console.warn(`${this.pluginName} - Intersection Observer API not support by your browser. Wistia videos will not be lazy loaded.`);
			}
		});
	}
}

// Create instance of the class
const wistiaLazyload = new WistiaLazyload();

// Export instance as a module
export default wistiaLazyload;