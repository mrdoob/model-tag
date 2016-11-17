export default {
	dest: `dist/model-${process.env.entry}.js`,
	entry: `src/model-${process.env.entry}.js`,
	format: 'iife'
};
