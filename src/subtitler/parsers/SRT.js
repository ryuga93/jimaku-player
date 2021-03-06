import SubtitleFormat from "./SubtitleFormat";

//4px text shadow outline generated by the ASS parser
const outlineShadow = 'text-shadow: -4px -4px 0px rgba(9, 9, 9, 255), -4px -3px 0px rgba(9, 9, 9, 255), -4px -2px 0px rgba(9, 9, 9, 255), -4px -1px 0px rgba(9, 9, 9, 255), -4px 0px 0px rgba(9, 9, 9, 255), -4px 1px 0px rgba(9, 9, 9, 255), -4px 2px 0px rgba(9, 9, 9, 255), -4px 3px 0px rgba(9, 9, 9, 255), -4px 4px 0px rgba(9, 9, 9, 255), -3px -4px 0px rgba(9, 9, 9, 255), -3px -3px 0px rgba(9, 9, 9, 255), -3px -2px 0px rgba(9, 9, 9, 255), -3px -1px 0px rgba(9, 9, 9, 255), -3px 0px 0px rgba(9, 9, 9, 255), -3px 1px 0px rgba(9, 9, 9, 255), -3px 2px 0px rgba(9, 9, 9, 255), -3px 3px 0px rgba(9, 9, 9, 255), -3px 4px 0px rgba(9, 9, 9, 255), -2px -4px 0px rgba(9, 9, 9, 255), -2px -3px 0px rgba(9, 9, 9, 255), -2px -2px 0px rgba(9, 9, 9, 255), -2px -1px 0px rgba(9, 9, 9, 255), -2px 0px 0px rgba(9, 9, 9, 255), -2px 1px 0px rgba(9, 9, 9, 255), -2px 2px 0px rgba(9, 9, 9, 255), -2px 3px 0px rgba(9, 9, 9, 255), -2px 4px 0px rgba(9, 9, 9, 255), -1px -4px 0px rgba(9, 9, 9, 255), -1px -3px 0px rgba(9, 9, 9, 255), -1px -2px 0px rgba(9, 9, 9, 255), -1px -1px 0px rgba(9, 9, 9, 255), -1px 0px 0px rgba(9, 9, 9, 255), -1px 1px 0px rgba(9, 9, 9, 255), -1px 2px 0px rgba(9, 9, 9, 255), -1px 3px 0px rgba(9, 9, 9, 255), -1px 4px 0px rgba(9, 9, 9, 255), 0px -4px 0px rgba(9, 9, 9, 255), 0px -3px 0px rgba(9, 9, 9, 255), 0px -2px 0px rgba(9, 9, 9, 255), 0px -1px 0px rgba(9, 9, 9, 255), 0px 0px 0px rgba(9, 9, 9, 255), 0px 1px 0px rgba(9, 9, 9, 255), 0px 2px 0px rgba(9, 9, 9, 255), 0px 3px 0px rgba(9, 9, 9, 255), 0px 4px 0px rgba(9, 9, 9, 255), 1px -4px 0px rgba(9, 9, 9, 255), 1px -3px 0px rgba(9, 9, 9, 255), 1px -2px 0px rgba(9, 9, 9, 255), 1px -1px 0px rgba(9, 9, 9, 255), 1px 0px 0px rgba(9, 9, 9, 255), 1px 1px 0px rgba(9, 9, 9, 255), 1px 2px 0px rgba(9, 9, 9, 255), 1px 3px 0px rgba(9, 9, 9, 255), 1px 4px 0px rgba(9, 9, 9, 255), 2px -4px 0px rgba(9, 9, 9, 255), 2px -3px 0px rgba(9, 9, 9, 255), 2px -2px 0px rgba(9, 9, 9, 255), 2px -1px 0px rgba(9, 9, 9, 255), 2px 0px 0px rgba(9, 9, 9, 255), 2px 1px 0px rgba(9, 9, 9, 255), 2px 2px 0px rgba(9, 9, 9, 255), 2px 3px 0px rgba(9, 9, 9, 255), 2px 4px 0px rgba(9, 9, 9, 255), 3px -4px 0px rgba(9, 9, 9, 255), 3px -3px 0px rgba(9, 9, 9, 255), 3px -2px 0px rgba(9, 9, 9, 255), 3px -1px 0px rgba(9, 9, 9, 255), 3px 0px 0px rgba(9, 9, 9, 255), 3px 1px 0px rgba(9, 9, 9, 255), 3px 2px 0px rgba(9, 9, 9, 255), 3px 3px 0px rgba(9, 9, 9, 255), 3px 4px 0px rgba(9, 9, 9, 255), 4px -4px 0px rgba(9, 9, 9, 255), 4px -3px 0px rgba(9, 9, 9, 255), 4px -2px 0px rgba(9, 9, 9, 255), 4px -1px 0px rgba(9, 9, 9, 255), 4px 0px 0px rgba(9, 9, 9, 255), 4px 1px 0px rgba(9, 9, 9, 255), 4px 2px 0px rgba(9, 9, 9, 255), 4px 3px 0px rgba(9, 9, 9, 255), 4px 4px 0px rgba(9, 9, 9, 255), 2px 2px 0px rgba(20, 20, 20, 195)',
	positionAlignmentTranslates = {
		'line-left': '0%',
		'center': '-50%',
		'line-right': '-100%'
	};

