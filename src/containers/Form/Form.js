import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Form.css';
import Utils from '../../Utils/Utils';

class Form extends Component {
    /*
    state = {
       fields: [
            {label: 'Full Name', name: 'fullName', type: 'text', editable: false, onChangeHandler: this.onChangeHandler, value: 'Mukesh Kumar Suman', valid: true, validationMessage: 'Please enter your name', validator: this.validator},
            {label: 'User Name', name: 'username', type: 'text', editable: true, onChangeHandler: this.onChangeHandler, value: 'Mukesh Suman', validationMessage: 'Please enter user name', validator: this.validator},
            {label: 'Home City', name: 'homeCity', type: 'checkbox', editable: true, onChangeHandler: this.onChangeHandler, options: ['Delhi', 'Bangalor', 'Hajipur', 'Patna', 'Kista', 'Talin'], value: 'Hajipur,Delhi', splitter: '|'},
            {label: 'Password', name: 'password', type: 'password', editable: false, onChangeHandler: this.onChangeHandler, value: '8765439@ettrw'},
            {label: 'Email', name: 'email', type: 'email', editable: true, onChangeHandler: this.onChangeHandler, value: 'mukesh060220@gmail.com'},
            {label: 'Mobile No.', name: 'mobileNo', type: 'number', onChangeHandler: this.onChangeHandler, value: '7542007544'},
            {label: 'User Type', name: 'userType', type: 'radio', editable: true, onChangeHandler: this.onChangeHandler, options: ['Admin', 'User'], value: 'Admin'},
            {label: 'Delivery Address', name: 'deliveryAddress', type: 'radio', editable: true, onChangeHandler: this.onChangeHandler, options: ['Office', 'Home'], value: 'Home'},
            {label: 'Vistited City', name: 'visitedCity', type: 'checkbox', editable: true, onChangeHandler: this.onChangeHandler, options: ['Delhi', 'Bangalor', 'Hajipur', 'Patna', 'Kista', 'Talin'], value: 'Hajipur,Delhi', splitter: ','},
            {label: 'Image', name: 'image', type: 'file', editable: true, onChangeHandler: this.onChangeHandler, value: ''}
        ],
        columns: 2,
        mode: 'view' // edit
    }
    */

    constructor(props) {
        super(props);
        this.payLoad = this.getPayload(props);
        this.state = {
            fields: []
        };
    }

    getPayload() {
        const payLoad = {};
        this.props.fields.map(field => {
            payLoad[field.name] = field.value;
        });
        return payLoad;
    }

    static getDerivedStateFromProps(nextProps) {
        return { ...nextProps };
    }

    getColumnsFields() {
        const fields = [...this.state.fields];
        const totalNoOfFields = fields.length;
        const column = this.state.columns;
        const noOfFiledsInSIngleColumn = Math.ceil(totalNoOfFields / column);
        const childrens = fields.map(field => this.getField(field));

        return this.chunkArray(childrens, noOfFiledsInSIngleColumn);
    }

    getField(field) {
        const label = field.label ? field.label : Utils.decamelize(field.name);
        const readonly = (field.editable !== undefined || field.editable !== null) ? !field.editable : false;
        if (this.state.mode === 'view') {
            return (
                <div className={classes.fields}>
                    <div key="label">{`${label}: `}</div>
                    <div key="value">{field.value}</div>
                </div>
            );
        }
        if (field.type === 'radio' || field.type === 'checkbox') {
            const options = field.options.map((option, index) => {
                const splitter = field.splitter ? field.splitter : ',';
                const values = field.value.split(splitter);
                const checked = values.includes(option);
                return (
                    <div className={classes.options} key={index.toString()}>
                        <input checked={checked} type={field.type} id={`${field.name}__${option}`} name={field.name} value={option} onChange={this.onChnageHandler} disabled={readonly} />
                        <label htmlFor={`${field.name}__${option}`}>{option}</label>
                    </div>
                );
            });
            return (
                <div key={field.name} className={field.valid !== undefined && !field.valid ? `${classes.fields} ${classes.invalid_field}` : classes.fields}>
                    <label htmlFor={field.name}>{`${label}: `}</label>
                    {options}
                    {field.valid !== undefined && !field.valid && <p className={classes.error}>{field.validationMessage}</p>}
                </div>
            );
        }

        if (field.type === 'file') {
            return (
                <div key={field.name} className={field.valid !== undefined && !field.valid ? `${classes.fields} ${classes.invalid_field}` : classes.fields}>
                    <label htmlFor={field.name}>{`${label}: `}</label>
                    <input type={field.type} id={field.name} name={field.name} onChange={this.onChnageHandler} readOnly={readonly} />
                    {field.value && <div className="abc"><img src={`data:image/png;base64,${field.value}`} alt={field.alt} /></div>}
                    {field.valid !== undefined && !field.valid && <p className={classes.error}>{field.validationMessage}</p>}
                </div>
            );
        }
        return (
            <div key={field.name} className={field.valid !== undefined && !field.valid ? `${classes.fields} ${classes.invalid_field}` : classes.fields}>
                <label htmlFor={field.name}>{`${label}: `}</label>
                <input type={field.type} id={field.name} name={field.name} onChange={this.onChnageHandler} value={field.value} readOnly={readonly} />
                {field.valid !== undefined && !field.valid && <p className={classes.error}>{field.validationMessage}</p>}
            </div>
        );
    }

