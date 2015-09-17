# vtexcart.js

vtexcart.js adds an new minicart to vtex platform stores

Version `1.0.0`

## Getting started

vtexcart.js is a jQuery plugin that provides a new minicart to vtex platform stores. The first step is to call it in your website:

```html

	.../arquivos/jquery.vtexcart.min.js

```

And start it using the command:

```javascript

$(element).vtexcart({parameters});

```

## Parameters

| Parameter     | Values              | Description                                  |
| ------------- | ------------------- | -------------------------------------------- |
| `buyButton`   | $(element)          | Buy button                                   |
| `wrapper`     | $(element)          | Element that wraps the body                  |
| `cartButton`  | $(element)          | Element that will receive the mini cart icon |
| `effect`      | `overlay` or `push` | Transition effect (Default: `overlay`)       |


## Build

> As a prerequisite, you will need [grunt][grunt] installed: `npm install -g grunt-cli`

```
npm install
grunt
```


## Sites Using vtexcart.js

* [Jack the Barber](http://www.jackthebarber.com)

## Need help?

Just send an email to henriquesosa@gmail.com

## Author

Henrique Sosa: [@henriquesosa][twitter]

## License 

Licensed under [MIT][mit]. Enjoy.

[twitter]: http://twitter.com/henriquesosa
[mit]: http://www.opensource.org/licenses/mit-license.php
[grunt]: http://http://www.gruntjs.com/
