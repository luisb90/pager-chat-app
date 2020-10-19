class Utils {
  // Formats the date in 12 hour time format, eg 9:30 PM
  static getTimeFromDate(date) {
    return new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
}

export default Utils;
