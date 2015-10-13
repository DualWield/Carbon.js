/**
 * @file Carbon.js
 * @author xuli07@baidu.com
 * @description Carbon.js is a library for manipulating date easily.You can use
 * Carbon.now() or new Carbon(time) to generate a new Carbon instance.A Carbon
 * instance has many methods for you to get/set time, do additions/subtractions
 * compare each,see differences from each,etc..
 *
 * Carbon.js is inspired by Carbon PHP Extension
 *
 * If you have any questions, please contact me with email.
 *
 * */
(function (window) {
    var Carbon = function (time) {
        /**
         * The day constants
         * */
        this.SUNDAY = 0;
        this.MONDAY = 1;
        this.TUESDAY = 2;
        this.WEDNESDAY = 3;
        this.THURSDAY = 4;
        this.FRIDAY = 5;
        this.SATURDAY = 6;


        this.weekStartsAt = this.MONDAY;

        this.weekEndsAt = this.SUNDAY;
        /**
         * Default format to user for toString method when type juggling occurs
         *
         * */
        this.DEFAULT_TO_STRING_FORMAT = 'Y-m-d H:i:s';
        /**
         * Days of weekend
         *
         * */
        this.weekendDays = [this.SATURDAY, this.SUNDAY];

        this.toStringFormat = this.DEFAULT_TO_STRING_FORMAT;

        this.instance = null;

        this._init(time);
    };

    Carbon.prototype = {

        /**
         * Crate a new Carbon instance
         *
         * @param {(string|number)} time if time is now ,return
         * the instance of current time,or use new Date to construct
         * the instance
         * @private
         * */
        _init: function (time) {
            if (time === 'now' || typeof time === 'undefined') {
                this.instance = new Date();
            } else {
                this.instance = new Date(time);
            }
        },

        /**
         * Get a copy of the instance
         *
         * @return {Carbon}
         */
        copy: function () {
            return new Carbon(+this.instance);
        },

        /**
         * Resets the time to 00:00:00
         *
         * @return {Carbon} static
         */
        startOfDay: function () {
            return this.hour(0).minute(0).second(0);
        },

        /**
         * Resets the time to 23:59:59
         *
         * @return {Carbon} static
         */
        endOfDay: function () {
            return this.hour(23).minute(59).second(59);
        },

        /**
         * Resets the date to the first day of the month and the time to 00:00:00
         *
         * @return {Carbon} static
         */
        startOfMonth: function () {
            return this.startOfDay().day(1);
        },

        /**
         * Resets the date to end of the month and time to 23:59:59
         *
         * @return {Carbon} static
         */
        endOfMonth: function () {
            return this.addMonth().startOfMonth().subDay().endOfDay();
        },

        /**
         * Resets the date to the first day of the year and the time to 00:00:00
         *
         * @return {Carbon} static
         */
        startOfYear: function () {
            return this.month(1).startOfMonth();
        },

        /**
         * Resets the date to end of the year and time to 23:59:59
         *
         * @return {Carbon} static
         */
        endOfYear: function () {
            return this.month(12).endOfMonth();
        },

        /**
         * return the day of week
         *
         * @return {number}
         * */
        dayOfWeek: function () {
            return this.instance.getDay();
        },

        /**
         * Resets the date to the first day of week (defined in weekStartsAt) and the time to 00:00:00
         *
         * @return {Carbon} static
         */
        startOfWeek: function () {
            var dayOfWeek = this.instance.getDay();
            if (dayOfWeek !== this.weekStartsAt) {
                this.subDay(dayOfWeek - this.weekStartsAt);
            }
            return this.startOfDay();
        },

        /**
         * Resets the date to end of week (defined in weekEndsAt) and time to 23:59:59
         *
         * @return {Carbon} static
         */
        endOfWeek: function () {
            var dayOfWeek = this.instance.getDay();
            if (dayOfWeek !== this.weekEndsAt) {
                this.addDay(7 - dayOfWeek);
            }
            return this.endOfDay();
        },
        month: function (number) {
            if (typeof number === 'undefined') {
                return this.instance.getMonth() + 1;
            } else {
                this.instance.setMonth(number - 1);
                return this;
            }
        },
        date: function (number) {
            if (typeof number === 'undefined') {
                return this.instance.getDate();
            } else {
                this.instance.setDate(number);
                return this;
            }
        },
        year: function (number) {
            if (typeof number === 'undefined') {
                return this.instance.getFullYear();
            } else {
                this.instance.setFullYear(number);
                return this;
            }
        },

        /**
         *  Get or set the day from the instance
         *
         *  @param {number} number days
         *  @return {(Carbon|number)}
         * */
        day: function (number) {
            if (typeof number === 'undefined') {
                return this.instance.getDate();
            } else {
                this.instance.setDate(number);
                return this;
            }
        },

        /**
         *  Get / set the hour
         *
         *  @param {number} number hours
         *  @return {(Carbon|number)}
         * */
        hour: function (number) {
            if (typeof number === 'undefined') {
                return this.instance.getHours();
            } else {
                this.instance.setHours(number);
                return this;
            }
        },
        minute: function (number) {
            if (typeof number === 'undefined') {
                return this.instance.getMinutes();
            } else {
                this.instance.setMinutes(number);
                return this;
            }
        },
        second: function (number) {
            if (typeof number === 'undefined') {
                return this.instance.getSeconds();
            } else {
                this.instance.setSeconds(number);
                return this;
            }
        },

        /**
         * Returns date formatted according to given format.
         * @param {string} pattern the format type
         * @return {string}
         */
        format: function (pattern) {
            var source = this.instance;

            function replacer(patternPart, result) {
                pattern = pattern.replace(patternPart, result);
            }

            /**
             * Auto fill the number to specific length
             * @param {number} source the number
             * @param {number} length the length you want to fill
             *
             * @return {string}
             * */
            var pad = function (source, length) {
                var pre = '';
                var negative = (source < 0);
                var string = String(Math.abs(source));

                if (string.length < length) {
                    pre = (new Array(length - string.length + 1)).join('0');
                }

                return (negative ? '-' : '') + pre + string;
            };

            var year = source.getFullYear();
            var month = source.getMonth() + 1;
            var date2 = source.getDate();
            var hours = source.getHours();
            var minutes = source.getMinutes();
            var seconds = source.getSeconds();

            replacer(/(yyyy|Y)/g, pad(year, 4));
            replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
            replacer(/MM/g, pad(month, 2));
            replacer(/(M|m)/g, pad(month, 2));
            replacer(/d/g, pad(date2, 2));

            replacer(/H/g, pad(hours, 2));
            replacer(/h/g, pad(hours % 12, 2));
            replacer(/(m|i)/g, pad(minutes, 2));
            replacer(/s/g, pad(seconds, 2));

            return pattern;
        },

        addYear: function (value) {
            value = value == null ? 1 : value;
            return this.addYears(value);
        },
        addYears: function (value) {
            this.year(this.year() + value);
            return this;
        },
        subYear: function (value) {
            value = value == null ? 1 : value;
            return this.addYears(-1 * value);
        },
        subYears: function (value) {
            return this.addYears(-1 * value);
        },

        /**
         * Add a month to the instance
         *
         * @param {number} value months
         *
         * @return {Carbon} static
         */
        addMonth: function (value) {
            value = value == null ? 1 : value;
            return this.addMonths(value);
        },

        /**
         * Add months to the instance. Positive value travels forward while
         * negative value travels into the past.
         *
         * @param {number} value months
         *
         * @return {Carbon} static
         */
        addMonths: function (value) {
            this.month(this.month() + value);
            return this;
        },

        /**
         * Remove a month from the instance
         *
         * @param {number} value months
         *
         * @return {Carbon} static
         */
        subMonth: function (value) {
            value = value == null ? 1 : value;
            return this.subMonths(value);
        },

        /**
         * Remove months from the instance
         *
         * @param {number} value months
         *
         * @return {Carbon} static
         */
        subMonths: function (value) {
            this.month(this.month() - value);
            return this;
        },

        /**
         * Add a day to the instance
         *
         * @param {number} value days
         * @return {Carbon} static
         */
        addDay: function (value) {
            value = value == null ? 1 : value;
            return this.addDays(value);
        },

        /**
         * Add days to the instance. Positive value travels forward while
         * negative value travels into the past.
         *
         * @param {number} value days
         *
         * @return {Carbon} static
         */
        addDays: function (value) {
            this.date(this.date() + value);
            return this;
        },

        /**
         * Remove a day from the instance
         *
         * @param {number} value days
         *
         * @return {Carbon} static
         */
        subDay: function (value) {
            value = value == null ? 1 : value;
            return this.subDays(value);
        },

        /**
         * Remove days from the instance
         *
         * @param {number} value days
         *
         * @return {Carbon} static
         */
        subDays: function (value) {
            return this.addDays(-1 * value);
        },
        addHour: function (value) {
            value = value == null ? 1 : value;
            return this.addHours(value);
        },
        addHours: function (value) {
            return this.hour(this.hour() + value);
        },
        subHour: function (value) {
            value = value == null ? 1 : value;
            return this.subHours(value);
        },
        subHours: function (value) {
            return this.addHour(-1 * value);
        },
        addMinute: function (value) {
            value = value == null ? 1 : value;
            return this.addMinutes(value);
        },
        addMinutes: function (value) {
            return this.minute(this.minute() + value);
        },
        subMinute: function (value) {
            value = value == null ? 1 : value;
            return this.subMinutes(value);
        },
        subMinutes: function (value) {
            return this.addMinutes(-1 * value);
        },
        addSecond: function (value) {
            value = value == null ? 1 : value;
            return this.addSeconds(value);
        },
        addSeconds: function (value) {
            return this.second(this.second() + value);
        },
        subSecond: function (value) {
            value = value == null ? 1 : value;
            return this.subSeconds(value);
        },
        subSeconds: function (value) {
            return this.addSecond(-1 * value);
        },
        toDateString: function () {
            return this.format('Y-m-d');
        },
        toTimeString: function () {
            return this.format('H:i:s');
        },
        toDateTimeString: function () {
            return this.format('Y-m-d H:i:s');
        },

        eq: function (carbon) {
            return +this.instance === +carbon.instance;
        },
        ne: function (carbon) {
            return !this.eq(carbon);
        },
        gt: function (carbon) {
            return +this.instance > +carbon.instance;
        },
        lt: function (carbon) {
            return +this.instance < +carbon.instance;
        },
        gte: function (carbon) {
            return +this.instance >= +carbon.instance;
        },
        lte: function (carbon) {
            return +this.instance <= +carbon.instance;
        },

        /**
         * Get the maximum instance between a given instance (default now) and the current instance.
         *
         * @param {Carbon} dt instance
         * @return {Carbon} static
         */
        max: function (dt) {
            dt = dt == null ? Carbon.now() : dt;
            return this.gt(dt) ? this : dt;
        },

        /**
         * Get the minimum instance between a given instance (default now) and the current instance.
         *
         * @param {Carbon} dt instance
         *
         * @return {Carbon} static
         */
        min: function (dt) {
            dt = dt == null ? Carbon.now() : dt;
            return this.lt(dt) ? this : dt;
        },
        between: function (dt1, dt2, equal) {
            equal = (typeof equal === 'undefined') ? true : equal;
            if (dt1.gt(dt2)) {
                var temp = dt1;
                dt1 = dt2;
                dt2 = temp;
            }

            if (equal) {
                return this.gte(dt1) && this.lte(dt2);
            }
            else {
                return this.gt(dt1) && this.lt(dt2);
            }

        },

        /**
         * Determines if the instance is a weekend day
         *
         * @return {boolean}
         */
        isWeekend: function () {
            return this.weekendDays.indexOf(this.instance.getDay()) >= 0;
        },

        /**
         * Determines if the instance is yesterday
         *
         * @return {boolean}
         */
        isWeekday: function () {
            return !this.isWeekend();
        },

        /**
         * Determines if the instance is yesterday
         *
         * @return {boolean}
         */
        isYesterday: function () {
            return this.toDateString() === Carbon.yesterday().toDateString();
        },

        /**
         * Determines if the instance is today
         *
         * @return {boolean}
         */
        isToday: function () {
            return this.toDateString() === Carbon.now().toDateString();
        },

        /**
         * Determines if the instance is tomorrow
         *
         * @return {boolean}
         */
        isTomorrow: function () {
            return this.toDateString() === Carbon.tomorrow().toDateString();
        },

        /**
         * Determines if the instance is in the future, ie. greater (after) than now
         *
         * @return {boolean}
         */
        isFuture: function () {
            return this.gt(Carbon.now());
        },

        /**
         * Determines if the instance is in the past, ie. less (before) than now
         *
         * @return {boolean}
         */
        isPast: function () {
            return this.lt(Carbon.now());
        },

        /**
         * Determines if the instance is a leap year
         *
         * @return {boolean}
         */
        isLeapYear: function () {
            var year = this.instance.getFullYear();
            return !(year % 400) || ((year % 100) && !(year % 4));
        },

        /**
         * Checks if the passed in date is the same day as the instance current day.
         *
         * @param  {Carbon}  dt Carbon instance
         * @return {boolean}
         */
        isSameDay: function (dt) {
            return this.toDateString() === dt.toDateString();
        },

        /**
         * Get the difference in years
         *
         * @param {Carbon}  dt Carbon instance
         * @param {boolean} abs Get the absolute of the difference
         *
         * @return {number}
         */
        diffInYears: function (dt, abs) {
            dt = dt == null ? Carbon.now() : dt;
            abs = abs == null ? true : abs;
            var value = this.instance.getFullYear() - dt.instance.getFullYear();
            return abs ? Math.abs(value) : value;
        },

        /**
         * Get the difference in months
         *
         * @param {Carbon}  dt Carbon instance
         * @param {boolean} abs Get the absolute of the difference
         *
         * @return {number}
         */
        diffInMonths: function (dt, abs) {
            dt = dt == null ? Carbon.now() : dt;
            abs = abs == null ? true : abs;
            var value = this.diffInYears(dt, abs) * 12 + this.instance.getMonth() - dt.instance.getMonth();
            return abs ? Math.abs(value) : value;
        },

        /**
         * Get the difference in week
         *
         * @param {Carbon}  dt Carbon instance
         * @param {boolean} abs Get the absolute of the difference
         *
         * @return {number}
         */
        diffInWeeks: function (dt, abs) {
            dt = dt == null ? Carbon.now() : dt;
            abs = abs == null ? true : abs;
            var value = Math.floor(this.diffInDays(dt, abs) / 7);
            return abs ? Math.abs(value) : value;
        },

        /**
         * Get the difference in days
         *
         * @param {Carbon}  dt Carbon instance
         * @param {boolean} abs Get the absolute of the difference
         *
         * @return {number}
         */
        diffInDays: function (dt, abs) {
            dt = dt == null ? Carbon.now() : dt;
            abs = abs == null ? true : abs;
            var value = Math.floor(this.diffInHours(dt, abs) / 24);
            return abs ? Math.abs(value) : value;
        },

        /**
         * Get the difference in Hours
         *
         * @param {Carbon}  dt Carbon instance
         * @param {boolean} abs Get the absolute of the difference
         *
         * @return {number}
         */
        diffInHours: function (dt, abs) {
            dt = dt == null ? Carbon.now() : dt;
            abs = abs == null ? true : abs;
            var value = Math.floor(this.diffInMinutes(dt, abs) / 60);
            return abs ? Math.abs(value) : value;
        },

        /**
         * Get the difference in Minutes
         *
         * @param {Carbon}  dt Carbon instance
         * @param {boolean} abs Get the absolute of the difference
         *
         * @return {number}
         */
        diffInMinutes: function (dt, abs) {
            dt = dt == null ? Carbon.now() : dt;
            abs = abs == null ? true : abs;
            var value = Math.floor(this.diffInSeconds(dt, abs) / 60);
            return abs ? Math.abs(value) : value;
        },

        /**
         * Get the difference in Seconds
         *
         * @param {Carbon}  dt Carbon instance
         * @param {boolean} abs Get the absolute of the difference
         *
         * @return {number}
         */
        diffInSeconds: function (dt, abs) {
            dt = dt == null ? Carbon.now() : dt;
            abs = abs == null ? true : abs;
            var value = Math.floor((+this.instance - dt.instance) / 1000);
            return abs ? Math.abs(value) : value;
        },
        toString: function () {
            return this.format(this.toStringFormat);
        }

    };

    /**
     * Get a Carbon instance for the current date and time
     *
     * @return {Carbon}
     */
    Carbon.now = function () {
        return new Carbon('now');
    };

    /**
     * Create a Carbon instance for today
     *
     * @return {Carbon}
     */
    Carbon.today = function () {
        return Carbon.now().startOfDay();
    };

    /**
     * Create a Carbon instance for yesterday
     *
     * @return {Carbon}
     */
    Carbon.yesterday = function () {
        return Carbon.today().subDay();
    };

    /**
     * Create a Carbon instance for tomorrow
     *
     * @return {Carbon}
     */
    Carbon.tomorrow = function () {
        return Carbon.today().addDay();
    };


    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Carbon;
    } else {
        window.Carbon = Carbon;
    }
})(window);
