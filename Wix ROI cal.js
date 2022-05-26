// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
$w.onReady(function () {
    $w('#stateboxROI').changeState("stateHome");
    $w("#buttonCalculate").onClick(() => {
        //First define values
        var cvsPerMonth = parseFloat($w('#cvsPerMonth').value);
        var minutesPerCV = parseFloat($w('#cvTime').value);
        var recruiterNumber = parseFloat($w('#recruiterNumber').value);
        var recruiterSalary = parseFloat($w('#salaryPerMonth').value);
        var recruiterSales = parseFloat($w('#recruiterSales').value);

        var ARALicenseCost;

        if (cvsPerMonth > 0 && cvsPerMonth <= 30) {
            ARALicenseCost = 30 * 1.2;
        } else if (cvsPerMonth > 30 && cvsPerMonth <= 50) {
            ARALicenseCost = 50 * 1.2;
        } else if (cvsPerMonth > 50 && cvsPerMonth <= 100) {
            ARALicenseCost = 100 * 1.2;
        } else if (cvsPerMonth > 100 && cvsPerMonth <= 150) {
            ARALicenseCost = 150 * 1.2;
        } else if (cvsPerMonth > 150 && cvsPerMonth <= 200) {
            ARALicenseCost = 200 * 1.2;
        } else if (cvsPerMonth > 200 && cvsPerMonth <= 300) {
            ARALicenseCost = 300 * 1.2;
        } else if (cvsPerMonth > 300 && cvsPerMonth <= 400) {
            ARALicenseCost = 400 * 1.2;
        } else if (cvsPerMonth > 400 && cvsPerMonth <= 500) {
            ARALicenseCost = 500 * 1.2;
        } else if (cvsPerMonth > 500 && cvsPerMonth <= 700) {
            ARALicenseCost = 700 * 1.2;
        } else if (cvsPerMonth > 700 && cvsPerMonth <= 1000) {
            ARALicenseCost = 1000 * 1.2;
        }

        var totalRecCost = recruiterNumber * recruiterSalary;
        var totalRevenue = recruiterNumber * recruiterSales;
        var totalProdRecTimeMins = (20 * 5 * 60) * recruiterNumber;
        var timeSpentForCVsMins = minutesPerCV * cvsPerMonth;
        var perOfTimeSpentForCVs = timeSpentForCVsMins / totalProdRecTimeMins;
        var costOfTimeSpentCVFor = (totalRecCost / totalProdRecTimeMins) * timeSpentForCVsMins;
        var potentialRevenueIncrease = totalRevenue * ((1 / (1 - perOfTimeSpentForCVs)) - 1);

        var saving = costOfTimeSpentCVFor - ARALicenseCost;
        var roi = (saving / ARALicenseCost) * 100;

        //$w('#perOfTimeSpentForCVs').text = (perOfTimeSpentForCVs * 100).toFixed(0).toString() + '%'; //timsing it by 100 to turn it into a %
        $w('#perOfTimeSpentForCVs').text = Math.trunc(timeSpentForCVsMins / 60).toString() + ' hours';
        $w('#costOfTimeSpentCVFor').text = '£' + Math.trunc(costOfTimeSpentCVFor).toLocaleString("en-US");
        $w('#potentialRevenueIncrease').text = '£' + Math.trunc(potentialRevenueIncrease).toLocaleString("en-US");
        $w('#salesIncreaseText').text = 'sales increase of adding ' + Math.trunc(timeSpentForCVsMins / 60).toString() + ' hours to the team';

        $w('#ARALicenseCost').text = '£' + Math.trunc(ARALicenseCost).toLocaleString("en-US");
        $w('#saving').text = '£' + Math.trunc(saving).toLocaleString("en-US");
        $w('#ROI').text = roi.toFixed(1) + '%';

        $w('#stateboxROI').changeState("stateResults");
    });
    // $w("#buttonCalculate").onClick(() => {
    //     $w('#stateboxROI').changeState("stateHome");
    // });
});