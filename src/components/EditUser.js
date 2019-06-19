import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addUser, editUser } from '../store/actions';
import './EditUser.scss';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: this.props.user.firstName,
      lname: this.props.user.lastName,
      country: this.props.user.country,
      id: this.props.user.id,
      msg: []
    }
  }

  changeFirstName = e => {
    this.setState({
      fname: e.target.value,
      msg: []
    });
  }

  changeLastName = e => {
    this.setState({
      lname: e.target.value,
      msg: []
    });
  }

  changeCountry = e => {
    this.setState({
      country: e.target.value,
      msg: []
    });
  }

  save = () => {
    const {id, fname, lname, country} = this.state;
    const canSave = fname !== '' && lname !== '' && country !== '';
    if (!canSave) {
      let msg = ["Sorry, You can't save it"];
      if (fname === '') {
        msg.push('Please, enter the First Name');
      } else if (lname === '') {
        msg.push('Please, enter the Last Name');
      } else if (country === '') {
        msg.push('Please, select the Country');
      };
      this.setState({ msg });
    } else {
      if (id === -1) {
        this.props.addUser(fname, lname, country);
      } else {
        this.props.editUser(id, fname, lname, country);
      }
      this.close();
    }
  }

  close = () => {
    this.props.close();
  }

  render() {
    const title = this.props.user.id === -1 ? 'Add User' : 'Edit User';
    const button = this.props.user.id === -1 ? 'Add' : 'Save';
    const { style } = this.props;
    return (
      <div className="modal-wrap">
        <div className="modal-window">
          <div className="panel" style={style}>
            <h2>{title}</h2>
            <div className="close" onClick={this.close}>&#215;</div>
          </div>
          <div className="form">
            <label>
              First Name
              <input type="text" value={this.state.fname} onChange={this.changeFirstName} required={true} />
            </label>
            <label>
              Last Name
              <input type="text" value={this.state.lname} onChange={this.changeLastName} required={true} />
            </label>
            <label>
              Country
              <select value={this.state.country} onChange={this.changeCountry} required={true} >
                <option value='' disabled>Select Country</option>
                {countryList.map((i, c) => (<option key={`c_${c}`} value={i}>{i}</option>))}
              </select>
            </label>
            <button onClick={this.save} style={style}>{button}</button>
            <p className="warn">{this.state.msg[0]}</p>
            <p className="warn">{this.state.msg[1]}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { style: state.settings.getColorStyle() }
}

export default connect(mapStateToProps, { addUser, editUser })(EditUser);

const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'The Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Democratic Republic of the Congo',
  'Republic of the Congo',
  'Costa Rica',
  'Côte d’Ivoire',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'The Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'North Korea',
  'South Korea',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Federated States of Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'South Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];