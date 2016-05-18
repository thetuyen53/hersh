var Index, onYouTubeIframeAPIReady;

Index = {
  player: false,
  states: {
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'video cued'
  },
  i: function() {
    console.log('Index.i()');
    return Index.handlers();
  },
  handlers: function() {
    return $('.email input').focus(Index.email);
  },
  email: function() {
    var i;
    i = $('.email > input');
    return i[0].setSelectionRange(0, i[0].value.length);
  },
  ytApi: function() {
    var first, tag;
    tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.type = 'text/javascript';
    tag.async = true;
    first = document.getElementsByTagName('script')[0];
    return first.parentNode.insertBefore(tag, first);
  },
  ready: function(event) {
    var height, width;
    console.log('youtube is ready');
    width = '100%';
    height = '100%';
    return Index.player = new YT.Player('video', {
      width: width,
      height: height,
      videoId: 'ZNxIDWFVNVc',
      events: {
        onReady: Index.playerReady,
        onStateChange: Index.stateChange
      },
      playerVars: {
        allowfullscreen: 1,
        modestbranding: 1,
        enablejsapi: 1,
        origin: Index.origin,
        version: 3,
        rel: 0,
        disablekb: 1,
        loop: 1,
        html5: 1,
        controls: 0,
        theme: 'light',
        wmode: 'opaque'
      }
    });
  },
  playerReady: function(event) {
    return setTimeout(function() {
      return Index.player.playVideo();
    }, 100);
  },
  stateChange: function(event) {
    return Index.cstate = Index.states[event.data];
  }
};

onYouTubeIframeAPIReady = function(event) {
  return Index.ready(event);
};

//# sourceMappingURL=data:application/json;base64,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ZXggPVxuICBwbGF5ZXI6IGZhbHNlXG5cbiAgc3RhdGVzOlxuICAgICctMSc6ICd1bnN0YXJ0ZWQnLFxuICAgIDA6ICdlbmRlZCcsXG4gICAgMTogJ3BsYXlpbmcnLFxuICAgIDI6ICdwYXVzZWQnLFxuICAgIDM6ICdidWZmZXJpbmcnLFxuICAgIDU6ICd2aWRlbyBjdWVkJ1xuXG4gIGk6IC0+XG5cbiAgICBjb25zb2xlLmxvZyAnSW5kZXguaSgpJ1xuICAgICNJbmRleC55dEFwaSgpXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5lbWFpbCBpbnB1dCcpLmZvY3VzIEluZGV4LmVtYWlsXG5cblxuICBlbWFpbDogLT5cblxuICAgIGkgPSAkKCcuZW1haWwgPiBpbnB1dCcpXG5cbiAgICBpWzBdLnNldFNlbGVjdGlvblJhbmdlKDAsIGlbMF0udmFsdWUubGVuZ3RoKVxuXG5cbiAgeXRBcGk6IC0+XG4gICAgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSdcbiAgICB0YWcudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgdGFnLmFzeW5jID0gdHJ1ZVxuICAgIGZpcnN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdXG4gICAgZmlyc3QucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUgdGFnLCBmaXJzdFxuXG4gIHJlYWR5OiAoZXZlbnQpIC0+XG4gICAgY29uc29sZS5sb2cgJ3lvdXR1YmUgaXMgcmVhZHknXG5cbiAgICB3aWR0aCA9ICcxMDAlJ1xuICAgIGhlaWdodCA9ICcxMDAlJ1xuXG4gICAgSW5kZXgucGxheWVyID0gbmV3IFlULlBsYXllcigndmlkZW8nLFxuICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgdmlkZW9JZDogJ1pOeElEV0ZWTlZjJ1xuICAgICAgZXZlbnRzOlxuICAgICAgICBvblJlYWR5OiBJbmRleC5wbGF5ZXJSZWFkeVxuICAgICAgICBvblN0YXRlQ2hhbmdlOiBJbmRleC5zdGF0ZUNoYW5nZVxuICAgICAgcGxheWVyVmFyczpcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuOiAxXG4gICAgICAgIG1vZGVzdGJyYW5kaW5nOiAxXG4gICAgICAgIGVuYWJsZWpzYXBpOiAxXG4gICAgICAgIG9yaWdpbjogSW5kZXgub3JpZ2luXG4gICAgICAgIHZlcnNpb246IDNcbiAgICAgICAgcmVsOiAwXG4gICAgICAgIGRpc2FibGVrYjogMVxuICAgICAgICBsb29wOiAxXG4gICAgICAgIGh0bWw1OiAxXG4gICAgICAgIGNvbnRyb2xzOiAwXG4gICAgICAgIHRoZW1lOiAnbGlnaHQnXG4gICAgICAgIHdtb2RlOiAnb3BhcXVlJ1xuICAgIClcblxuICBwbGF5ZXJSZWFkeTogKGV2ZW50KSAtPlxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIEluZGV4LnBsYXllci5wbGF5VmlkZW8oKVxuICAgICAgI0luZGV4LnBsYXllci5tdXRlKClcbiAgICAsIDEwMFxuICBzdGF0ZUNoYW5nZTogKGV2ZW50KSAtPlxuICAgIEluZGV4LmNzdGF0ZSA9IEluZGV4LnN0YXRlc1tldmVudC5kYXRhXVxuICAgICNfLnQgJ0RldGFpbHMnLCB3YXRjaC5jc3RhdGUsIHdhdGNoLnRpdGxlXG5cblxuXG5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IChldmVudCkgLT5cbiAgSW5kZXgucmVhZHkoZXZlbnQpXG5cbiJdfQ==