'use strict';
/////////////////////
//Настройка webpack//
/////////////////////

//подключаем path
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//Данный плагин создает файл index.html в той же дирректории
// что и трансформированный(и добавляет ссылку на него)
var HTMLWebpackPlugin = require('html-webpack-plugin'); 
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	//адрес исходного файла
	template: __dirname + '/src/index.html',
	//имя нового файла
	filename: 'index.html',
	//добавляет ссылку на трансформированный файл в <body>, или в <head>
	inject: 'body'
});

//Подключаем плагин коорый отделяет css свойства от остального js в отдельный файл
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//Вся конфигурация внутри этого объекта
module.exports = {
	//__dirname ссылается на текущий исполняемый файл
	//Точка входа (entry point) адрес главного js файла
	entry: ['babel-polyfill', 
			'./src/index.js'], 
	//сказать webpack, что делать с кодом
	module: {
		//Каждый «загрузчик», 
		//который вы добавляете в массив загрузчиков, 
		//будет представлять собой преобразование, 
		//которое ваш код пройдет до того, как попадет в браузер.
		rules: [
			{
				//Каждому объекту загрузчика требуется свойство test. 
				//test указывает, какие файлы будут зависеть от загрузчика
				test: /\.js$/,
				//исключить из преобразования
				//include - влючить в преобразование
				exclude: /node_modules/,
				//какие преобразования должен выполнять "загрузчик"
				loader: 'babel-loader'
			},

			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']
				// назначен загрузчик, который извлекает только css
				use: ExtractTextPlugin.extract({
					use: 'css-loader'
				})
			}
		]
	},

	devtool: 'cheap-module-source-map',

	output: {
		//Задаем имя трансформированного файла
		filename: '[name].bundle.js',
		//Путь куда его сохранить
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
    	sourceMapFilename: '[name].map'
	},

	//потключаем созданные выше плагины
	plugins: [
		HTMLWebpackPluginConfig,
		new ExtractTextPlugin('style.css'),
		new UglifyJSPlugin({
     		sourceMap: true,
    	})
	]
};