(function ($) {

    $.fn.checkstrength = function (options) {
        var settings = $.extend({
            'veryweeknum': 10,
            'weeknum': 25,
            'oknum': 40,
            'goodnum': 55,
            'verygoodnum': 65,
            'strongnum': 80,
            'verystrongnum': 95,
            'veryweekcol': '#A60400',
            'weekcol': '#BF3330',
            'okcol': '#FFFF00',
            'goodcol': '#008500',
            'verygoodcol': '#00CC00',
            'strongcol': '#39E639',
            'verystrongcol': '#67E667',
            'veryweektext': 'Very Week',
            'weektext': 'Week',
            'oktext': 'Ok',
            'goodtext': 'Good',
            'verygoodtext': 'Very Good',
            'strongtext': 'Strong',
            'verystrongtext': 'Very Strong',
            'wraperclass': 'passwordstrength',
            'meeterclass': 'strengthmeeter'
        }, options);

        var veryweeknum = settings['veryweeknum'], weeknum = settings['weeknum'], oknum = settings['oknum'], goodnum = settings['goodnum'], verygoodnum = settings['verygoodnum'], strongnum = settings['strongnum'], verystrongnum = settings['verystrongnum'], veryweekcol = settings['veryweekcol'], weekcol = settings['weekcol'], okcol = settings['okcol'], goodcol = settings['goodcol'], verygoodcol = settings['verygoodcol'], strongcol = settings['strongcol'], verystrongcol = settings['verystrongcol'], veryweektxt = settings['veryweektext'], weektxt = settings['weektext'], oktxt = settings['oktext'], goodtxt = settings['goodtext'], verygoodtxt = settings['verygoodtext'], strongtxt = settings['strongtext'], verystrongtxt = settings['verystrongtext'], wraperclass = settings['wraperclass'], meeterclass = settings['meeterclass'], obj = $(this), password = obj.val(), uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", lowercase = "abcdefghijklmnopqrstuvwxyz", number = "0123456789", spcharacters = "!@#$%^&*?_~"

        return this.each(function () {
            obj.wrap(function () {
                return "<div class=\"" + wraperclass + "\"></div>"
            });
            obj.after(function () {
                return "<div class=\"" + meeterclass + "\" style=\"height: 15px;\"><div style=\"height: 100%;\"></div><p style=\"width: 100%; text-align: center;\"></p></div>"
            });
            setwidth(obj.parent().find("div div"), 0, veryweekcol, veryweektxt);
            obj.css("width", "100%");
            obj.keyup(function () {
                var passscore = checkpass(password), percent = Math.round((passscore / 105) * 100), col = rate(percent, false), txt = rate(percent, true)
                setwidth(obj.parent().find("div div"), percent, col, txt)
            });
        });
        function checkpass(password) {
            var score = 0, password = obj.val(), upercount = countContain(password, uppercase), lowercount = countContain(password, lowercase), numcount = countContain(password, number), spcarcount = countContain(password, spcharacters), lowerupercount = lowercount + upercount
            if (password.length < 3) {
                score = 0
            } else if (password.length < 7) {
                score += 5
            } else if (password.length < 11) {
                score += 10
            } else if (password.length < 16) {
                score += 25
            }
            if (upercount == 0 && lowercount != 0) {
                score += 10;
            } else if (upercount != 0 && lowercount == 0) {
                score += 10;
            } else if (upercount != 0 && lowercount != 0) {
                score += 20;
            }
            if (numcount == 1) {
                score += 10;
            } else if (numcount >= 3) {
                score += 20;
            }
            if (spcarcount >= 1) {
                score += 10;
            } else if (spcarcount > 2) {
                score += 25;
            }
            if (numcount != 0 && lowerupercount != 0) {
                score += 5;
            } else if (numcount != 0 && lowerupercount != 0 && spcarcount != 0) {
                score += 10;
            } else if (numcount != 0 && lowercount != 0 && spcarcount != 0 && upercount != 0) {
                score += 15;
            }
            return score
        }
        function countContain(strPassword, strCheck) {
            var count = 0;

            for (i = 0; i < strPassword.length; i++) {
                if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
                    count++;
                }
            }

            return count;
        }
        function setwidth(obj, widthtoset, colortoset, text) {
            obj.stop(true, false).animate({ 'width': widthtoset + "%" }, 1500).css('background-color', colortoset).parent().find("p").html(text);
        }
        function rate(score, textorcolor) {
            var col, txt
            if (score >= 0 && score <= veryweeknum) {
                col = veryweekcol
                txt = veryweektxt
            } else if (score > veryweeknum && score <= weeknum) {
                col = weekcol
                txt = weektxt
            } else if (score > weeknum && score <= oknum) {
                col = okcol
                txt = oktxt
            } else if (score > oknum && score <= goodnum) {
                col = goodcol
                txt = goodtxt
            } else if (score > goodnum && score <= verygoodnum) {
                col = verygoodcol
                txt = verygoodtxt
            } else if (score > verygoodnum && score <= strongnum) {
                col = strongcol
                txt = strongtxt
            } else if (score > strongnum) {
                col = verystrongcol
                txt = verystrongtxt
            }
            if (textorcolor == true) {
                return txt
            } else if (textorcolor == false) {
                return col
            } else {
                return "Error"
            }
        }
    }

})(jQuery);