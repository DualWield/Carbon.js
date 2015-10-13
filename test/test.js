/**
 * @file test.js
 * @author xuli07@baidu.com
 *
 * */
/* global QUnit,Carbon */

/**
 * 主要测试 year()，month()，day()，hour()，minute(), second(), dayOfWeek()
 * month可以接受大于12的参数，如果是13的话，就会设置成下一年的1月
 * day,hour,minute,second同理
 *
 * */
QUnit.test('Getters and Setters', function (assert) {
    var d = new Carbon('2012-9-5 23:26:11');
    assert.ok(d.year() === 2012);
    d.year(2015);
    assert.ok(d.year() === 2015);
    assert.ok(d.month() === 9);
    d.month(11);
    assert.ok(d.month() === 11);
    d.month(14);
    assert.ok(d.month() === 2);
    assert.ok(d.year() === 2016);

    assert.ok(d.day() === 5);
    d.day(23);
    assert.ok(d.day() === 23);
    d.day(50);
    assert.ok(d.day() === 21);


    assert.ok(d.hour() === 23);
    d.hour(12);
    assert.ok(d.hour() === 12);
    d.hour(30);
    assert.ok(d.hour() === 6);

    assert.ok(d.minute() === 26);
    d.minute(12);
    assert.ok(d.minute() === 12);
    d.minute(70);
    assert.ok(d.minute() === 10);

    assert.ok(d.second() === 11);
    d.second(42);
    assert.ok(d.second() === 42);
    d.second(70);
    assert.ok(d.second() === 10);

    assert.ok(d.dayOfWeek() === 2);

});

/**
 * 主要测试时间的一些加减处理
 *
 *
* */
QUnit.test('Additions And Subtractions', function (assert) {
    var d = new Carbon('2012-01-31 00:00:00');
    assert.ok(d.toDateTimeString() === '2012-01-31 00:00:00');
    assert.ok(d.addYears(5).toDateTimeString() === '2017-01-31 00:00:00');
    assert.ok(d.addYear().toDateTimeString() === '2018-01-31 00:00:00');
    assert.ok(d.subYear().toDateTimeString() === '2017-01-31 00:00:00');
    assert.ok(d.subYears(5).toDateTimeString() === '2012-01-31 00:00:00');

    assert.ok(d.addMonths(60).toDateTimeString() === '2017-01-31 00:00:00');
    assert.ok(d.addMonth().toDateTimeString() === '2017-03-03 00:00:00');
    assert.ok(d.subMonth().toDateTimeString() === '2017-02-03 00:00:00');
    assert.ok(d.subMonths(60).toDateTimeString() === '2012-02-03 00:00:00');

    assert.ok(d.addDays(29).toDateTimeString() === '2012-03-03 00:00:00');
    assert.ok(d.addDay().toDateTimeString() === '2012-03-04 00:00:00');
    assert.ok(d.subDay().toDateTimeString() === '2012-03-03 00:00:00');
    assert.ok(d.subDays(29).toDateTimeString() === '2012-02-03 00:00:00');

    assert.ok(d.addHours(24).toDateTimeString() === '2012-02-04 00:00:00');
    assert.ok(d.addHour().toDateTimeString() === '2012-02-04 01:00:00');
    assert.ok(d.subHour().toDateTimeString() === '2012-02-04 00:00:00');
    assert.ok(d.subHours(24).toDateTimeString() === '2012-02-03 00:00:00');

    assert.ok(d.addMinutes(61).toDateTimeString() === '2012-02-03 01:01:00');
    assert.ok(d.addMinute().toDateTimeString() === '2012-02-03 01:02:00');
    assert.ok(d.subMinute().toDateTimeString() === '2012-02-03 01:01:00');
    assert.ok(d.subMinutes(61).toDateTimeString() === '2012-02-03 00:00:00');

    assert.ok(d.addSeconds(61).toDateTimeString() === '2012-02-03 00:01:01');
    assert.ok(d.addSecond().toDateTimeString() === '2012-02-03 00:01:02');
    assert.ok(d.subSecond().toDateTimeString() === '2012-02-03 00:01:01');
    assert.ok(d.subSeconds(61).toDateTimeString() === '2012-02-03 00:00:00');


});

