module.exports = {
    before: function (client, done) {
        this.customer = client.page.customerMain();
        this.customer.customerOpen(client, () => {
            done();
        });
        client.props = {
            home: {
                normPrice: this.customer.elements.goodsNormPriceHome.selector,
                salePrice: this.customer.elements.goodsSalePriceHome.selector
            },
            internal: {
                normPrice: this.customer.elements.goodsNormPriceInternal.selector,
                salePrice: this.customer.elements.goodsSalePriceInternal.selector
            }
        };
    },

    after: function (client, done) {
        client.end();
        done();
    },

    "CSS Properties Check on the Home Screen": function (client) {
        this.customer.cssPropsCheck('home', client, () => {
            this.customer.goodsPriceSizeCompare('home', client);
        });
    },

    "Names and Prices should coincide": function (client) {
        this.customer.goodsNamePriceCompare(client);
    },

    "CSS Properties Check on the Internal Screen": function (client) {
        this.customer.cssPropsCheck('internal', client, () => {
            this.customer.goodsPriceSizeCompare('internal', client);
        });
    }
};