!function(t){var e=t.django||(t.django={});e.pluralidx=function(t){var e=1!=t;return"boolean"==typeof e?e?1:0:e},e.catalog=e.catalog||{},e.jsi18n_initialized||(e.gettext=function(t){var n=e.catalog[t];return void 0===n?t:"string"==typeof n?n:n[0]},e.ngettext=function(t,n,r){var i=e.catalog[t];return void 0===i?1==r?t:n:i[e.pluralidx(r)]},e.gettext_noop=function(t){return t},e.pgettext=function(t,n){var r=e.gettext(t+""+n);return-1!=r.indexOf("")&&(r=n),r},e.npgettext=function(t,n,r,i){var o=e.ngettext(t+""+n,t+""+r,i);return-1!=o.indexOf("")&&(o=e.ngettext(n,r,i)),o},e.interpolate=function(t,e,n){return n?t.replace(/%\(\w+\)s/g,function(t){return String(e[t.slice(2,-2)])}):t.replace(/%s/g,function(t){return String(e.shift())})},e.formats={DATETIME_FORMAT:"N j, Y, P",DATETIME_INPUT_FORMATS:["%Y-%m-%d %H:%M:%S","%Y-%m-%d %H:%M:%S.%f","%Y-%m-%d %H:%M","%Y-%m-%d","%m/%d/%Y %H:%M:%S","%m/%d/%Y %H:%M:%S.%f","%m/%d/%Y %H:%M","%m/%d/%Y","%m/%d/%y %H:%M:%S","%m/%d/%y %H:%M:%S.%f","%m/%d/%y %H:%M","%m/%d/%y"],DATE_FORMAT:"N j, Y",DATE_INPUT_FORMATS:["%Y-%m-%d","%m/%d/%Y","%m/%d/%y"],DECIMAL_SEPARATOR:".",FIRST_DAY_OF_WEEK:"0",MONTH_DAY_FORMAT:"F j",NUMBER_GROUPING:"3",SHORT_DATETIME_FORMAT:"m/d/Y P",SHORT_DATE_FORMAT:"m/d/Y",THOUSAND_SEPARATOR:",",TIME_FORMAT:"P",TIME_INPUT_FORMATS:["%H:%M:%S","%H:%M:%S.%f","%H:%M"],YEAR_MONTH_FORMAT:"F Y"},e.get_format=function(t){var n=e.formats[t];return void 0===n?t:n},t.pluralidx=e.pluralidx,t.gettext=e.gettext,t.ngettext=e.ngettext,t.gettext_noop=e.gettext_noop,t.pgettext=e.pgettext,t.npgettext=e.npgettext,t.interpolate=e.interpolate,t.get_format=e.get_format,e.jsi18n_initialized=!0)}(this);