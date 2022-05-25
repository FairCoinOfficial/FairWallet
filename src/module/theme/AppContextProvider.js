import React, { Component } from "react";
import { BlueGray, LightGreen } from "./Themes";
import { Provider as PaperProvider } from 'react-native-paper';
const Context = React.createContext();
export class AppContextProvider extends Component {
    state = {
        theme: LightGreen,
        updateTheme: (theme) => {
            this.setState({ theme: theme })
        }
    }
    render() {
        const { theme } = this.state
        return (
            <Context.Provider value={ this.state }>
                <PaperProvider theme={ theme }>
                    { this.props.children }
                </PaperProvider>
            </Context.Provider>
        )
    }
}

export const AppConsumer = Context.Consumer;
export const AppContext = Context;
