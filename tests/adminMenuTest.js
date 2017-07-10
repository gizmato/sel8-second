module.exports = {
    before: function (client, done) {
        this.adminMain = client.page.adminMain()
        this.adminLogin = client.page.adminLogin();
        var self = this;
        self.adminLogin.login('admin', 'admin', client, () => {
            self.adminMain.waitForElementVisible('@link', client.globals.myPause, () => {
                done();
            });
        });
    },

    after: function (client, done) {
        client.end();
        done();
    },

    'Header Items Check': function (client, done) {
        this.adminMain.menuOpenElement('@topCatalog', '@stub', null, client, () => {
            client.url(client.launch_url + '/admin/', () => {
                this.adminMain.menuOpenElement('@topHome', '@stub', null, client, () => {
                    this.adminMain.menuOpenElementAnotherWindow('@topWebmail', '@headerText', 'Settings', client, () => {
                        this.adminMain.menuOpenElementAnotherWindow('@topDatabaseMan', '@headerText', 'Settings', client, () => {
                            this.adminMain.menuOpenElement('@topLogout', '@loginButton', 'Login', client, () => {
                                this.adminLogin.login('admin', 'admin', client, () => {
                                    this.adminMain.waitForElementVisible('@link', client.globals.myPause, () => { });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    'Appearance Items Check': function (client) {
        this.adminMain.menuOpenElement('@appearance', '@headerText', 'Template', client, () => {
            this.adminMain.menuOpenElement('@appearLogotype', '@headerText', 'Logotype', client, () => {
                this.adminMain.menuOpenElement('@appearTemplate', '@headerText', 'Template', client, () => {
                });
            });
        });
    },

    'Catalog Items Check': function (client) {
        this.adminMain.menuOpenElement('@catalog', '@headerText', 'Catalog', client, () => {
            this.adminMain.menuOpenElement('@catalogProdG', '@headerText', 'Product Groups', client, () => {
                this.adminMain.menuOpenElement('@catalogOptG', '@headerText', 'Option Groups', client, () => {
                    this.adminMain.menuOpenElement('@catalogManufact', '@headerText', 'Manufacturers', client, () => {
                        this.adminMain.menuOpenElement('@catalogSuppliers', '@headerText', 'Suppliers', client, () => {
                            this.adminMain.menuOpenElement('@catalogDelivSt', '@headerText', 'Delivery Statuses', client, () => {
                                this.adminMain.menuOpenElement('@catalogSoldOutSt', '@headerText', 'Sold Out Statuses', client, () => {
                                    this.adminMain.menuOpenElement('@catalogQntUnits', '@headerText', 'Quantity Units', client, () => {
                                        this.adminMain.menuOpenElement('@catalogCSVImpExp', '@headerText', 'CSV Import/Export', client, () => {
                                            this.adminMain.menuOpenElement('@catalogCatalog', '@headerText', 'Catalog', client);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    'Countries Item Check': function (client) {
        this.adminMain.menuOpenElement('@сountries', '@headerText', 'Countries', client);
    },

    'Currencies Item Check': function (client) {
        this.adminMain.menuOpenElement('@currencies', '@headerText', 'Currencies', client);
    },

    'Customer Items Check': function (client) {
        this.adminMain.menuOpenElement('@customers', '@headerText', 'Customers', client, () => {
            this.adminMain.menuOpenElement('@custCsv', '@headerText', 'CSV Import/Export', client, () => {
                this.adminMain.menuOpenElement('@custNews', '@headerText', 'Newsletter', client, () => {
                    this.adminMain.menuOpenElement('@custCust', '@headerText', 'Customers', client);
                });
            });
        });
    },

    'Geo Zones Item Check': function (client) {
        this.adminMain.menuOpenElement('@geoZones', '@headerText', 'Geo Zones', client);
    },

    'Languages Items Check': function (client) {
        this.adminMain.menuOpenElement('@languages', '@headerText', 'Languages', client, () => {
            this.adminMain.menuOpenElement('@langStor', '@headerText', 'Storage Encoding', client, () => {
                this.adminMain.menuOpenElement('@langLang', '@headerText', 'Languages', client);
            });
        });
    },

    'Modules Items Check': function (client) {
        this.adminMain.menuOpenElement('@modules', '@headerText', 'Job Modules', client, () => {
            this.adminMain.menuOpenElement('@modCust', '@headerText', 'Customer Modules', client, () => {
                this.adminMain.menuOpenElement('@modShip', '@headerText', 'Shipping Modules', client, () => {
                    this.adminMain.menuOpenElement('@modPay', '@headerText', 'Payment Modules', client, () => {
                        this.adminMain.menuOpenElement('@modTotal', '@headerText', 'Order Total Modules', client, () => {
                            this.adminMain.menuOpenElement('@modSuc', '@headerText', 'Order Success Modules', client, () => {
                                this.adminMain.menuOpenElement('@modAct', '@headerText', 'Order Action Modules', client, () => {
                                    this.adminMain.menuOpenElement('@modBckJobs', '@headerText', 'Job Modules', client);
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    'Orders Items Check': function (client) {
        this.adminMain.menuOpenElement('@orders', '@headerText', 'Orders', client, () => {
            this.adminMain.menuOpenElement('@orderStat', '@headerText', 'Order Statuses', client, () => {
                this.adminMain.menuOpenElement('@orderOrd', '@headerText', 'Orders', client);
            });
        });
    },

    'Pages Item Check': function (client) {
        this.adminMain.menuOpenElement('@pages', '@headerText', 'Pages', client);
    },

    'Reports Items Check': function (client) {
        this.adminMain.menuOpenElement('@reports', '@headerText', 'Monthly Sales', client, () => {
            this.adminMain.menuOpenElement('@repMostSold', '@headerText', 'Most Sold Products', client, () => {
                this.adminMain.menuOpenElement('@repMostShop', '@headerText', 'Most Shopping Customers', client, () => {
                    this.adminMain.menuOpenElement('@repMonthly', '@headerText', 'Monthly Sales', client);
                });
            });
        });
    },

    'Settings Items Check': function (client) {
        this.adminMain.menuOpenElement('@settings', '@headerText', 'Settings', client, () => {
            this.adminMain.menuOpenElement('@setDefaults', '@headerText', 'Settings', client, () => {
                this.adminMain.menuOpenElement('@setGeneral', '@headerText', 'Settings', client, () => {
                    this.adminMain.menuOpenElement('@setListings', '@headerText', 'Settings', client, () => {
                        this.adminMain.menuOpenElement('@setImages', '@headerText', 'Settings', client, () => {
                            this.adminMain.menuOpenElement('@setCheckOut', '@headerText', 'Settings', client, () => {
                                this.adminMain.menuOpenElement('@setAdvanced', '@headerText', 'Settings', client, () => {
                                    this.adminMain.menuOpenElement('@setSecurity', '@headerText', 'Settings', client, () => {
                                        this.adminMain.menuOpenElement('@setStoreInf', '@headerText', 'Settings', client);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    'Slides Item Check': function (client) {
        this.adminMain.menuOpenElement('@slides', '@headerText', 'Slides', client);
    },

    'Tax Items Check': function (client) {
        this.adminMain.menuOpenElement('@tax', '@headerText', 'Tax Classes', client, () => {
            this.adminMain.menuOpenElement('@taxRates', '@headerText', 'Tax Rates', client, () => {
                this.adminMain.menuOpenElement('@taxClasses', '@headerText', 'Tax Classes', client);
            });
        });
    },

    'Translations Items Check': function (client) {
        this.adminMain.menuOpenElement('@translations', '@headerText', 'Search Translations', client, () => {
            this.adminMain.menuOpenElement('@transScan', '@headerText', 'Scan Files For Translations', client, () => {
                this.adminMain.menuOpenElement('@transCSV', '@headerText', 'CSV Import/Export', client, () => {
                    this.adminMain.menuOpenElement('@transSearch', '@headerText', 'Search Translations', client);
                });
            });
        });
    },

    'Users Item Check': function (client) {
        this.adminMain.menuOpenElement('@users', '@headerText', 'Users', client);
    },

    'vQmods Items Check': function (client) {
        this.adminMain.menuOpenElement('@vQmods', '@headerText', 'vQmods', client, () => {
            this.adminMain.menuOpenElement('@vQmodsSub', '@headerText', 'vQmods', client);
        });
    }
};