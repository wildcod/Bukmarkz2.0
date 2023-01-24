import React, {Fragment, useEffect} from 'react';
import {withAlert} from 'react-alert'
import { connect } from 'react-redux'

const Alerts = ({
error,
alert,
message
}) => {

    useEffect(() => {
        if (error.msg.non_field_errors) alert.error(`${error.msg.non_field_errors.join()}`)
        if (error.msg.username) alert.error(`${error.msg.username.join()}`)
        if (error.msg.title) alert.error(`Title: ${error.msg.title.join()}`)
        if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`)
        if (error.msg.url) alert.error(`Url: ${error.msg.url.join()}`)
        if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`)
        if (error.msg.description) alert.error(`Description: ${error.msg.description.join()}`)
        if (error.msg.importError) alert.error(`Error: ${error.msg.importError}`)
    }, [error])

    useEffect(() => {
        console.log('Alert Message', message)
        if (message?.categoryDeleted) alert.success(message.categoryDeleted)
        if (message?.categoryAdded) alert.success(message.categoryAdded)
        if (message?.categoryUpdated) alert.success(message.categoryUpdated)
        if (message?.bookmarkDeleted) alert.success(message.bookmarkDeleted)
        if (message?.bookmarkAdded) alert.success(message.bookmarkAdded)
        if (message?.bookmarkUpdated) alert.success(message.bookmarkUpdated)
        if (message?.emailSent) alert.success(message.emailSent)
        if (message?.resetSuccess) alert.success(message.resetSuccess)
        if (message?.recommDeleted) alert.success(message.recommDeleted)
        if (message?.categoryAddedToDashboard) alert.success(message.categoryAddedToDashboard)
        if (message?.fileNotValid) alert.show(message.fileNotValid)
        if (message?.tooManyData) alert.show(message.tooManyData)
        if (message?.bookmarkUploaded) alert.success(message.bookmarkUploaded)
    }, [message])

    return <Fragment />;
};

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts))
