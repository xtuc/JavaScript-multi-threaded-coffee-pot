# JavaScript multi-threaded coffee-pot

This projet is still in developpement and is not spec compliant.

As said in the wiki, HTCPCP is an extension of HTTP. This means that we cannot use Express as web server. Not even http package. The project needs to be re-written with net module from node standart library.

## Client

The client is a CLI. Launch it with command:
```sh
babel-node client/
```


## Server

You can launch the server with the following command:
```sh
babel-node server/
```

Server default port is 8080.

Multi-threading is provided by a node module: [webworker-threads](https://www.npmjs.com/package/webworker-threads).


### Links:

 * [Official RFC](https://tools.ietf.org/html/rfc2324)
 * [Wiki](https://fr.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol)
