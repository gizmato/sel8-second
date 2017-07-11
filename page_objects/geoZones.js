var geoCommands = {
    geoSortingChecker: function (client, callback) {
        var self = this;
        this.geo = client.page.geoZones();
        this.adminMain = client.page.adminMain();
        this.adminMain.menuOpenElement('@geoZones', '@headerText', 'Geo Zones', client, () => {
            let countryListSel = self.geo.elements.countries.selector;
            client.elements('css selector', countryListSel, function (countrList) {
                for (var i = 0; i < countrList.value.length; i++) {
                    let countryNum = i + 2;
                    var countrySel = 'tr:nth-child(' + countryNum + ') ' + countryListSel;
                    let prevGeo = null;
                    self.geo.waitForElementVisible(countrySel, client.globals.myPause)
                        .click(countrySel)
                        .waitForElementNotPresent(countrySel, client.globals.myPause)
                        .waitForElementVisible('@geoZones', () => {
                            var geoZonesSel = self.geo.elements.geoZones.selector;
                            client.elements('css selector', geoZonesSel, function (zoneList) {
                                for (var j = 0; j < [zoneList.value.length]; j++) {
                                    let zoneNum = j + 1
                                    let currentZone = 'tr:nth-child(' + zoneNum + ') ' + geoZonesSel;
                                    this.waitForElementVisible(currentZone, client.globals.myPause, () => {
                                        this.getText(currentZone, function (name) {
                                            if (name.value.length != 0) {
                                                if (prevGeo === null) {
                                                    prevGeo = name.value;
                                                }
                                                else {
                                                    if (prevGeo <= name.value) {
                                                        console.log('++++++ ' + name.value);
                                                    }
                                                    else {
                                                        console.log('ERROR! Invalid sorting at Zones: ' + prevGeo + ' and ' + name.value + '.');
                                                        this.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                                                    }
                                                    prevGeo = name.value;
                                                    // if (name.value === 'Alaska') {
                                                    //     client.pause(50000)
                                                    // } 
                                                }
                                            } else {
                                                console.log('Zone Name is Missing at row #' + zoneNum);
                                                this.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100)
                                            }
                                        });
                                    });
                                }
                                self.adminMain.menuOpenElement('@geoZones', '@headerText', 'Geo Zones', client, () => {
                                    self.geo.waitForElementVisible('@geoForm', client.globals.myPause);
                                });
                            });
                        });
                }
            });
        })
    }
}

module.exports = {
    url: function () {
        return this.api.launchUrl + '/admin';
    },
    commands: [geoCommands],
    elements: {
        geoMain: '[href*="admin/?app=countries&doc=countries"]',
        geoForm: '[name="geo_zones_form"]',
        countries: ':not(.languages) > [href*="/?app=geo_zones&doc=edit_geo_zone&page=1&geo_zone_id="]:not([title="Edit"])',
        geoZones: 'td:nth-child(3) > select option[selected="selected"]'
    }
};