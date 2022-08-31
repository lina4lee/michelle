
Calculating invoices for customer billing

*Background*

In the past, we provided some raw billing data in JSON format to the finance team, which they used to manually generate monthly invoices for our customers. Recently, they’ve asked us to create some automation to make this process less error-prone.

*Instructions*

Your goal is to implement the billFor function to calculate the total monthly bill for a customer.

Customers are billed based on their subscription tier. We charge them a prorated amount for the portion of the month each user’s subscription was active. For example, if a user was activated or deactivated part way through the month, then we charge them only for the days their subscription was active.

We want to bill customers for all days users were active in the month (including any activation and deactivation dates, since the user had some access on those days).

You talked with the other engineers on the team and decided that the following algorithm would work:

Calculate a daily rate for the active subscription tier
For each day of the month, identify which users were active that day
Multiply the number of active users for the day by the daily rate to calculate the total for the day
Return the running total for the month at the end, rounded to 2 decimal places

*Testing*

The automated tests we provide only cover a few key cases, so you should plan to add some of your own tests or modify the existing ones to ensure that your solution handles any edge cases. You should be able to follow the existing patterns for naming and constructing tests to add your own.

*Notes / Edge cases*

It’s more important for the return value to be correct than it is for the algorithm to be highly optimized.
You can store intermediate results as any kind of decimal type (e.g. float, double). You do not need to round values until the last step.
You should bill for all days between and including both the activation and deactivation dates since the user still had some access on the last day.
You should not change function names or return types of the provided functions since our test cases depend on those not changing.
