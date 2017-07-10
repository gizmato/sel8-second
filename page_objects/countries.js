var adminMainCommands = {
    countrySortingChecker: function (client, callback) {
        this.countries = client.page.countries();
        this.adminMain = client.page.adminMain();
        this.adminMain.menuOpenElement('@сountries', '@headerText', 'Countries', client, () => {
            var listSel = this.countries.elements.countriesList.selector;
            var countryTxtSel = this.countries.elements.countryTxt.selector;
            this.countries.waitForElementVisible('@countriesList', client.globals.myPause, () => {
                client.elements('css selector', listSel, function (countrList) {
                    console.log('There are ' + countrList.value.length + ' countries');
                    var prevItem = null;
                    for (var i = 0; i < countrList.value.length; i++) {
                        var countryNum = i + 2 //to skip header
                        var currentCountry = listSel + ':nth-child(' + countryNum + ') ' + countryTxtSel;
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
                                console.log('Country Name is Missing at row #: ' + [countryNum + 1]);
                                client.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                            }
                        })
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
        countryTxt: 'td > a:not([title])'
    }
};