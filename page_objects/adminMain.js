var adminMainCommands = {
    menuOpenElement: function (item, assertElement, assertStr, client, callback) {
        var self = this;
        this.main = client.page.adminMain();
        this.main.waitForElementVisible(item, client.globals.myPause)
            .click(item, () => {
                if (assertStr === null) {
                    console.log('No assertStr passed to the function. Checking element ' + assertElement + ' is visible.');
                    self.main.expect.element(assertElement).to.be.visible;
                    callback && callback();
                } else {
                    console.log('Checking element ' + assertElement + ' contains text: ' + assertStr + '.');
                    self.main.expect.element(assertElement).to.contain.text(assertStr);
                    callback && callback();
                }
            });
    },

    menuOpenElementAnotherWindow: function (item, assertElement, assertStr, client, callback) {
        this.main = client.page.adminMain();
        var self = this;
        this.main.waitForElementVisible(item, client.globals.myPause)
            .click(item, () => {
                client.window_handles(function (result) {
                    var parent = result.value[0];
                    var child = result.value[1];
                    client.switchWindow(child, () => {
                        if (assertStr === null) {
                            console.log('No assertStr passed to the function. Checking element ' + assertElement + ' is visible.');
                            self.main.waitForElementVisible(assertElement, client.globals.myPause)
                        } else {
                            console.log('Checking element ' + assertElement + ' contains text: ' + assertStr + '.');
                            self.main.waitForElementVisible(assertElement, client.globals.myPause, () => {
                                var locator = self.main.elements[assertElement.substring(1)].selector;
                                this.element('css selector', locator, (result) => {
                                    this.elementIdText(result.value.ELEMENT, (res) => {
                                        this.assert.equal(res.value, assertStr);
                                    });
                                })
                            })
                        }
                    })
                        .closeWindow(child)
                        .switchWindow(parent)
                        .pause(300, () => {
                            this.main = client.page.adminMain();
                            this.main.waitForElementVisible('@link', client.globals.myPause, callback && callback());
                        });
                });
            });
    }
}

module.exports = {
    url: function () {
        return this.api.launchUrl + '/admin';
    },
    commands: [adminMainCommands],
    elements: {
        headerText: '#content > h1',
        loginButton: 'div.footer > button',
        stub: 'body',

        link: '[href="http://www.litecart.net"]',

        topCatalog: 'div.header > [href*="/litecart/en/"]',
        topHome: 'div.header > [title="Home"]',
        topWebmail: 'div.header > [href*="key=webmail_link"]',
        topDatabaseMan: 'div.header > [href*="key=database_admin_link"]',
        topLogout: 'div.header > [href*="admin/logout.php"]',

        appearance: ' [href*="admin/?app=appearance&doc=template"]',
        appearLogotype: 'li#doc-logotype',
        appearTemplate: 'li#doc-template',

        catalog: ' [href*="admin/?app=catalog&doc=catalog"]',
        catalogProdG: 'li#doc-product_groups',
        catalogOptG: 'li#doc-option_groups',
        catalogManufact: 'li#doc-manufacturers',
        catalogSuppliers: 'li#doc-suppliers',
        catalogDelivSt: 'li#doc-delivery_statuses',
        catalogSoldOutSt: 'li#doc-sold_out_statuses',
        catalogQntUnits: 'li#doc-quantity_units',
        catalogCSVImpExp: 'li#doc-csv',
        catalogCatalog: 'li#doc-catalog',

        сountries: '[href*="admin/?app=countries&doc=countries"]',

        currencies: '[href*="admin/?app=currencies&doc=currencies"]',

        customers: '[href*="admin/?app=customers&doc=customers"]',
        custNews: 'li#doc-newsletter',
        custCsv: 'li#doc-csv',
        custCust: 'li#doc-customers',

        geoZones: '[href*="admin/?app=geo_zones&doc=geo_zones"]',

        languages: '[href*="admin/?app=languages&doc=languages"]',
        langStor: 'li#doc-storage_encoding',
        langLang: 'li#doc-languages',


        modules: '[href*="admin/?app=modules&doc=jobs"]',
        modCust: 'li#doc-customer',
        modShip: 'li#doc-shipping',
        modPay: 'li#doc-payment',
        modTotal: 'li#doc-order_total',
        modSuc: 'li#doc-order_success',
        modAct: 'li#doc-order_action',
        modBckJobs: 'li#doc-jobs',

        orders: '[href*="admin/?app=orders&doc=orders"]',
        orderStat: 'li#doc-order_statuses',
        orderOrd: 'li#doc-orders',

        pages: 'a:not([href*="&page=1&language=en"])[href*="admin/?app=pages&doc=pages"]',

        reports: '[href*="/?app=reports&doc=monthly_sales"]',
        repMostSold: 'li#doc-most_sold_products',
        repMostShop: 'li#doc-most_shopping_customers',
        repMonthly: 'li#doc-monthly_sales',

        settings: '[href*="admin/?app=settings&doc=store_info"]',
        setDefaults: 'li#doc-defaults',
        setGeneral: 'li#doc-general',
        setListings: 'li#doc-listings',
        setImages: 'li#doc-images',
        setCheckOut: 'li#doc-checkout',
        setAdvanced: 'li#doc-advanced',
        setSecurity: 'li#doc-security',
        setStoreInf: 'li#doc-store_info',

        slides: '[href*="admin/?app=slides&doc=slides"]',

        tax: '[href*="admin/?app=tax&doc=tax_classes"]',
        taxRates: 'li#doc-tax_rates',
        taxClasses: 'li#doc-tax_classes',

        translations: '[href*="admin/?app=translations&doc=search"]',
        transScan: 'li#doc-scan',
        transCSV: 'li#doc-csv',
        transSearch: 'li#doc-search',

        users: '[href*="admin/?app=users&doc=users"]',

        vQmods: '[href*="admin/?app=vqmods&doc=vqmods"]',
        vQmodsSub: 'li#doc-vqmods'
    }
};