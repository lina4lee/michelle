//  CHALLENGE
/**
 * Computes the monthly charge for a given subscription.
 *
 * @returns {number} The total monthly bill for the customer in dollars and cents, rounded
 * to 2 decimal places.
 * If there are no active users or the subscription is null, returns 0.
 *
 * @param {string} month - Always present
 *   Has the following structure:
 *   "2022-04"  // April 2022 in YYYY-MM format
 *
 * @param {object} activeSubscription - May be null
 *   If present, has the following structure:
 *   {
 *     'id': 763,
 *     'customerId': 328,
 *     'monthlyPriceInDollars': 4  // price per active user per month
 *   }
 *
 * @param {array} users - May be empty, but not null
 *   Has the following structure:
 *   [
 *     {
 *       'id': 1,
 *       'name': "Employee #1",
 *       'customerId': 1,
 *
 *       // when this user started
 *       'activatedOn': new Date("2021-11-04"),
 *
 *       // last day to bill for user
 *       // should bill up to and including this date
 *       // since user had some access on this date
 *       'deactivatedOn': new Date("2022-04-10")
 *     },
 *     {
 *       'id': 2,
 *       'name': "Employee #2",
 *       'customerId': 1,
 *
 *       // when this user started
 *       'activatedOn': new Date("2021-12-04"),
 *
 *       // hasn't been deactivated yet
 *       'deactivatedOn': null
 *     },
 *   ]
 */

function billFor(month, activeSubscription, users) {
  console.log(users)
  // calculate a daily rate for the active subscription tier
  // take monthlyPriceInDollars and divide by number of days in that month
  // convert month string into month and year vars
  const year = month.slice(0, 4);
  const currMonth = month.slice(-2);
  const daysInMonth = getDays(year, currMonth);
  const dailyRate = activeSubscription.monthlyPriceInDollars / daysInMonth;
  console.log(dailyRate)
  // for each day of month, identify which users were active
  // iterate through users array
  let totalDays = 0;

  month += '-01 ' // '2022-04-01'
  for (let i = 0; i < users.length; i++) {
    // determine range of days
    console.log(month);
    console.log(new Date(month))
    const firstDay = firstDayOfMonth(new Date(month));
    console.log(firstDay)
    const startActive = users[i].activatedOn;
    console.log(startActive)
    const startDeactive = users[i].deactivatedOn;
    console.log(startDeactive)
    // if activatedOn < firstDayOfMonth of given month
    if (startActive < firstDay && (startDeactive > lastDayOfMonth(new Date(month)) || !startDeactive)) {
      // determine number of days in the month
      totalDays += daysInMonth; 
    }

    // check if deact is null then...

    if (startActive < firstDay && startDeactive < lastDayOfMonth(new Date(month)) && startDeactive !== null) {
      // determine difference between startActive and startDeactive
      const diff = nextDay(startDeactive) - firstDay 
      diffInDays = diff / (1000 * 3600 * 24);
      console.log(diffInDays)
      totalDays += diffInDays;
    }

    if (startActive > firstDay) { 
      const endOfMonth = lastDayOfMonth(new Date(month))

      if (!startDeactive) {
        const diff = nextDay(endOfMonth) - startActive;
        diffInDays = diff / (1000 * 3600 * 24);
        totalDays += diffInDays;
      }

      // deactivatedOn > lastDayOfMonth of given month, then find difference between activatedOn to nextDay(last day of month)
      else if (startDeactive > endOfMonth || !startDeactive) {

        const diff = nextDay(endOfMonth) - startActive;
        diffInDays = diff / (1000 * 3600 * 24);
        totalDays += diffInDays;
      }

      // deactivatedOn < lastDayOfMonth of given month, then find diff between activatedOn to nextDay(deactivatedOn)
      else if (startDeactive < endOfMonth) {
          const diff = nextDay(startDeactive) - startActive;
          diffInDays = diff / (1000 * 3600 * 24);
          totalDays += diffInDays
        }
      }
    

    // const startDate = new Date(users[i].activatedOn);
    // const endDate =
    //   users[i].deactivatedOn === null
    //     ? new Date()
    //     : new Date(users[i].deactivatedOn);

    // calculate the time difference of two dates
    // const differenceInTime = endDate.getTime() - startDate.getTime();

    // calculate the number of days between two dates
    // const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    // totalDays += differenceInDays;
  }
  console.log(totalDays)
  const total = totalDays * dailyRate;
  console.log(typeof total)
  // return total for the month rounded to 2 decimal places
  console.log(total.toFixed(2))
  return total.toFixed(2);
}


const activeSubscription =
{
  'id': 763,
  'customerId': 328,
  'monthlyPriceInDollars': 4  // price per active user per month
}

const newPlan = {
  id: 1,
  customerId: 1,
  monthlyPriceInDollars: 4,
};

const users =
  [
    {
      'id': 1,
      'name': "Employee #1",
      'customerId': 1,
      // when this user started
      'activatedOn': new Date("2021-11-04 "),

      // last day to bill for user
      // should bill up to and including this date
      // since user had some access on this date
      'deactivatedOn': new Date("2022-04-10 ")
    },
    {
      'id': 2,
      'name': "Employee #2",
      'customerId': 1,

      // when this user started
      'activatedOn': new Date("2021-12-04 "),

      // hasn't been deactivated yet
      'deactivatedOn': null
    },
  ]

const userSignedUp = [
  {
    id: 1,
    name: 'Employee #1',
    activatedOn: new Date('2018-11-04 '),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 2,
    name: 'Employee #2',
    activatedOn: new Date('2018-12-04 '),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 3,
    name: 'Employee #3',
    activatedOn: new Date('2019-01-10 '),
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

const noUsers = [];

console.log(billFor("2022-04", activeSubscription, users));
console.log(billFor("2022-04", activeSubscription, userSignedUp));
console.log(billFor("2022-04", activeSubscription, noUsers));
console.log(billFor('2019-01', newPlan, noUsers));
console.log(billFor('2019-01', newPlan, userSignedUp));
console.log(billFor('2019-01', newPlan, constantUsers));

const birthday = new Date('August 19, 1975');
console.log(birthday)

const birth = new Date('1975-08-19 ')
console.log(birth)

/*******************
 * Helper functions *
 *******************/

// takes year and month and returns number of days in that month
function getDays(year, month) {
  return new Date(year, month, 0).getDate();
};

/**
    Takes a Date instance and returns a Date which is the first day
    of that month. For example:
  
    firstDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 1)
  
    Input type: Date
    Output type: Date
  **/
function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
    Takes a Date object and returns a Date which is the last day
    of that month. For example:
  
    lastDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 28)
  
    Input type: Date
    Output type: Date
  **/
function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
    Takes a Date object and returns a Date which is the next day.
    For example:
  
    nextDay(new Date(2019, 2, 7))  // => new Date(2019, 2, 8)
    nextDay(new Date(2019, 2, 28)) // => new Date(2019, 3, 1)
  
    Input type: Date
    Output type: Date
  **/
function nextDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

