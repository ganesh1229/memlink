const groupBy = (items, field) => {
  return items.reduce((acc, item) => {
    const key = item[field] || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

module.exports = {
  groupBy,
};