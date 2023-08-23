// adapted from Signalbase.js at Tone.js v0.10.0
// available at https://github.com/Tonejs/Tone.js/tree/r10

//   When signals connect to other signals or AudioParams,
//  they take over the output value of that signal or AudioParam.
//  For all other nodes, the behavior is the same as a default <code>connect</code>.

class SignalBase {
  connect(node, outputNumber, inputNumber) {
    if ((Signal && Signal === node.constructor) ||
        (Param && Param === node.constructor) ||
    (TimeLineSignal && TimeLineSignal === node.constructor)) {
      node._param.cancelScheduledValues(0);
      node._param.value = 0;
      node.overridden = true;
    } else if (node instanceof AudioParam) {
      node.cancelScheduledValues(0);
      node.value = 0;
    }
  }
}

export default SignalBase;