module.exports = {
    before: function (client, done) {
        this.customer = client.page.customerMain();
        this.customer.customerOpen(client, () => {
            done();
        });
    },

    after: function (client, done) {
        client.end();
        done();
    },

    "Duck's Labels Count Check": function (client) {
        this.customer.stickerCheck(client);
    }
};