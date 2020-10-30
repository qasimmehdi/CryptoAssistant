import { Input } from 'galio-framework';
import React, { Component } from "react";

class CustomInput extends Component {
    handleValidation(value) {
        const { pattern } = this.props;
        if (!pattern) return true;
        // string pattern, one validation rule
        if (typeof pattern === 'string') {
            const condition = new RegExp(pattern, 'g');
            return condition.test(value);
        }
        // array patterns, multiple validation rules
        if (typeof pattern === 'object') {
            const conditions = pattern.map(rule => new RegExp(rule, 'g'));
            return conditions.map(condition => condition.test(value));
        }
    }
    onChange(value) {
        const { onChangeText, onValidation } = this.props;
        const isValid = this.handleValidation(value);
        onValidation && onValidation(isValid);
        onChangeText && onChangeText(value);
    }
    render() {
        const {
            pattern,
            onChangeText,
            children,
            style,
            ...props
        } = this.props;
        return (
            <Input
                style={style}
                onChangeText={value => this.onChange(value)}
                {...props}
            >
                {children}
            </Input>
        );
    }
}
export default CustomInput;