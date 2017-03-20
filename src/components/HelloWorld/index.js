import React, { Component } from 'react';
import { connect } from 'react-redux';

class HelloWorld extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.message}</h1>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        message: state.default.defaultMessage
    };
};

export default connect(mapStateToProps)(HelloWorld);
