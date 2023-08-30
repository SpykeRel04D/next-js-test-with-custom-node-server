import { defineConfig } from "cypress";

let server;

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			on("task", {
				mockServer({ interceptUrl, fixture }) {
					const fs = require("fs");
					const http = require("http");
					const { URL } = require("url");

					if (server) server.close();

					const url = new URL(interceptUrl);
					server = http.createServer((req, res) => {
						if (req.url === url.pathname) {
							const data = fs.readFileSync(`./cypress/fixtures/${fixture}`);
							res.end(data);
						} else {
							res.end();
						}
					});

					server.listen(url.port);
					console.log(`listening at port ${url.port} (${url.host})`);

					return null;
				}
			});
		}
	}
});
