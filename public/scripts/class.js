var wisdata = function () { };

(function () {
    // 当前是否处于创建类的阶段

    var classInitializing = false;

    wisdata.createClass = function(baseClass, properties) {

        // 只接受一个参数的情况 - jClass(properties)

        if (typeof (baseClass) === "object") {

            properties = baseClass;

            baseClass = null;

        }

        // 本次调用所创建的类（构造函数）

        function F() {

            // 如果当前处于实例化类的阶段，则调用initialize原型函数

            if (!classInitializing) {

                // 如果父类存在，则实例对象的baseprototype指向父类的原型

                // 这就提供了在实例对象中调用父类方法的途径

                if (baseClass) {

                    this.baseprototype = baseClass.prototype;

                }

                this.initialize.apply(this, arguments);

            }

        }

        // 如果此类需要从其它类扩展

        if (baseClass) {

            classInitializing = true;

            F.prototype = new baseClass();

            F.prototype.constructor = F;

            classInitializing = false;

        }

        // 覆盖父类的同名函数

        for (var name in properties) {

            if (properties.hasOwnProperty(name)) {

                // 如果此类继承自父类baseClass并且父类原型中存在同名函数name
                if (baseClass &&
                    typeof (properties[name]) === "function" &&
                    typeof (F.prototype[name]) === "function") {
                    // 重定义函数name - 
                    // 首先在函数上下文设置this.base指向父类原型中的同名函数
                    // 然后调用函数properties[name]，返回函数结果

                    // 注意：这里的自执行函数创建了一个上下文，这个上下文返回另一个函数，
                    // 此函数中可以应用此上下文中的变量，这就是闭包（Closure）。
                    // 这是JavaScript框架开发中常用的技巧。
                    F.prototype[name] = (function (name, fn) {

                        return function () {

                            this.base = baseClass.prototype[name];

                            return fn.apply(this, arguments);

                        };

                    })(name, properties[name]);


                } else {

                    F.prototype[name] = properties[name];

                }

            }

        }

        return F;

    };
})();