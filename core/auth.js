'use strict';

const { authentication } = require('./apis');
const { getClient, getAuthorization } = require('./env');

class Auth {

    constructor(request) {
        this.request = request;   
        this.authentication = authentication;
        // run auth services
        this.initializar();
        // setting data
        this.user = {};
        this.logged = false;
    }

    async initializar () {
        this.authentication.config(getClient(this.request));
        this.authentication.config(getAuthorization(this.request));
    }

    async verify (socket) {
        let { success, message, user } = await this.authentication.get(`me`)
        .then(res =>  res.data)
        .catch(err => {
            return ({
                success: false,
                status: data.status || 401,
                code: err.code || 'ERR_AUTHORIZATION',
                user: {},
                message: err.message
            })
        });
        // validar logueo
        if (!success) socket.disconnect(true);
        // add
        this.logged = success;
        this.user = user;
    }

}

module.exports = Auth;