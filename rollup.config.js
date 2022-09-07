export default [
	{
		input: "./src/minitz.single.js",
		output: {
			file: "dist/minitz.cjs",
			format: "umd",
			name: "minitz",
			exports: "default"
		}
	},
	{	
		input: "./src/minitz.js",
		output: {
			file: "dist/minitz.mjs",
			format: "es"
		}
	}
];