const filterTransactionsToTaxYear = (transactions, year) => {
    const startTime = new Date(year, 0, 1).getTime() / 1000;
    const endTime = new Date(year + 1, 0, 1).getTime() / 1000;

    return transactions.filter(
        (transaction) =>
            transaction.timestamp >= startTime && transaction.timestamp <= endTime,
    );
};