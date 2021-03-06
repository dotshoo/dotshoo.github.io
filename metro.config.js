/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const { getDefaultConfig } = require("metro-config");

module.exports = async () => {
	const {
		resolver: { assetExts },
	} = await getDefaultConfig();

	return {
		resolver: {
			assetExts: [...assetExts, "css", "scss"],
			blockList: exclusionList([
				// This stops "react-native run-windows" from causing the metro server to crash if its already running
				new RegExp(`${path.resolve(__dirname, "windows").replace(/[/\\]/g, "/")}.*`),
				// This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
				new RegExp(`${path.resolve(__dirname, "windows")}/build/.*`),
				new RegExp(`${path.resolve(__dirname, "windows")}/target/.*`),
				/.*\.ProjectImports\.zip/,
			]),
		},
		transformer: {
			getTransformOptions: async () => ({
				transform: {
					experimentalImportSupport: false,
					inlineRequires: false,
				},
			}),
		},
	};
};
