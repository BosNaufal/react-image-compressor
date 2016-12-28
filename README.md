# React Image Compressor
[React](http://facebook.github.io/react) Component To Compress Image Files. It's based on [cpol-image](https://beta.webcomponents.org/element/3mp3ri0r/cpol-image) and [others references](#credits)

[DEMO](https://bosnaufal.github.io/react-image-compressor)


## Install
You can import [react-image-compressor.js](./src/js/components/react-image-compressor.js) to your react component file like [this](./src/js/components/app.js) and process it with your preprocessor.

You can install it via NPM
```bash
npm install react-image-compressor
```


## Usage
```javascript

import React from 'react';
import ReactDOM from 'react-dom';

import ImageCompressor from 'react-image-compressor';

class App extends React.Component {

  constructor() {
    super()
  }

  // Callback When Image Has Been Compressed~
  _getFiles(obj){
    console.log(obj);
  }

  render() {
    return (
      <ImageCompressor
        scale={ 100 }
        quality={ 75 }
        onDone={ this._getFiles.bind(this) } />
    )
  }

}


ReactDOM.render(<App />, document.getElementById("app"))

```

## Props
#### onDone (Function)
Callback after Compress the image. It will pass original file and compressed file and also the canvas element. The object pretty complete with blob & base64 and other needed information.

#### scale (Number)
The percentage of image scaling it starts from 1 to 100.

#### quality (Number)
The percentage of image quality it starts from 1 to 100.


## Credits
- [https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)
- [https://davidwalsh.name/convert-canvas-image](https://davidwalsh.name/convert-canvas-image)
- [https://beta.webcomponents.org/element/3mp3ri0r/cpol-image](https://beta.webcomponents.org/element/3mp3ri0r/cpol-image)


## Thank You for Making this useful~

## Let's talk about some projects with me
Just Contact Me At:
- Email: [bosnaufalemail@gmail.com](mailto:bosnaufalemail@gmail.com)
- Skype Id: bosnaufal254
- twitter: [@BosNaufal](https://twitter.com/BosNaufal)

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2016 - forever Naufal Rabbani
