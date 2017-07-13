var customerMainCommands = {
    customerOpen: function (client, callback) {
        this.customer = client.page.customerMain();
        this.customer.navigate().waitForElementPresent('@homeButton', client.globals.myPause, () => {
            callback && callback();
        });
    },

    stickerCheck: function (client, callback) {
        this.customer = client.page.customerMain();
        let sectionsSelector = this.customer.elements.sections.selector;
        let oneSticker = this.customer.elements.theOnlySticker.selector;
        client.elements('css selector', sectionsSelector, (sections) => {
            console.log('There are: ' + [sections.value.length - 1] + ' product sections found');
            for (j = 0; j < [sections.value.length - 1]; j++) {
                let sNumber = j + 3;
                let curentSection = sectionsSelector + ':nth-of-type(' + sNumber + ')';
                let listDucks = this.customer.elements.liDucks.selector;
                let ducksList = curentSection + listDucks;
//                client.pause(50000, () => {
                    client.elements('css selector', ducksList, (ducks) => {
                        console.log('There are: ' + [ducks.value.length] + ' Duck(s) found in the section');
                        for (var i = 0; i < ducks.value.length; i++) {
                            var dNumber = i + 1;
                            console.log("Checking sticker of the duck #" + dNumber + "...");
                            let theOneAndOnlySticker = ducksList + ':nth-of-type(' + dNumber + ') ' + oneSticker;
                            console.log(theOneAndOnlySticker);
                            this.customer.waitForElementVisible(theOneAndOnlySticker, client.globals.myPause);
                        }
                    });
//              });
            }

        });

        callback && callback();
    },

    cssPropsCheck: function (isHomeOrInternal, client, callback) {
        this.customer = client.page.customerMain();
        var normPrice = client.props[isHomeOrInternal].normPrice;
        var salePrice = client.props[isHomeOrInternal].salePrice;
        var prices = [normPrice, salePrice];
        var propStrikeCSS = this.customer.elements.goodsPropStrikeCSS.selector;
        var propStrikeValue = this.customer.elements.goodsPropStrikeValue.selector;
        var propBoldCSS = this.customer.elements.goodsPropBoldCSS.selector;
        var propBoldValue = this.customer.elements.goodsPropBoldValue.selector;
        var propColorCSS = this.customer.elements.goodsPropColorCSS.selector;
        var propSizeCSS = this.customer.elements.goodsPropSizeCSS.selector;
        this.assert.cssProperty(normPrice, propStrikeCSS, propStrikeValue);
        this.assert.cssProperty(salePrice, propBoldCSS, propBoldValue);
        prices.forEach((price, i) => {
            this.getCssProperty(price, propColorCSS, function (priceRGB) {
                var colorStr = priceRGB.value;
                var regExpPat = /\D+(\d+),\s(\d+),\s(\d+)\D+/
                var rgbArr = regExpPat.exec(colorStr);
                var r = rgbArr[1];
                var g = rgbArr[2];
                var b = rgbArr[3];
                if (i === 0) {
                    if (r == g && r == b) {
                        console.log('OK! Normal Price color of the duck on the ' + isHomeOrInternal + ' page is grey!');
                    } else {
                        console.log('ERROR! Normal Price Color is wrong!');
                        this.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100);
                    }
                } else {
                    if (r > 0 && g == 0 && b == 0) {
                        console.log('OK! Sale Price of the duck on the ' + isHomeOrInternal + ' page is reddish.');
                    } else {
                        console.log('ERROR! Sale Price Color is wrong!');
                        this.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100);
                    }
                }
            });
        });
        callback && callback();
    },

    goodsNamePriceCompare: function (client, callback) {
        this.customer = client.page.customerMain();
        var nameHome = this.customer.elements.goodsNameHome.selector;
        var nameInternal = this.customer.elements.goodsNameInternal.selector;
        var normPriceHome = this.customer.elements.goodsNormPriceHome.selector;
        var normPriceInternal = this.customer.elements.goodsNormPriceInternal.selector;
        var salePriceHome = this.customer.elements.goodsSalePriceHome.selector;
        var salePriceInternal = this.customer.elements.goodsSalePriceInternal.selector;
        this.getText(nameHome, (nameHomeRes) => {
            var nameHomeValue = nameHomeRes.value;
            this.getText(normPriceHome, (normPriceHomeRes) => {
                var normPriceHome = normPriceHomeRes.value;
                this.getText(salePriceHome, (salePriceHomeRes) => {
                    var salePriceHome = salePriceHomeRes.value;
                    this.customer.click(nameHome)
                        .waitForElementVisible(salePriceInternal, client.globals.myPause, () => {
                            this.customer.waitForElementVisible(nameInternal, client.globals.myPause, () => {
                                this.assert.containsText(nameInternal, nameHomeValue);
                                this.assert.containsText(normPriceInternal, normPriceHome);
                                this.assert.containsText(salePriceInternal, salePriceHome);
                                console.log('OK! Name and Prices coinside.')
                                callback && callback();
                            });
                        });
                });
            });
        });
    },

    goodsPriceSizeCompare: function (isHomeOrInternal, client, callback) {
        this.customer = client.page.customerMain();
        var normPrice = client.props[isHomeOrInternal].normPrice;
        var salePrice = client.props[isHomeOrInternal].salePrice;
        var propSizeCSS = this.customer.elements.goodsPropSizeCSS.selector;
        this.getCssProperty(normPrice, propSizeCSS, function (normSize) {
            var normPriceSize = normSize.value;
            this.getCssProperty(salePrice, propSizeCSS, function (saleSize) {
                var salePriceSize = saleSize.value;
                if (salePriceSize > normPriceSize) {
                    console.log('OK! Sale Price Size: ' + salePriceSize + ' is more than Normal Price Size: ' + normPriceSize + ' on the ' + isHomeOrInternal + ' page!');
                } else {
                    console.log('ERROR! Price Size is wrong!');
                    this.waitForElementVisible('!!!LOOK AT THE PREVIOUS LOG RECORD!!!', 100);
                }
            });
        });
    }
};

module.exports = {
    url: function () {
        return this.api.launchUrl + '/en/';
    },
    commands: [customerMainCommands],
    elements: {
        logo: 'div.logotype-wrapper > a > img',
        homeButton: 'i[title="Home"]',
        sections: 'div.middle > div.content div[id^=box]',
        liDucks: ' li.product',
        theOnlySticker: 'div.sticker:nth-of-type(1):nth-last-child(1)',
        goodsNameHome: '#box-campaigns a.link[href*="rubber-ducks-c-1/subcategory-c-2/yellow-duck-p-1"] > div.name',
        goodsNameInternal: '#box-product h1.title',
        goodsNormPriceHome: 'a > div > s.regular-price',
        goodsNormPriceInternal: 'div.information > div > s.regular-price',
        goodsSalePriceHome: 'a > div > strong.campaign-price',
        goodsSalePriceInternal: 'div.information > div > strong.campaign-price',
        goodsPropStrikeCSS: 'text-decoration-line',
        goodsPropStrikeValue: 'line-through',
        goodsPropBoldCSS: 'font-weight',
        goodsPropBoldValue: 'bold',
        goodsPropColorCSS: 'color',
        goodsPropSizeCSS: 'font-size',
    },
};