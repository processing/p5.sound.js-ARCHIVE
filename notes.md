# glossary

p5.js-sound: original p5.sound library
p5.sound.js: newer p5.sound library

# 2023 November 06

status: library builds, documentation builds with mistakes.

Kenneth Lim has helped me out with how to build the documentation https://github.com/processing/p5.sound.js/issues/63

over there, it was mentioned that there is a file on the original library at https://github.com/processing/p5.js-sound/blob/ae7a00a802da9346c6474f8fdaf8448a37a6ad58/fragments/before.frag which is the header that the reference of p5.sound.js needs to be able to build the documentation.

i dived on the the p5.js-sound repo, and this fragment is being used by webpack to build, which i am not using right now to build p5.sound.js, and also on a 7k lines file at https://github.com/processing/p5.js-sound/blob/main/docs/reference/assets/js/reference.js, which is a copy-paste from several libraries, including:

- https://github.com/jashkenas/underscore
- https://github.com/jashkenas/backbone/
- https://github.com/requirejs/text/
- https://github.com/twitter/typeahead.js

in particular, these versions:

- https://github.com/jashkenas/underscore/blob/1.5.2/underscore.js
- https://github.com/jashkenas/backbone/blob/1.1.0/backbone.js
- https://github.com/requirejs/text/blob/2.0.10/text.js
- https://github.com/twitter/typeahead.js/tree/v0.10.2