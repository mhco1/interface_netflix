window.dom = (function(){
    var open = '[{';
    var close = ']}';
    var newArry = [];
    var query = [];
    var el = {};
    var pos = 0;
    var sep = ',';
    var ignore = false;
    var exe1 = [];
    var exe = {
        '@':function(el,res){res = res.getElementsByTagName(el);return res},
        '#':function(el,res){res = res.getElementById(el);return res},
        '.':function(el,res){res = res.getElementsByClassName(el);return res},
        '..':function(el,res){
            res.classList.toggle(el);
            return res
        },
        '[':function(el,res){res = res[el];return res},
        '--':function(el,res){res.remove();return res},
        '++':function(el,res){
            var ins = document.createElement(el);
            res = res.appendChild(ins);
            return res
        },
        '<+':function(el,res){
            var ins = document.createElement(el);
            var father = res.parentNode;
            res = father.insertBefore(ins, res.nextSibling);
            return res
            // insert after
        },
        '>+':function(el,res){
            var ins = document.createElement(el);
            var father = res.parentNode;
            res = father.insertBefore(ins, res);
            return res
            // insert before
        },
        '~':function(el,res){
            var ar;
            if(el.includes(':')){
                ar = el.split(':');
                res = res.style.setProperty(ar[0],ar[1]);
                return res
            };          
            res = getComputedStyle(res).getPropertyValue(el);
            return res
        },
        '~~':function(el,res){
            el = '--'+el
            return exe['~'](el,res)
        },
    };
    var op = keysToString(exe);

    //---

    function isObject(obj){
        return (typeof obj !== 'undefined' ? Object.prototype.toString.call(obj) == '[object Object]': false)
    };
    function isHtml(obj){
        return (typeof obj !== 'undefined' ? !!(Object.prototype.toString.call(obj).match('HTML')): false)
    };
    function keysToString(obj){
        return Object.keys(obj).join().split('').sort().reduce((a,b)=>(a.slice(-1) != b ? (a + b): a),'');
    }

    //---

    function isOperator(obj){
        return (obj !== '' && op.includes(obj))
    };
    function isValue(obj){
        return (obj !== '' && !op.includes(obj) && obj !== ' ')
    };
    function isSpace(obj){
        return (obj == ' ')
    };

    //---

    function exeOperator(){
        var res = '';
        isValue(el.next) && (ignore = true);
        res += el.el;
        return res
    };
    function exeValue(){
        var res = '';
        close.includes(el.el) ? (res += sep) : (res += el.el);
        (isSpace(el.next) || open.includes(el.next)) && (ignore = false);
        return res
    };
    function exeSpace(){
        var res = '';
        isValue(el.next) && (res += '@') && (ignore = true);
        return res
    };

    //---

    function convertToArray(){
        var res = '';

        ignore = false;
        exe1 = []
        exe1.operator = exeOperator;
        exe1.value = exeValue;
        exe1.space = exeSpace;

        str = str.trim();
        str[0] != '' && !op.includes(str[0]) && (res += ('@' + sep));

        for (i in str) {

            pos = Number(i);
            el.el = str[pos];
            el.back = str[pos-1];
            el.next = str[pos+1];

            exe1.unshift(undefined);
            isOperator(el.el) && (exe1[0] = 'operator');
            isValue(el.el)    && (exe1[0] = 'value');
            isSpace(el.el)    && (exe1[0] = 'space');
            ignore            && (exe1[0] = 'value');

            exe1.length > 2 && exe1.pop();
            exe1[0] != exe1[1] && exe1[1] != undefined && res.slice(-1) != sep && (res += sep);
            res += exe1[exe1[0]]();
        };

        res.slice(-1) == sep && (res = res.slice(0,-1));
        res = res.split(sep);
        newArry = [[],[]];
        for(i in res){
            i%2 == 0 ?
                newArry[0].push(res[i]) :
                newArry[1].push(res[i]);
        }
        res = newArry;
        return res
    };

    // ---

    return (function(_str,objHtml){
        var res;
        str = _str;

        isHtml(objHtml) ? res = objHtml : res = document;
        query = convertToArray();
        for (i in query[0]) {
            pos = i;
            res = exe[query[0][pos]](query[1][pos],res);
        }

        return res
    })
})()