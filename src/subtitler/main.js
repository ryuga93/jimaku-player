import App from './App.svelte';
import './style/style.scss';
import {waitForKeyElements} from "./waitForKeyElements";

if (location.host.includes('crunchyroll')) {
	//crunchyroll fullscreens the player container, not the entire document,
	//need to put the subtitler in there or it won't be visible when fullscreened
	const vilosRoot = document.getElementById('vilosRoot');
	mountApp(vilosRoot);
}
else if (location.host.includes('mega')) {
	waitForKeyElements("div.media-viewer", mountApp);
}
else {
	const body = document.body;
	mountApp(body);
}

function mountApp (target) {
	const mount = document.createElement('div');

	target.appendChild(mount);

	mount.id = 'sheodox-jimaku-player';
	mount.style.position = 'fixed';
	mount.style.width = '100%';
	// crunchyroll's player might have some overlays that catch all clicks,
	// make any of jimaku player's buttons unclickable
	mount.style.zIndex = '999999999';

	const app = new App({
		target: mount
	});
}
