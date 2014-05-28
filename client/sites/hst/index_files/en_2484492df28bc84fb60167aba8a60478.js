(function(a){a.fn.validationEngineLanguage=function(){};a.validationEngineLanguage={newLang:function(){a.validationEngineLanguage.allRules={required:{regex:"none",alertText:"* This field is required",alertTextCheckboxMultiple:"* Please select an option",alertTextCheckboxe:"* This checkbox is required",alertTextDateRange:"* Both date range fields are required"},requiredInFunction:{func:function(d,e,c,b){return(d.val()=="test")?true:false},alertText:"* Field must equal test"},dateRange:{regex:"none",alertText:"* Invalid ",alertText2:"Date Range"},dateTimeRange:{regex:"none",alertText:"* Invalid ",alertText2:"Date Time Range"},minSize:{regex:"none",alertText:"* Minimum ",alertText2:" characters required"},maxSize:{regex:"none",alertText:"* Maximum ",alertText2:" characters allowed"},groupRequired:{regex:"none",alertText:"* You must fill one of the following fields"},min:{regex:"none",alertText:"* Minimum value is "},max:{regex:"none",alertText:"* Maximum value is "},past:{regex:"none",alertText:"* Date prior to "},future:{regex:"none",alertText:"* Date past "},maxCheckbox:{regex:"none",alertText:"* Maximum ",alertText2:" options allowed"},minCheckbox:{regex:"none",alertText:"* Please select ",alertText2:" options"},equals:{regex:"none",alertText:"* Fields do not match"},creditCard:{regex:"none",alertText:"* Invalid credit card number"},phone:{regex:/^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,alertText:"* Invalid phone number"},email:{regex:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,alertText:"* Invalid email address"},integer:{regex:/^[\-\+]?\d+$/,alertText:"* Not a valid integer"},number:{regex:/^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,alertText:"* Invalid floating decimal number"},date:{func:function(h){var f=new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);var d=f.exec(h.val());if(d==null){return false}var e=d[1];var g=d[2]*1;var b=d[3]*1;var c=new Date(e,g-1,b);return(c.getFullYear()==e&&c.getMonth()==(g-1)&&c.getDate()==b)},alertText:"* Invalid date, must be in YYYY-MM-DD format"},ipv4:{regex:/^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,alertText:"* Invalid IP address"},url:{regex:/^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/,alertText:"* Invalid URL"},bannedWord:{regex:/^((?!\b(molested|shit|piss|rape|scat|abused|forced|young|family|incest|fist|rape|raped|raping|sister|son|mom|father|virgin|toilet|sleep|sleeping|pee|pregnant|enema|dad|milk|kid|alien|monster)\b).)*$/i,alertText:"* Dont use banned words! (check the list below the form)"},onlyNumberSp:{regex:/^[0-9\ ]+$/,alertText:"* Numbers only"},onlyLetterSp:{regex:/^[a-zA-Z\ \']+$/,alertText:"* Letters only"},onlyLetterNumber:{regex:/^[0-9a-zA-Z, -]+$/,alertText:"* No special characters allowed"},onlyLetterNumberFirstNoSpace:{regex:/^[^\ ][A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,alertText:"* No special characters allowed "},onlyLetterNumberComa:{regex:/^\u0020*\w{1,16}\u0020*(?:,\u0020*\w{1,16}\u0020*)*$/g,alertText:"* No special characters allowed,and max. 16 chars each tag"},onlyLetterNumberSpecs:{regex:/^[0-9a-zA-Z,.!\? ]+$/g,alertText:"* No special characters allowed"},ajaxUserCall:{url:"ajaxValidateFieldUser",extraData:"name=eric",alertText:"* This user is already taken",alertTextLoad:"* Validating, please wait"},ajaxUserCallPhp:{url:"phpajax/ajaxValidateFieldUser.php",extraData:"name=eric",alertTextOk:"* This username is available",alertText:"* This user is already taken",alertTextLoad:"* Validating, please wait"},ajaxNameCall:{url:"ajaxValidateFieldName",alertText:"* This name is already taken",alertTextOk:"* This name is available",alertTextLoad:"* Validating, please wait"},ajaxNameCallPhp:{url:"phpajax/ajaxValidateFieldName.php",alertText:"* This name is already taken",alertTextLoad:"* Validating, please wait"},validate2fields:{alertText:"* Please input HELLO"},dateFormat:{regex:/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,alertText:"* Invalid Date"},dateTimeFormat:{regex:/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,alertText:"* Invalid Date or Date Format",alertText2:"Expected Format: ",alertText3:"mm/dd/yyyy hh:mm:ss AM|PM or ",alertText4:"yyyy-mm-dd hh:mm:ss AM|PM"}}}};a.validationEngineLanguage.newLang()})(jQuery);