import config from "./../config";
import {logPlugin} from "@babel/preset-env/lib/debug";

const https = require('node:https');

const getClients = async (req, res) => {
    const url = config.client;
    const param = req.params.id;
    let endpoint = url + '?id=*';
    if (param != undefined) {
        endpoint = url + '?id=' + param;
    }
    https.get(endpoint, response => {
        response.on('data', (r) => {
            res.json(JSON.parse(r));
        });
    })
}

const insertClients = async (req, res) => {
    const url = config.client;
    const options = {
        method: 'POST',
        body: JSON.stringify(req.body)
    };
    const postResponse = https.request(url, options, response => {
        return response.on('data', (d) => {
            res.json(JSON.parse(d));
        });
    });
    postResponse.write(options.body);
    postResponse.end();
}

const updateClients = async (req, res) => {
    const url = config.client;
    const options = {
        method: 'PUT',
        body: JSON.stringify(req.body)
    };
    const putResponse = https.request(url, options, response => {
        return response.on('data', (d) => {
            res.json(JSON.parse(d));
        });
    });
    putResponse.write(options.body);
    putResponse.end();
}

export const methods = {getClients, insertClients, updateClients};