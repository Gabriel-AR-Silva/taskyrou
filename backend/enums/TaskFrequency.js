const Frequencies = Object.freeze({
  ONCE: 'once',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
});

const FREQUENCY_VALUES = Object.values(Frequencies);

module.exports = {
  Frequencies,
  FREQUENCY_VALUES,
};
