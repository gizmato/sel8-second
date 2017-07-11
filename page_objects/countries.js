var adminMainCommands = {
    countrySortingChecker: function (zone, client, callback) {
        var self = this;
        this.countries = client.page.countries();
        this.adminMain = client.page.adminMain();
        this.adminMain.menuOpenElement('@сountries', '@headerText', 'Countries', client, () => {
            var listSel = self.countries.elements.countriesList.selector;
            var countryTxtSel = self.countries.elements.countryTxt.selector;
            var zonesSel = self.countries.elements.countryZones.selector;
            var zoneRowsSel = self.countries.elements.zoneRows.selector;
            self.countries.waitForElementVisible('@countriesList', client.globals.myPause, () => {
                client.elements('css selector', listSel, function (countrList) {
                    console.log('There are ' + countrList.value.length + ' countries');
                    let prevItem = null;
                    let prevZone = null;
                    for (var i = 0; i < countrList.value.length; i++) {
                        let countryNum = i + 2 //to skip header
                        let currentCountry = listSel + ':nth-child(' + countryNum + ') ' + countryTxtSel;
                        let zonesQty = listSel + ':nth-child(' + countryNum + ')' + zonesSel;
                        if (zone) {
                            self.countries.waitForElementVisible(zonesQty, client.globals.myPause, () => {
                                this.getText(zonesQty, function (num) {
                                    //#content > form > table > tbody > tr:nth-child(39) > td:nth-child(6)
                                    if (num.value > 0) {
                                        console.log('+++++ There are ' + num.value + ' zones present. Checking zones sorting.');
                                        self.countries.waitForElementVisible(currentCountry, client.globals.myPause)
                                            .getLocationInView(currentCountry)
                                            .click(currentCountry)
                                            .waitForElementVisible('@zonesHeader', client.globals.myPause, () => {
                                                this.elements('css selector', zoneRowsSel, function (zoneList) {
                                                    for (var i = 0; i < [zoneList.value.length-2]; i++) {
                                                        let zoneNum = i + 2
                                                        let currentZone = zoneRowsSel + ':nth-child(' + zoneNum + ') td:nth-child(3)';
                                                        this.waitForElementVisible(currentZone, client.globals.myPause, () => {
                                                            client.getText(currentZone, function (num1) {
                                                                if (num1.value.length != 0) {
                                                                    if (prevZone === null) {
                                                                        prevZone = num1.value;
                                                                    }
                                                                    else {
                                                                        if (prevZone <= num1.value) {
                                                                            console.log('++++++ ' + num1.value);
                                                                        }
                                                                        else {
                                                                            console.log('ERROR! Invalid sorting at Zones: ' + prevZone + ' and ' + num1.value + '.');
                                                                            client.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                                                                        }
                                                                        prevZone = num1.value;
                                                                    }
                                                                } else {
                                                                    console.log('Zone Name is Missing at row #' + [zoneNum-1]);
                                                                    client.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                                                                }
                                                            });
                                                        });
                                                    }
                                                    self.adminMain.menuOpenElement('@сountries', '@headerText', 'Countries', client, () => {
                                                        self.countries.waitForElementVisible('@countriesList', client.globals.myPause, () => {
                                                            prevZone = null;
                                                        });
                                                    });
                                                });
                                            });
                                    } else if (num.value != 0) {
                                        console.log('ERROR! Invalid nuber of Zones! Got: ' + num.value + ' at country # ' + [countryNum-1] + '.');
                                        client.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                                    } else {
                                        console.log('===== ' + num.value + ' zones present for the country #' + [countryNum-1] + '.');
                                    }
                                });
                            });
                        } else {
                            client.getText(currentCountry, function (text) {
                                if (text.value.length != 0) {
                                    if (prevItem === null) {
                                        prevItem = text.value;
                                    }
                                    else {
                                        if (prevItem <= text.value) {
                                            console.log('====== ' + text.value);
                                        }
                                        else {
                                            console.log('ERROR! Invalid sorting at counties: ' + prevItem + ' and ' + text.value + '.');
                                            client.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                                        }
                                        prevItem = text.value;
                                    }
                                } else {
                                    console.log('Country Name is Missing at row #' + [countryNum-1]);
                                    client.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                                }
                            })
                        }
                    }
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
        сountriesMain: '[href*="admin/?app=countries&doc=countries"]',
        countriesList: '[name="countries_form"] tr.row',
        countryTxt: 'td > a:not([title])',
        countryZones: ' td:nth-of-type(6)',
        zonesHeader: '#content h2',
        zoneRows: 'form > #table-zones tr'
    }
};