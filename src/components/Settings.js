import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';

import { changeColor, changeTitle, changeFont } from '../store/actions';
import './Settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    }
  }

  changeColor = (c, e) => {
    this.props.changeColor(c.rgb);
  }

  changeName = e => {
    this.props.changeTitle(e.target.value);
  }

  changeFont = e => {
    this.props.changeFont(e.target.value);
  }

  showColorPiacker = e => {
    this.setState({
      showPicker: !this.state.showPicker
    })
  }

  render() {
    const { style, title, font, color } = this.props;
    return (
      <div className="settings">
         <div className="panel" style={style}>
            <h2>Settings</h2>
          </div>
          <div className="form">
            <label>
              <input type="text" value={title} onChange={this.changeName} placeholder="Title of table"/>
            </label>
            <label>
              Font Family:
              <select value={font} onChange={this.changeFont}>
                {fonts.map((i, c) => <option key={`f_${c}`} value={i}>{i}</option>)}
              </select>
            </label>
            <div className="picker">
              Accent color:
              <div className="select" onClick={this.showColorPiacker}>
                <div style={style}></div>
              </div>
              {this.state.showPicker && <div className="show">
                <SketchPicker color={color} onChange={this.changeColor} />
              </div>}
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  const params = state.settings.getSettings();
  params.style = state.settings.getColorStyle();
  return params;
}

export default connect(mapStateToProps, { changeColor, changeTitle, changeFont })(Settings);

const fonts = [
  'Cinzel',
  'Indie Flower',
  'Permanent Marker',
  'Raleway',
  'Saira Semi Condensed',
  'Satisfy'
]