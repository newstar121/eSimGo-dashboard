import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import AppProvider from './contexts/AppContext';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
	<AppProvider>
		<ChakraProvider theme={theme}>
			<React.StrictMode>
				<ThemeEditorProvider>
					<HashRouter>
						<Switch>
							<Route path={`/auth`} component={AuthLayout} />
							<Route path={`/admin`} component={AdminLayout} />
							<Route path={`/rtl`} component={RtlLayout} />
							<Redirect from='/' to='/auth' />
						</Switch>
					</HashRouter>
				</ThemeEditorProvider>
			</React.StrictMode>
		</ChakraProvider>
	</AppProvider>,

	document.getElementById('root')
);
