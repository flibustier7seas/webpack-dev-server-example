# webpack dev server

## Iframe mode

При открытие файлов в iframe (пример 3 и 4), devServer будет обновлять их при изменении скриптов.

```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    inline: false, // default true
},
```

1) http://localhost:9000 и http://localhost:9000/ - не обновляет при изменении скриптов:
2) http://localhost:9000/webpack-dev-server - меню;
3) http://localhost:9000/webpack-dev-server/ - показывает файлы в iframe и обновляет их при изменении;
4) http://localhost:9000/webpack-dev-server/bundle.js - показывает bundle.js в iframe и обновляет при изменении скриптов;

## Inline mode

В bundle будет добавлен модуль ```refresh client``` (webpack-dev-server/client/index.js).
Этот модуль через сокет подключается к запущенному webpack-dev-server и ждет уведомления об изменении файлов, после чего перезагружает страницу.

```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    inline: true,
},
```

- http://localhost:9000 и http://localhost:9000/ - обновляет при изменении скриптов:
- http://localhost:9000/webpack-dev-server - меню;
- http://localhost:9000/webpack-dev-server/ - показывает файлы в iframe, и обновляет при изменении скриптов;
- http://localhost:9000/webpack-dev-server/bundle.js - показывает bundle.js в iframe, и обновляет при изменении скриптов;

## Hot Module Replacement

HMR - механизм, позволяющий добавлять или удалять модули в запущенном приложении без перезагрузки страницы. HMR поддерживает webpack и webpack-dev-server. 

```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    inline: true,
    hot: true,
},
plugins: [
    new webpack.HotModuleReplacementPlugin() // добавляет HMR Runtime модуль в bundle
]
```

При указании ключа ```hot``` в bundle будет добавлен модуль ```hot loader``` (webpack/hot/dev-server.js). Этот модуль подписывается на событие ```webpackHotUpdate``` и с помощью ```HMR Runtime``` запрашивает наличие обновлений, и если они есть запускает процесс обновления модулей. Модули должны обновляться сами, если они это не сделали, то ```hot loader``` перезагрузит страницу.

Событие ```webpackHotUpdate``` отправляет ```refresh client```, который при использовании ключа ```hot```, вместо обновления страницы, отправляет событие ```webpackHotUpdate```.

Как уже говорилось, модули должны обновлять себя сами, используя api ```HMR Runtime```. Некоторые loader'ы добавляют в модули код, который будем заниматься обновлением, например [style-loader](https://github.com/webpack-contrib/style-loader)
 или [react-hot-loader](https://github.com/gaearon/react-hot-loader).

### Команды
- webpack-dev-server --open - откроет в браузере

### Источники

- https://webpack.js.org/concepts/hot-module-replacement/
- https://webpack.js.org/configuration/dev-server/
- https://webpack.js.org/guides/hmr-react/
- https://habrahabr.ru/company/Voximplant/blog/270593/