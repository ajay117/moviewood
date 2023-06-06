function formatNumber(num) {
  const options = {
    style: "decimal",
    useGrouping: true,
  };

  const formattedNumber = num.toLocaleString("en-US", options);

  return formattedNumber;
}

export default formatNumber;
