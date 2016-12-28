/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React Image Compressor @ Version 0.0.1
*
* refs:
* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
* https://davidwalsh.name/convert-canvas-image
* https://beta.webcomponents.org/element/3mp3ri0r/cpol-image
*
*/

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import base64toblob from 'base64toblob';

class ImageCompressor extends React.Component {

  constructor() {
    super()
    this.state = {
      file: {},
      result: {},
      reader: {},
      imgSrc: "",
    }

    this._handleChange = this._handleChange.bind(this)
    this._fileOnLoad = this._fileOnLoad.bind(this)
    this._redraw = this._redraw.bind(this)
    this._drawImage = this._drawImage.bind(this)
  }

  _handleChange(e){

    // If There's no file choosen
    let file = e.target.files[0]
    if(!file) return false

    // get the file
    this.setState({ file }, () => {
      // Validation
      let type = this.state.file.type
      let valid = type.indexOf("image") !== -1

      if(!valid) throw "File Type Is Not Supported. Upload an image instead"

      // Make new FileReader
      this.setState({ reader: new FileReader() }, () => {

        // Convert the file to base64 text
        this.state.reader.readAsDataURL(this.state.file)

        // on reader load something...
        this.state.reader.onload = this._fileOnLoad

      })

    })

  }

  /*
    Draw And Compress The Image
    @params {String} imgUrl
  */
  _drawImage(imgUrl, rerender) {

    // Recreate Canvas Element
    let canvas = document.createElement('canvas')
    this.setState({ canvas }, () => {

      // Set Canvas Context
      let ctx = this.state.canvas.getContext('2d')

      // Create New Image
      let img = new Image()
      img.src = imgUrl

      // Image Size After Scaling
      let scale = this.props.scale / 100
      let width = img.width * scale
      let height = img.height * scale

      // Set Canvas Height And Width According to Image Size And Scale
      this.state.canvas.setAttribute('width', width)
      this.state.canvas.setAttribute('height', height)

      ctx.drawImage(img, 0, 0, width, height)

      // Quality Of Image
      let quality = this.props.quality ? (this.props.quality / 100) : 1

      // If all files have been proceed
      let base64 = this.state.canvas.toDataURL('image/jpeg', quality)
      let fileName = this.state.result.file.name
      let lastDot = fileName.lastIndexOf(".")
      fileName = fileName.substr(0,lastDot) + '.jpeg'

      let objToPass = {
        canvas: this.state.canvas,
        original: this.state.result,
        compressed: {
          blob: this._toBlob(base64),
          base64: base64,
          name: fileName,
          file: this._buildFile(base64, fileName)
        },
      }

      objToPass.compressed.size = Math.round(objToPass.compressed.file.size / 1000)+' kB'
      objToPass.compressed.type = "image/jpeg"

      this.props.onDone(objToPass)
    })


  }


  /*
    Redraw the canvas
  */
  _redraw() {
    let { result: { base64 } } = this.state
    if(base64) {
      this._drawImage(base64, true)
    }
  }


  /*
    when the file in loaded
  */
  _fileOnLoad() {
    // the file
    let { file, reader } = this.state

    // make a fileinfo object
    let fileinfo = {
      name: file.name,
      type: file.type,
      size: Math.round(file.size / 1000)+' kb',
      base64: reader.result,
      file: file
    }

    // push it to the state
    this.setState({ result: fileinfo }, () => {
      // drawImage
      this._drawImage(this.state.result.base64)
    })


  }


  // Convert Base64 to Blob
  _toBlob (imgUrl) {
    let blob = base64toblob(imgUrl.split(',')[1], "image/jpeg")
    let url = window.URL.createObjectURL(blob)
    return url
  }


  // Convert Blob To File
  _buildFile (blob, name) {
    return new File([blob], name)
  }


  componentWillReceiveProps(nextProps) {
    let { quality, scale } = this.props
    let theStateHasChanged = quality !== nextProps.quality || scale !== nextProps.scale

    if(theStateHasChanged) {
      this._redraw()
    }
  }

  componentDidMount() {
  }

  render(){
    let { className, id } = this.props

    return (
      <input
        id={ id ? id : null }
        className={ className ? className : null }
        type="file"
        onChange={ this._handleChange } />
    )
  }

}

// The Props
ImageCompressor.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  scale: PropTypes.number.isRequired,
  quality: PropTypes.number.isRequired,
  onDone: PropTypes.func
}

ImageCompressor.defaultProps = {
  scale: 100,
  quality: 75,
  onDone: () => {},
}

export default ImageCompressor;