/**
 * 主要测试设置相关的时间点，比如这个月开始的时间，今天开始的时间
 *
 * */
QUnit.test('Modifiers', function (assert) {
    var d = new Carbon('2015-09-16 12:00:00');
    assert.ok(d.startOfDay().toDateTimeString() === '2015-09-16 00:00:00');
    assert.ok(d.startOfDay().endOfDay().toDateTimeString() === '2015-09-16 23:59:59');
    assert.ok(d.startOfMonth().toDateTimeString() === '2015-09-01 00:00:00');
    assert.ok(d.startOfMonth().endOfMonth().toDateTimeString() === '2015-09-30 23:59:59');
    assert.ok(d.startOfYear().toDateTimeString() === '2015-01-01 00:00:00');
    assert.ok(d.startOfYear().endOfYear().toDateTimeString() === '2015-12-31 23:59:59');
    d = new Carbon('2015-09-16 12:00:00');
    assert.ok(d.startOfWeek().toDateTimeString() === '2015-09-14 00:00:00');
    assert.ok(d.endOfWeek().toDateTimeString() === '2015-09-20 23:59:59');
});

/**
 * 主要测试跟其他Carbon对象相差的时间
 *
 * */
QUnit.test('Differences', function (assert) {
    var dt1 = new Carbon('2015-09-16 12:00:00');
    var dt2 = dt1.copy().addDay(10);
    assert.ok(dt1.diffInDays(dt2) === 10);
    assert.ok(dt2.diffInDays(dt1) === 10);
    assert.ok(dt1.diffInDays(dt2, false) === -10);
    assert.ok(dt2.diffInDays(dt1, false) === 10);
    assert.ok(dt1.diffInDays(dt1.copy().addDays(400)) === 400);

    assert.ok(dt1.diffInMinutes(dt1.copy().addSeconds(59)) === 0);
    assert.ok(dt1.diffInMinutes(dt1.copy().addSeconds(60)) === 1);
    assert.ok(dt1.diffInMinutes(dt1.copy().addSeconds(119)) === 1);
    assert.ok(dt1.diffInMinutes(dt1.copy().addSeconds(120)) === 2);

});

/**
 * 主要测试跟其他Carbon对象之间的比较结果,判断是否是今天，工作日等等
 *
 * */
QUnit.test('Comparison', function (assert) {
    var dt1 = new Carbon('2015-04-04');
    var dt2 = new Carbon('2015-04-04');
    assert.ok(dt1.eq(dt2) === true);
    assert.ok(dt1.ne(dt2) === false);
    assert.ok(dt1.gt(dt2) === false);
    assert.ok(dt1.gte(dt2) === true);
    assert.ok(dt1.lt(dt2) === false);
    assert.ok(dt1.lte(dt2) === true);
    var dt3 = new Carbon('2015-04-01');
    assert.ok(dt1.between(dt3, dt2, true) === true);
    assert.ok(dt1.between(dt3, dt2, false) === false);

    assert.ok(dt1.max(dt3).toDateTimeString() === dt1.toDateTimeString());
    assert.ok(dt1.min(dt3).toDateTimeString() === dt3.toDateTimeString());
    assert.ok(dt1.isWeekday() === false);
    assert.ok(dt1.isWeekend() === true);
    var dt4 = Carbon.today();
    assert.ok(dt4.copy().subDay().isYesterday() === true);
    assert.ok(dt4.copy().isYesterday() === false);

    assert.ok(dt4.isToday() === true);
    assert.ok(dt4.copy().addDay().isTomorrow() === true);

    assert.ok(dt4.copy().addDays(2).isFuture() === true);
    assert.ok(dt4.copy().subDays(2).isPast() === true);
    var dt5 = new Carbon('2000-01-01');
    assert.ok(dt5.isLeapYear() === true);
    assert.ok(dt4.isLeapYear() === false);
    assert.ok(dt1.isSameDay(dt2) === true);

});
