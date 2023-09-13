// import { Tone } from 'tone';
import * as Tone from 'tone';
const audioContext = new window.AudioContext();
Tone.setContext(audioContext);

/**
 * <p>Returns the Audio Context for this sketch. Useful for users
 * who would like to dig deeper into the <a target='_blank' href=
 * 'http://webaudio.github.io/web-audio-api/'>Web Audio API
 * </a>.</p>
 *
 * <p>Some browsers require users to startAudioContext
 * with a user gesture, such as touchStarted in the example below.</p>
 *
 * @for p5
 * @method getAudioContext
 * @return {Object}    AudioContext for this sketch
 * @example
 *  function draw() {
 *    background(255);
 *    textAlign(CENTER);
 *
 *    if (getAudioContext().state !== 'running') {
 *      text('click to start audio', width/2, height/2);
 *    } else {
 *      text('audio is enabled', width/2, height/2);
 *    }
 *  }
 *
 *  function touchStarted() {
 *    if (getAudioContext().state !== 'running') {
 *      getAudioContext().resume();
 *    }
 *    var synth = new p5sound.MonoSynth();
 *    synth.play('A4', 0.5, 0, 0.2);
 *  }
 *
 */
export function getAudioContext() {
  return audioContext;
}

export default audioContext;