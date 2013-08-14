// Console support for browsers without a console
if (typeof console === "undefined") { this.console = { log: function (str) { alert(str); }, dir: function (str) { alert(str); } }; }



// Helper that makes JSON-based AJAX calls easier to make
function jsonAjax(request) {
    if (!request.url) {
        console.log('Missing JSON Ajax URL. Request: ', request);
        return;
    }

    return $.ajax({
        url: request.url,
        type: 'POST',
        cache: request.cache || false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: (request.data) ? JSON.stringify(request.data) : null,
        dataFilter: function (data) {
            return data.d || data;
        },
        beforeSend: function () {
            if (request.beforeSend) request.beforeSend();
        },
        success: function (data) {
            data = data.d || data;
            if (request.success) request.success(data);
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            if (request.error) request.error(xhr, status, error);
        },
        complete: function () {
            if (request.complete) request.complete();
        }
    });
}



// jQuery extensions
if (jQuery) {
    $.extend($.expr[':'], {
        broken: function (selector) {
            return $(selector).attr('href') == 'javascript:;';
        }
    });
}



// Handlebars helpers and extensions
if (window.Handlebars) {
    // jQuery extension that makes it easier to bind Handlebars templates and data
    jQuery.fn.template = function (data, template, context) {
        var template = Handlebars.compile($(template, context).html());
        var html = template(data);

        $(this).html(html);
    }

    // Common handlebars extensions
    Handlebars.registerHelper('number', function (number, decimals) {
        return number.toFixed(decimals || 0);
    });
    Handlebars.registerHelper('formattednumber', function (number, decimals, delimiter) {
        return Number(number.toFixed(decimals || 0)).format(delimiter);
    });
    Handlebars.registerHelper('money', function (number, decimals) {
        return '$' + number.toFixed(decimals || 2).format();
    });
    Handlebars.registerHelper('shortdate', function (text) {
        var date = new Date(text);

        var response = "{0}/{1}/{2}".format(
            date.getMonth() + 1,
            date.getDay(),
            date.getFullYear()
        );

        return response;;
    });
    Handlebars.registerHelper('shortjsondate', function (jsondate) {
        var date = new Date(parseInt(jsondate.substr(6)));

        var response = "{0}/{1}/{2}".format(
            date.getMonth() + 1,
            date.getDay(),
            date.getFullYear()
        );

        return response;;
    });
    Handlebars.registerHelper('longdate', function (text) {
        var date = new Date(text);

        var response = "{0}, {1} {2}, {3}".format(
            date.getDayName(),
            date.getMonthName(),
            date.getDay(),
            date.getFullYear()
        );

        return response;;
    });
    Handlebars.registerHelper('longjsondate', function (jsondate) {
        var date = new Date(parseInt(jsondate.substr(6)));

        var response = "{0}, {1} {2}, {3}".format(
            date.getDayName(),
            date.getMonthName(),
            date.getDay(),
            date.getFullYear()
        );

        return response;;
    });
}



// URL helpers (http://blog.stevenlevithan.com/archives/parseuri)
window.Url = window.Url || (function () {
    var settings = {
        strictMode: false,
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

    this.parse = function (url) {
        var o = settings,
            m = o.parser[o.strictMode ? "strict" : "loose"].exec(url),
            uri = {},
            i = 14;

        while (i--) uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) uri[o.q.name][$1] = $2;
        });

        return uri;
    };
    this.query = function (key, url) {
        return (url) ? this.parse(url).queryKey[key] : this.parse(window.location).queryKey[key];
    }

    // Current URL
    this.current = this.parse(window.location);

    return this;
})();




// Cookie helpers
window.Cookies = window.Cookies || (function () {
    this.get = function (name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
        }
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
        return unescape(dc.substring(begin + prefix.length, end));
    };
    this.set = function (name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires.toGMTString() : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    };
    this.clear = function (name, path, domain) {
        if (getCookie(name)) {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }
    return this;
})();




// Guid object used to make Guids
// Sample: var guid = Guid.newGuid(); // B42A153F-1D9A-4F92-9903-92C11DD684D2 */
window.Guid = window.Guid || (function () {
    this.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        });
    }

    return this;
})();




// Array helpers
if (typeof Array.indexOf !== 'function') {
    Array.prototype.indexOf = function (item, i) {
        if (this == null) throw new TypeError();

        var array = Object(this), length = array.length >>> 0;
        if (length === 0) return -1;

        i = Number(i);
        if (isNaN(i)) {
            i = 0;
        } else if (i !== 0 && isFinite(i)) {
            i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
        }

        if (i > length) return -1;

        var k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
        for (; k < length; k++)
            if (k in array && array[k] === item) return k;
        return -1;
    }
}



// String helpers
if (typeof String.prototype.format !== "function") {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
if (typeof String.prototype.trim !== "function") {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
if (typeof String.prototype.contains !== 'function') {
    String.prototype.contains = function (str) {
        return this.indexOf(str) != -1;
    };
}
if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}




// Date localization helpers
Date.locale = {
    en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        day_names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        day_names_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
};
Date.fromJSON = function (json) {
    return new Date(parseInt(json.substr(6)));
};
Date.prototype.getMonthName = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names[this.getMonth()];
};
Date.prototype.getMonthNameShort = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getMonth()];
};
Date.prototype.getDayName = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].day_names[this.getDay()];
};
Date.prototype.getDayNameShort = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].day_names_short[this.getDay()];
};
Date.prototype.getDayOrdinal = function () {
    var day = this.getDay();
    return day.toOrdinal();
};



// Number helpers
Number.prototype.toOrdinal = function () {
    var n = this % 100;
    var suff = ["th", "st", "nd", "rd", "th"]; // suff for suffix
    var ord = n < 21 ? (n < 4 ? suff[n] : suff[0]) : (n % 10 > 4 ? suff[0] : suff[n % 10]);
    return this + ord;
}
Number.prototype.format = function (delimiter) {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || ",");
}