/**
 * Parser for SRT and WebVTT files since WebVTT is more or less a superset of SRT
 */
export default class SRT extends SubtitleFormat {
	constructor(srt, fileName) {
		super('srt', fileName);

		const subs = srt
			.replace(/\r/g, '')
			//two lines separate each subtitle line
			.split('\n\n');
		this.subs = subs.reduce((done, sub) => {
			let lines = sub.trim().split('\n');

			/**
			 * shift the array of lines for this sub entry, consider the current index 0 line processed
			 */
			function shift() {
				lines.shift();
			}
			//if any fails parsing, it's probably something we're ignoring for now, like NOTEs etc
			try {
				//vtt subs come numbered on the line above the start/end times, throw it away
				if (/^\d*$/.test(lines[0])) {
					shift();
				}
				let [startStr, endStr] = lines[0]
						//SRT subtitles use a comma for the decimal point on seconds, make it a period so it can be parsed as a float
						.replace(/,/g, '.')
						.match(/^([\d:\.\-> ]*)/)
						[0].split(/\-\->/),
					styling = lines[0].match(/([a-zA-Z].*)/); //the rest of the line starting at the first alphabetical character
				styling = styling && styling.length ? styling[1] : ''; //might not have styling cues

				let inlineStyles = [],
					containerStyles = [];
				const linesOfText = lines.length - 1, // -1 because we haven't closed out processing of VTT cues and it's still included
					getPercentCue = (name, fallback) => {
						const match = styling.match(new RegExp(`${name}:([\\d\\.]*)%`));
						if (match) {
							return parseInt(match[1], 10);
						}
						return fallback
					},
					getTextCue = name => {
						const match = styling.match(new RegExp(`${name}:([\w-]*?)`));
						if (match) {
							return match[1];
						}
					},
					// only used for position, but it's cleaner to move the logic into a function than muddy the other cue variables below
					getPositionCue = () => {
						//vtt position cues can be specified like "position:50%" which is horizontally 50% across the viewport,
						//alternatively an alignment can be specified which defines what part of the subtitle should be at that
						//position, like "position:50%,center" is totally centered, but "position:30%,line-right" means that the right
						//side of the subtitle is at 30% position, it'll be just in the leftmost side of the viewport

						//note the optional alignment is in a non-capturing group but the alignment within is in a capturing group, so the match
						//for position:50%,center is [..., "50", "center"], not [..., "50", ",center", "center"]
						const match = styling.match(/position:([\d.]*)%(?:,(\w*))?/);
						if (match) {
							return {
								position: parseInt(match[1]),
								//MDN's WebVTT api docs mention "middle" as a center alignment option, and I've seen it in subtitles, though
								//the W3 spec only shows "center" as a valid option. use center for consistency
								positionAlignment: match[2] === 'middle' ? 'center' : match[2]
							}
						}
						return {
							position: 50,
							positionAlignment: 'center'
						};
					},
					fontSize = 5;

				let {position, positionAlignment='center'} = getPositionCue(),
					//TODO do something with align, fallback to it instead of positionAlignment having a default 'center'
					align = getTextCue('align') || 'center',
					//TODO support non-percent line numbers
					//need to adjust the fallback line setting slightly, if three lines show it'll go off the screen otherwise
					line = getPercentCue('line', 90 - (linesOfText * fontSize)),
					size = getPercentCue('size', 100);

				containerStyles.push(`position: fixed; left: ${position}vw`);

				if (positionAlignment && positionAlignment in positionAlignmentTranslates) {
					inlineStyles.push(`transform: translateX(${positionAlignmentTranslates[positionAlignment]})`)
				}

				inlineStyles.push(`display:block; width: ${size}vw`);

				shift();

				const text = lines.join('\n').replace(/<\/?c.Japanese>/g, '');
				inlineStyles.push(`font-size: ${fontSize}vh`);
				//keep this style last, or inspecting styles can become tedious to scroll past a giant text shadow
				inlineStyles.push(outlineShadow);

				//rough estimate of the padding between each lines, on very small players like crunchyroll the
				//space between lines takes up a considerable amount of space, and lines can go off the page
				const paddingEstimatePx = 10,
					paddingBufferZone = linesOfText * paddingEstimatePx;
				done.push({
					start: this.timeToMs(startStr),
					end: this.timeToMs(endStr),
					verticalAlignment: {
						normal: `position: fixed; top: calc(${line}vh - ${paddingBufferZone}px);`,
						//normally subtitles grow downward unless a (non "start") line alignment is specified (not currently supported)
						//so for inverted positioning we need to make it grow up, or it'll awkwardly show the subtitle in the center of the video
						inverted: `position: fixed; top: calc(${100 - line}vh + ${paddingBufferZone}px); transform: translateY(-100%)`
					},
					text,
					inline: containerStyles.join('; '),
					phrases: [{
						text,
						inline: inlineStyles.join('; '),
					}],
				});
			} catch(e){}
			return done;
		}, []);
	}

	serialize() {
		return JSON.stringify(this.subs, null, 4);
	}

	debugInfo() {
		return [{
			title: 'Number of subtitles',
			detail: this.subs.length
		}];
	}
}
