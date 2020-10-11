import React from 'react';
import App from "../App"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
        })
    }

    render() { 
        if (this.state.hasError) {
            return (
            <div>
                <h1>Something went wrong, please try again.</h1>
                <App />
            </div>)
        }
        return this.props.children
    }
}
 
export default ErrorBoundary;