    getSplitter(key) {
        const field = this.getFieldByName(key);
        return field.splitter ? field.splitter : ',';
    }

    getFieldByName(key) {
        return this.state.fields.find(field => key === field.name);
    }

    onChnageHandler = e => {
        const target = e.target;
        const key = target.name;
        let value = target.value;
        const fieldType = target.type;
        if (fieldType === 'checkbox') {
            const splitter = this.getSplitter(key);
            const checked = target.checked;
            if (checked) {
                const payLoad = this.payLoad[key].split(splitter).filter(fieldValue => fieldValue !== '');
                payLoad.push(value);
                value = payLoad.join(splitter);
            } else {
                value = this.payLoad[key].split(splitter).filter(fieldValue => fieldValue !== value).join(splitter);
            }
        }
        if (fieldType === 'file') {
            this.processFile(key, target.files[0], e);
            return;
        }
        this.payLoad = { ...this.payLoad, [key]: value };
        this.setState(prevState => {
            const updatedFields = prevState.fields.map(field => {
                if (field.name === key) {
                    field.value = value;
                    if (field.validator) {
                        field.valid = field.validator(field.value);
                    }
                    if (field.onChangeHandler) {
                        field.onChangeHandler(e);
                    }
                }
                return field;
            });
            return { fields: updatedFields }
        });
    }

    chunkArray(myArray, chunksSize) {
        let index = 0;
        const arrayLength = myArray.length;
        const tempArray = [];
        for (index = 0; index < arrayLength; index += chunksSize) {
            const myChunk = myArray.slice(index, index + chunksSize);
            tempArray.push(myChunk);
        }
        return tempArray;
    }

    processFile(key, files) {
        const raeder = new FileReader();
        raeder.readAsDataURL(files);
        raeder.onload = e => {
            const value = raeder.result.split(',')[1];
            this.payLoad = { ...this.payLoad, [key]: value };
            this.setState(prevState => {
                const updatedFields = prevState.fields.map(field => {
                    if (field.name === key) {
                        field.value = value;
                        field.files = files;
                        if (field.validator) {
                            field.valid = field.validator(files);
                        }
                        if (field.onChangeHandler) {
                            field.onChangeHandler(e);
                        }
                    }
                    return field;
                });
                return { fields: updatedFields }
            });
        };
    }

    render() {
        const columnsFields = this.getColumnsFields();
        //  const columnWidth = Math.floor(100 / columnsFields.length);
        const childrens = columnsFields.map((columnFields, index) => <div key={index.toString()}>{columnFields}</div>);

        return (
            <div className={classes.form}>
                <h1 className={classes.Header}>{this.props.header}</h1>
                <div className={classes.flex_container}>
                    {childrens}
                </div>
                { this.state.mode === 'edit' && <button type="button" className={classes.button} onClick={() => this.state.onSubmit(this.payLoad)}>Submit</button>}
            </div>
        );
    }
}

Form.propTypes = {
    fields: PropTypes.arrayOf.isRequired,
    header: PropTypes.string.isRequired
}

export default Form;