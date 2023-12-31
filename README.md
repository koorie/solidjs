# Koorie-SolidJS

___

###### Koorie Frontend Solidjs CLI. ESModule.

___

## Index of Contents

___

- [Description](#description)
- [Installation](#installation)
- [Road Map](#road-map)
- [JetBrains OSS Licence](#jetbrains-oss-license)

___

## Description

___

### The name Koorie

Koorie borrows, with respect and admirance, its name from one of the Indigenous Australian clans so named Koorie.  
Their beliefs about the creation of the whole reside in the "Dreamtime" stories.  
Many of these stories are expressed by artists of this clan and many others.  
I intend to support the freedom and equality of tribes and indigenous humans all over the planet.  
This name is a tribute to all the highest thoughts of equality.

___

### Yet another Node.js server

Here are we again?  
Nope, I wanted to understand the dynamics behind the more popular NodeJS servers around, like Fastify or Express just to
cite some of them, and so I took a chance to develop one from scratch.  
How is it going so far?  
One commit is alright the other one completely rewrites the app.  
Fun, a lot of fun.

___

### Design

___

When installed, koorie comes with one executable to spin-up a server, monitoring, makes changes and other cool stuff ⎔,  
Socket interface ⌖,  
Change, add and remove routes without restarting the server ♨,  
Cluster the server into many processes as many CPUs available ⑂ (--ease-fork will give you the opportunity to cluster as many instances of Koorie you wish),  
routes (middleware) ↬,  
and last but not least, executable ejected koorie module ⏏.  

#### executable interface ⎔

___

- **_koorie_** to spin-up a server instance/s.
  Many options can be given to the command line to start up server/s in seconds.  
  It requires just your HTML, CSS and JavaScript and `0` configuration to run your application.  
  It can be more complex than this,
  but once the options are given to the command line there is `0` configuration files to write down.

- **_koorie "Santa's little helper"_**. 
  With this interface it's possible to:
    - initialize a basic server project with one route and all the required options.
    - initialize a basic ejected koorie module server, one route and all the required options.
    - generate SSL self-signed certificate.
    - create, add, edit routes.
    - observe, through socket, performance and make changes on the fly.
    - refreshing routes without restarting the server.
    - initialize a React App.
    - compile your code from Typescript to Javascript.

___

#### socket interface ⌖

___

It's possible to activate the socket interface to control, edit and check the server behaviour.  
This functionality can be activated with the flag --activate-socket.

___

#### hot interface ♨︎

___

There are two ways to refresh routes on the fly:  

1. **_The socket way_**  
   `koorie spin-up --routes --activate-socket`  
   `koorie socket --find-socket`  
   `koorie socket --pid=25635 --refresh-routes`

2. **_the watcher mode using chokidar_**  
   `koorie spin-up --routes --watch`

Both ways will refresh the routes, one automated (chokidar) and one manual through the socket interface.  
If --activate-socket is given contemporary with --watch, the chokidar interface will be deactivated.  


___

#### forked ⑂

___

It is possible to fork koorie into many processes as many CPUs available on the host
(--ease-fork will give you the opportunity to cluster as many instances of Koorie you wish).  
To fork `koorie spin-up --fork=0`  
This command will instruct koorie to fork itself for half of the available CPUs on the host.

___

#### routes ↬

___

Middlewares are cool and koorie got you covered.  
Examples ➡︎ [here](https://github.com/simonedelpopolo/koorie/blob/main/docs/EXAMPLES.md)

___

#### ejected koorie module ⏏

___

Control on the code, configuration and personalization for a backend developer is a must.  
This functionality can be achieved using **koorie** or any other executable like **node**, **nodemon** and whatever it's the dev choice.  
Not rely-on-koorie executable is important when you want to build something different. Maybe a benchmarking testing suite? Who knows.  
However, it is here at your disposal.  
Examples ➡︎ [here]()

___

## Installation

___

It is possible to install Koorie as a module dependency, or it is possible to install it globally.  
I'll go through both ways explaining some available commands in Koorie and Koorie-Shell.

___

### Koorie as Module

```shell

# first make a directory and cd
mkdir my-stunning-server && cd my-stunning-server

# regular npm installation
npm install koorie-solidjs

# once installed, run
npx koorie-solidjs-shell init --bare # this will setup few files to get you started.

# at the prompt answer yes

# spin it up!
npx koorie-solidjs 
# you'll be prompt to choose the root directory of the project as the 'public' directory
# at the prompt answer yes

# open the browser at http://localhost:3001

```

___

## Koorie library

___

### Koorie server configuration file

___

> ⚠ The server configuration file is an experimental feature. It works anyway.

> It is a draft (for fun basically) on how it can be the hypothetical server configuration file. by adding and setting a .koorierc file it is possible to run `npx koorie` ❗ without any flags.

> The Object [ config.parser ] looks for charCode = `32`, at position `0` of the next line read by node:readline interface, that, corresponds to one empty character ( one space ). In this case everything after the first space will be treated as a comment, so then skipped from being parsed.

- To set an option the flags available are going to be used, **_without the double prefixing hyphen_**.
- The `option` name must be followed by one empty character and the equal sign `=`
- The `=` must be followed by an empty character and a string representing the `value` assigned to the `option`.
- Number are parsed and given back as primitive type {number}.

filename -> `.koorierc` must be named like this and must reside in project root directory.

```text

; this is a comment and will be skipped by Object [ config.parser ]

; static_files = path/to/public
; will fail because the option (left operand) must be the same, without double hyphen prefixing, as the flag passed to the command line [--static-files]. ❗ ONLY use the long flags!

; I left the line below uncommented 
static-files = path/to/public
; will go through ;)

; static-files= path/to/public
; will fail because ❗ MUST be one empty character from the equal sign for both left operand and right operand!

```

___

### Koorie terminal flags.

> ⚠ BREAKING CHANGES **since** version 1.x.x.  
> when a flag, for both koorie & koorie-shell, requires key:value options, it must be supplied this way:  
> `npx koorie --logger='options(quiet:true:write:log.txt)'` ♥︎
> `npx koorie --logger='options(quiet:true|write:log.txt)'` ♥︎♥︎ **_this is more readable_**
>
> ℹ single quotes are required.
> ___
> ~~before version 1.x.x was supplied this way:  
> npx koorie --logger=quiet:true:write:log.txt~~ ♠︎♠︎
___

| flags                              | description                                                                               |
|:-----------------------------------|:------------------------------------------------------------------------------------------|
| --address={string}                 | Sets the address to listen from. Default set to localhost.                                |
| --cluster={void}-{number}          | When {void} it forks the process for the half of the available CPUs.                      |
| --ejected={string}                 | Sets startup file ejected from koorie.                                                    |
| --experimental-log-writer          | Enables the experimental log writer                                                       |
| --health={void}                    | route health injected to check the status of the server.                                  |
| --hot={boolean}-{void}             | Default is set to false. When {void} it sets hot wired                                    |
| --http2={void}                     | HTTP2 server                                                                              |
| --library={string}                 | It tells to Koorie to expect a javascript library application.                            |
| --logger={'options(option:value)'} | Default set to print to stdout every request.                                             |
| --middleware={string}              | Default set to none. If set to 'without' no middleware will be seeked.                    |
| --port={number}-{void}             | Sets the port to listen from. Default set to 3001. When {void} listen from a random port. |
| --secure={'options(option:value)'} | HTTPS server                                                                              |
| --silenced={void}                  | It avoids populating the log with all the debug information. useful when in PRODUCTION    |
| --socket={'options(option:value)'} | Default is off. Available options: [active:boolean] required. [path:string] required.     |
| --static-files={string}            | It tells to Koorie to serve the files located in the specified directory.                 |

> ℹ If all the flags are omitted the default port is `3001`, the address is `localhost` and only a `single` instance of the process will run.  
> and you'll be prompted to confirm the root of your project ad `public directory`.

___

- #### --address

    - `npx koorie --address=192.168.1.1` -> It will listen on the specified IP address.
    - Default set to `localhost`

___

- #### --cluster

    - `npx koorie --cluster=4` -> It forks the process on 4 CPUs.
    - `npx koorie --cluster` -> It forks processes for the half of the available CPUs
    - `npx koorie --cluster=foo` -> process exits with errors.
    - `npx koorie --cluster=full` -> It forks processes for all the available CPUs
    - Default set to half of the available CPUs.

___

- #### --ejected

    - `npx koorie --ejected=servers/ejected_a.js` -> It will load the file at the specified path.
    - ⬆︎ this example still call **_npx koorie_** to show the use of the flag --ejected.
    - `node servers/ejected_a.js && node servers/ejected_b.js`
    - ⬆︎ this example call **_node_** to load the server_a.js & servers/ejected_b.js examples ➡︎ [here]()

___

- #### --experimental-log-writer

    - `npx koorie --experimental-log-writer --logger='options(write:./log.json)'`
        - it will enable the experimental log writer that help to improve the performance of the server while writing the log to a file.
    - `npx koorie --experimental-log-writer` -> process exits with errors.

___

- #### --health
    - This flag doesn't accept any argument.
    - It injects a route to check the health of the server.
    - `npx koorie --health`  
      once the server is up ad running the output should look like this ⇩
    - ```shell
       { address: '127.0.0.1', family: 'IPv4', port: 3001 }
       koorie your browser here ⬇︎
       http://localhost:3001
       ----------------------------------------------------
       health_key => da9eff89-6261-4d28-a5ac-8e648a1f3d32
    ```

      to check the health make a curl request or whatever
      ```shell
         curl 'http://localhost:3002/health?key=da9eff89-6261-4d28-a5ac-8e648a1f3d32'
      ```
        - **_the key is generated using node:crypto.randomUUID()_**
        - it is stored in **_process.ENV.HEALTH_KEY_**.  
          it can be overridden with the same ENVIRONMENT_VARIABLE_NAME   
          still the flag --health is necessary to inject the route. ⇩
    - `HEALTH_KEY=your-super-secure-key npx nodemon ./koorie.js --static-files=public --health`
      to check the health make a curl request or whatever
      ```shell
         curl 'http://localhost:3002/health?key=your-super-secure-key'
      ``` 
___

- #### --hot
    - `npx koorie --hot` -> it will hot wire koorie. so for every change done to the routes there will be no need to restart the
      server.
    - Default sets to false

___

- #### --http2
    - `npx koorie --http2 --secure='options(active:true|key:certs/key.pem:cert:certs/cert.pem:dhparam:certs/dhparam.pem)'`
    - it will spawn an HTTP2 server.
    - ❗ requires [--secure](#--secure) to be set

___

- #### --library
    - ⚠ work in progress to differentiate frameworks
    - `npx koorie --library=react` -> It tells to Koorie to expect a React application. Koorie will look for an index.html file
      under the `public` directory.
    - `npx koorie --library=4789` -> process exits with errors.

___

- #### --logger

    - `npx koorie --logger='options(quiet:true|write:logger.log)'` -> it will silence the Object [ koorie.logger ], and it will
      save the log to a file named logger.log in the root directory of the project.
    - Defaults set to `quiet=false` `write=null`

___

- #### --middleware

    - `npx koorie --middleware=starter.js` -> it will look for a file named starter.js in the root directory of the project
    - `npx koorie --middleware=without` -> it will NOT look for any middleware file.
    - The middleware file is used to register all the available routes and the incoming REQUEST, if any, to the specified route.
    - Default set to `middleware.js`

___

- #### --port

    - `npx koorie --port` -> It will listen on a random port.
    - `npx koorie --port=4789` -> It will listen on port 4789.
    - `npx koorie --port=foo` -> process exits with errors.
    - Default set to `3001`

___

- #### --secure

    - > _**to run HTTPS server it's necessary to obtain an SSL certificate.**_
        1. Using LetsEncrypt for production severs ➡︎ [LetsEncrypt](https://letsencrypt.org)
        2. Self-Signed certificates for (localhost)DEVELOPMENT or (trusted)PRIVATE_NETWORK ⬇︎

    - **_koorie-shell ssl --generate_** : generating self-signed certificate and dhparam (⚠︎ ︎DEVELOPMENT)
      ```shell
         # in the root directory of your project
      
         npx koorie-solidjs-shell ssl --generate='options(path:certs|key:koorie-solidjs.key.pem|cert:koorie-solidjs.cert.pem|dhparam:koorie-solidjs.dhparam.pem)'
      ```
        1. ⬆︎ a directory named `certs` will be made in the root of the project.
        2. a key named `koorie.key.pem` and a certificate named `koorie.cert.pem` will be placed in the `certs` directory.
        3. the process of generating the file `koorie.dhparam.pem` can take long time. once done will be placed in the `certs` directory.  
           **_koorie-shell will just use the command below, so, openssl is required to be available on the host OS_**

    - **_DoItYourself_** : generating self-signed certificate and dhparam with `openssl` (⚠︎ DEVELOPMENT):
      ```shell
         # in the root directory of your project
         mkdir certs && cd certs
      
         # ℹ the below command will generate a basic self-signed certificate expiring in 365 days
         #   without passphrase for the private key [-nodes] ❗️ NO PRODUCTION OR PRIVATE_NETWORK
         #   suppressed certificate questions [-subj '/CN=localhost']
         openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes -subj '/CN=localhost'
      
         # ℹ the below command will take some time.
         openssl dhparam -out dhparam.pem 2048
      ```
    - > **_--secure='options(active:true|key:certs/key.pem:cert:certs/cert.pem:dhparam:certs/dhparam.pem)'_**
      >
      > it will spawn an HTTPS server.

    - Defaults set to `active=false` `key=null` `cert=null` `dhparam=null`
    - ❗️Required Options:
        - _**active**_ ➡︎ must be true
        - _**key**_ ➡︎ path to the key.pem file
        - _**cert**_ ➡︎ path to the cert.pem file
    - ❗NOT required -> _**dhparam**_ ➡︎ path to the dhparam.pem file

___

- #### --silenced

    - `npx koorie --silenced` -> It avoids populating the log with all the debug information. useful when in PRODUCTION.
    - used with flag --logger='options(quiet:true)' completely disable any output at stdout. ( better performance )
        - ⚠ **advice** run the server with the following command  
          `npx koorie --silenced --logger='options(quiet:true|write:./log.json)'`  
          in this way a very simple log file will be saved for keep tracks of requests.

        - --silenced generates this log:
            - method of the request
            - url requested
            - status code
            - remote ip address
            - date

___

- #### --socket

    - `npx koorie --socket='options(active:true|path:/tmp/koorie.sock)'` -> it will open a socket at the specified path.
    - Defaults set to `active=false` `path=null`
    - Options are required. ⚠︎ combination active:false:path:/to/file.sock is not implemented yet.

___

- #### --static-files

- `npx koorie --static-files=public`  
  It looks for a directory called `public` in the root directory of the project, no found
  process exits with error.
- `npx koorie --static-files` -> **_It asks the below question_**.
    - public path is set to the root directory. is this fine? [**yes** **|** **no**]
    - answers: `yes|no OR y|n`
        - yes - The process will proceed showing a warning in the console that the `public` directory is set to the root
          directory of the project. Koorie will look "here" for files requested at the server. Not that safe right?
        - no - It will ask to specify a directory.
    - `npx koorie --static-files=28` -> process exits with errors.
    - Default it will ask the above question.

___

### Koorie-Shell commands and flags

___

| commands    | flags                                       | description                                                      |
|:------------|:--------------------------------------------|:-----------------------------------------------------------------|
| init        | --bare={void}                               | Generates a project in current working directory ❗️ [overwrites] |
|             | --git={void}                                | Initialize a git repository.                                     |
|             | --author={string}                           | Default set to null.                                             |
|             | --description={string}                      | Default set to null.                                             |
|             | --license={string}                          | Default set to null.                                             |
|             | --middleware={string}                       | Default set to 'middleware[.js]'.                                |
|             | --name={string}                             | Default set to null.                                             |
|             | --version={semver-string}                   | Default set to 0.0.1.                                            |
| route ❗️    | --add ❗️                                    | Add a basic route                                                |
|             | --delete ❗️                                 | Delete a route                                                   |
|             | --edit ❗️                                   | Edit a route                                                     |
| set         | --hot={boolean}                             | Switcher                                                         |
|             | --socket-path={string}                      | Path to koorie socket. required                                  |
| performance | --refresh-rate={number}                     | Stats refresh rate in milliseconds                               |
|             | --socket-path={string}                      | Path to koorie socket. required                                  |
| ssl         | --generate={'options(option:value)}-{void}' | Generates self-signed SSL certificate                            |

___

- #### init command

    - ##### --bare
        - `npx koorie-shell --bare`
        - using this flag will overwrite everything in the root directory of the project.  
          anyway it will be asked confirmation

    - ##### --git
        - This flag doesn't accept any argument. Initialize a git repository.

    - ##### --author
        - `npx koorie-shell --author='John Doe'`
        - It sets the author property of the package.json

    - ##### --description
        - `npx koorie-shell init --description='my amazing project'`
        - It sets the description property of the package.json

    - ##### --license
        - `npx koorie-shell init --license=Apache2.0`
        - It sets the license property of the package.json

    - ##### --middleware_
        - `npx koorie-shell --middleware=starter.js`
        - It creates a middleware file named starter.js, and it set the npm script 'serve' to use this as default middleware
          loader.

    - ##### --name
        - `npx koorie-shell --name=my-amazing-project`
        - It sets the name property of the package.json

    - ##### --version
        - `npx koorie-shell --version=10.23.635`
        - It sets the version property of the package.json

- #### ssl command

    - ##### --generate
        - `npx koorie-shell --generate`
        - will generate an SSL self-signed certificate in the root directory of the project.  
          once generated **_./key.pem & ./cert.pem_**
        - `npx koorie --secure='options(active:true:key:key.pem:cert:cert.pem)`
        - ℹ **_available options for flag --generate. none of them are required_**
            - path:{string} ➡︎ absolute OR relative. if the path doesn't exist it will make it. if not given the path is process.cwd()
            - key:{string} ➡︎ the wished name for the key. the extension should be `.pem`
            - cert:{string} ➡︎ the wished name for the cert. the extension should be `.pem`
            - dhparam:{string} ➡︎ the wished name for the dhparam. the extension should be `.pem`

- #### route command ❗ this command it `NOT AVAILABLE` yet. Consider this section an idea on how could be.

    - ##### --add
        - `koorie-shell --add=dang`
        - It saves a route with name `dang` into the directory `./routes/dang/route.js`
        - It adds the route to the middleware.js file.

    - ##### --delete
        - `npx koorie-shell --delete=dang`
        - It deletes the route named `dang`

    - ##### --edit
        - `npx koorie-shell --edit=dang`
        - maybe open OS EDITOR ( vim, emacs ) and editing the file **_./routes/dang/route.js_**
        - or maybe injecting code into the route public object?

- #### koorie-shell socket connection to koorie API

- #### --socket-path

    - > all the commands, socket related, must explicit define the path to koorie socket file with the flag `--socket-path=/path/to/koorie.sock`

- #### set command

    - ##### --hot_
        - `npx koorie-shell set --hot=false --socket-path=/path/to/koorie.sock`
        - it will switch off the hot wired functionality. anytime a route has changes the server must be restarted to apply che changes.

- #### performance command

    - ##### --refresh-rate
        - `npx koorie-shell performance --refresh-rate=2000 --socket-path/path/to/koorie.sock`
        - it will stream every 2 seconds the process.memoryUsage object


___

## Road Map

- [X] `koorie --secure` spawning https server.
- [X] `koorie --http2` spawning http2 server.
- [X] `koorie-shell ssl --generate` generating self-signed certificate.
- [X] **_working on a way to add routes without restarting the server._**
    - **_koorie --hot --socket='options=(active:true:path:/tmp/koorie.sock)_**  
      will spawn a server, hot wired, where editing a route will not require to restart the server to see the changes.  
      **_plus koorie will accept socket connection_** required to change on the fly the hot wired like shown below.
    - **_koorie-shell set --hot=false --socket-path=/tmp/koorie.sock_**  
      will switch off the hot wired and editing routes will require to restart the server to see the changes.
- [ ] `koorie-help flag --address` third executable interface for the help system.
- [X] [EXAMPLES.md](https://github.com/simonedelpopolo/koorie/blob/main/docs/EXAMPLES.md)
- [ ] `koorie-shell ssl --certbot` request to Lets Encrypt for a certificate, installing it and auto updating it.
- [ ] `koorie-shell route` command, relative flags `--add[-a]`, `--delete[-d]` &  
  `--edit[-e] 💡 ENVIRONMENT_VARIABLE EDITOR?`  
  options and any kind of sweets.
- [ ] `koorie-shell inject --route={name}` hot wired required, new route injected in the Object [ koorie.routes ] without restarting the server. This process will edit the middleware.js file.
- [ ] sort of class to send HTML response without reading a file. ⬇︎ 💡:
  ```javascript
  import {Answer} from 'koorie-solidjs'
  export async function component(){
    
    // some dynamic and obvious data
    const date = new Date()
  
    // the hypotetical class will handle this in some way.
    const html = () => {

      return (`<div>dynamic component loaded when hit the route[component]! today @ ${date}</div>`)
    }
    
    return new Answer( good => good( Buffer.from( html ) ) )

  }
  ```

- [ ] proxy server???
- [ ] koorie website, documentation of APIs and source code.
- [ ] more socket API functionalities

___

## JetBrains OSS License

___

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me
strength to keep on going with my studies and personal project.  
To learn more about this opportunity have a look
at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_


___

# Contacts

- twitter
- open-collective

___