export default {
	dest: `build/model-${process.env.entry}.js`,
	entry: `src/model-${process.env.entry}.js`,
	format: 'iife'
};
