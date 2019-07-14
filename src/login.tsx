/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Login
 */

import * as React from 'react';
import { Dimensions, View, WebView, ViewStyle, NativeSyntheticEvent, WebViewMessageEventData } from 'react-native';
import { Brontosaurus } from './config';

export type LoginViewProps = {

    readonly config: Brontosaurus;
    readonly height?: number;
    readonly width?: number;
};

export class LoginView extends React.Component<LoginViewProps> {

    public constructor(props: LoginViewProps) {

        super(props);

        this._handleMessage = this._handleMessage.bind(this);
    }

    public render() {

        return (<View>
            <WebView
                scrollEnabled={false}
                style={this._getStyle()}
                onMessage={this._handleMessage}
                source={{ uri: this._getURI() }}
            />
        </View>);
    }

    private _handleMessage(event: NativeSyntheticEvent<WebViewMessageEventData>): void {

        const data: string = event.nativeEvent.data;
        console.log(data);
    }

    private _getStyle(): ViewStyle {

        const style: ViewStyle = {
            width: this.props.width || Dimensions.get('window').width,
        }

        if (this.props.height) {
            return {
                ...style,
                height: this.props.height,
            };
        }
        return {
            ...style,
            flex: 1,
        }
    }

    private _getURI(): string {

        const server: string = this.props.config.server;
        const key: string = this.props.config.applicationKey;
        return `${server}?key=${key}&cb=POST`;
    }
}
