// TESTS

let assert = require('chai').assert;

const userSignedUp = [
  {
    id: 1,
    name: 'Employee #1',
    activatedOn: new Date('2018-11-04'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 2,
    name: 'Employee #2',
    activatedOn: new Date('2018-12-04'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 3,
    name: 'Employee #3',
    activatedOn: new Date('2019-01-10'),
    deactivatedOn: null,
    customerId: 1,
  },
];

const constantUsers = [
  {
    id: 1,
    name: 'Employee #1',
    activatedOn: new Date('2018-11-04'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 2,
    name: 'Employee #2',
    activatedOn: new Date('2018-12-04'),
    deactivatedOn: null,
    customerId: 1,
  },
];

const newPlan = {
  id: 1,
  customerId: 1,
  monthlyPriceInDollars: 4,
};

const noUsers = [];

describe('billFor', function () {
  it('works when the customer has no active users during the month', function () {
    // closeTo parameters -> actual, expected, tolerance
    assert.closeTo(billFor('2019-01', newPlan, noUsers), 0.0, 0.01);
  });

  it('works when everything stays the same for a month', function () {
    assert.closeTo(billFor('2019-01', newPlan, constantUsers), 8.0, 0.01);
  });

  it('works when a user is activated during the month', function () {
    assert.closeTo(billFor('2019-01', newPlan, userSignedUp), 10.84, 0.01);
  });
});
