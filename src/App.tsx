import React, { ReactElement, Suspense } from "react";
import { Router, Route } from "./components/Router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Provider } from "react-redux";
import Store from "./util/Store";
import { Themes } from "./util/Themes";
import { Platform, View } from "react-native";
import BackHandler from "./components/BackHandler";
import { LogBox } from "react-native";
import Routes from "./components/Routes";

LogBox.ignoreAllLogs();

declare module "react-native" {
	interface PlatformStatic {
		isDesktop?: boolean;
		isMobile?: boolean;
	}
}

Platform.isDesktop = Platform.OS === "macos" || Platform.OS === "windows";
Platform.isMobile = Platform.OS === "ios" || Platform.OS === "android";

export default function App() {
	return (
		<Provider store={Store}>
			<ErrorBoundary>
				<Router>
					<Themes>
						<SafeAreaProvider>
							<View style={{ width: "100%", height: "100%" }} className="bg">
								<Suspense fallback={<></>}>
									<BackHandler>
										<Routes />
									</BackHandler>
								</Suspense>
							</View>
						</SafeAreaProvider>
					</Themes>
				</Router>
			</ErrorBoundary>
		</Provider>
	);
}
