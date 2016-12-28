
import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import ImageCompressor from './react-image-compressor.js';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      files: [],
      originalSize: true,
      scale: 100,
      quality: 75,

      original: {},
      compressed: {},
    }

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleCheckbox = this._handleCheckbox.bind(this)
    this._upload = this._upload.bind(this)
    this._getFiles = this._getFiles.bind(this)
  }

  _upload () {
    let compressor = this.refs.compressor
    let $compressor = findDOMNode(compressor)
    $compressor.click()
  }

  _handleInputChange (name, e) {
    this.setState({ [name]: e.target.value })
  }

  _handleCheckbox (name, e) {
    this.setState({ [name]: e.target.checked })
  }

  _getFiles(obj){
    this.setState({
      img: obj.compressed.blob,
      original: obj.original,
      compressed: obj.compressed
    })
  }


  render() {

    let { originalSize, img, scale, quality, original, compressed } = this.state

    return (
      <div>

        <h1>Client Side Image Compressor</h1>
        <p>Try To Upload Some Image~</p>

        <button
          className="upload-button button"
          type="button"
          onClick={ this._upload }>
          Upload
        </button>

        <ImageCompressor
          className="compressor"
          onDone={ this._getFiles }
          scale={ scale }
          quality={ quality }
          ref="compressor" />

        <div className="checkbox">
         <input
           type="checkbox"
           onChange={ this._handleCheckbox.bind(this,"originalSize") }
           checked={ originalSize } />
         <span>Responsive Image?</span>
        </div>

        <div className="input-group">
         <label>Image Scale</label>
         <input
           type="number"
           onChange={ this._handleInputChange.bind(this, "scale") }
           value={ scale } />
        </div>

        <div className="input-group">
         <label>Image Quality</label>
         <input
           type="number"
           onChange={ this._handleInputChange.bind(this, "quality") }
           value={ quality } />
        </div>

        { img ?
         <div>
           <div className="image-info">
             <b>Before: </b>
             <span>{ original.size }</span>
             <span className="separator"> | </span>
             <b>After: </b>
             <span>{ compressed.size }</span>
           </div>

           <div className="text-center">
             <img
               style={{ maxWidth: originalSize ? '100%' : null }}
               src={ img } />
             <a className="button" href={ img } target="_blank">Download</a>
           </div>
         </div>
        : null }

     </div>
    )

  }

}


ReactDOM.render(<App />, document.getElementById("app"))
