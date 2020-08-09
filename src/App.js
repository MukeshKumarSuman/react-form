import React, { Component } from 'react';
//  import sassClasses from './App.scss';
//  import cssClasses from './App.css';
import Form from './containers/Form/Form';

class App extends Component {
    state = {
        fields: [
            {
                label: 'Full Name', name: 'fullName', type: 'text', editable: true, onChangeHandler: this.onChangeHandler, value: 'Mukesh Kumar Suman', valid: true, validationMessage: 'Please enter your name', validator: this.validator
            },
            {
                label: 'User Name', name: 'username', type: 'text', editable: true, onChangeHandler: this.onChangeHandler, value: 'Mukesh Suman', validationMessage: 'Please enter user name', validator: this.validator
            },
            {
                label: 'Home City', name: 'homeCity', type: 'checkbox', editable: true, onChangeHandler: this.onChangeHandler, options: ['Delhi', 'Bangalor', 'Hajipur', 'Patna', 'Kista', 'Talin'], value: 'Hajipur|Delhi', splitter: '|'
            },
            {
                label: 'Password', name: 'password', type: 'password', editable: true, onChangeHandler: this.onChangeHandler, value: '8765439@ettrw'
            },
            {
                label: 'Email', name: 'email', type: 'email', editable: true, onChangeHandler: this.onChangeHandler, value: 'mukesh060220@gmail.com'
            },
            {
                label: 'Mobile No.', name: 'mobileNo', type: 'number', onChangeHandler: this.onChangeHandler, value: '7542007544'
            },
            {
                label: 'User Type', name: 'userType', type: 'radio', editable: true, onChangeHandler: this.onChangeHandler, options: ['Admin', 'User'], value: 'Admin'
            },
            {
                label: 'Delivery Address', name: 'deliveryAddress', type: 'radio', editable: true, onChangeHandler: this.onChangeHandler, options: ['Office', 'Home'], value: 'Home'
            },
            {
                label: 'Vistited City', name: 'visitedCity', type: 'checkbox', editable: true, onChangeHandler: this.onChangeHandler, options: ['Delhi', 'Bangalor', 'Hajipur', 'Patna', 'Kista', 'Talin'], value: 'Hajipur,Delhi', splitter: ','
            },
            {
                label: 'Image', name: 'image', type: 'file', editable: false, onChangeHandler: this.onChangeHandler, value: ''
            },
            {
                label: 'Country', name: 'country', type: 'select', options: [{ label: 'India', value: 'India' }, { label: 'United Kingdom', value: 'United Kingdom' }, { label: 'US', value: 'US' }, { label: 'Russia', value: 'Russia' }], editable: true, onChangeHandler: this.onChangeHandler, value: ''
            }
        ],
        columns: 3,
        mode: 'edit' // edit/view
    }

    submitHandler = formPayLoad => {
        console.log(formPayLoad);
    }

    render() {
        return (
            <>
                <Form {...this.state} onSubmit={this.submitHandler} header='Test Form' />
            </>
        );
    }
}
export default App;