// @ts-ignore
const requireCss = require.context('.', false, /\.css$/);
requireCss.keys().forEach(requireCss);
