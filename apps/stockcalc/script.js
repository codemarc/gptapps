// Description: This script is used to calculate the stock price based on the user input values.
// Based on https://www.reddit.com/r/investing/comments/lglskh/collection_of_finviz_screeners/

const strategies = {
  shortedStocks: { // 1.
    name: "Most Shorted Stocks",
    description: "Stocks with the highest short interest.",
    details: "Short interest is the number of shares sold short by investors, betting on a stock price decline. High short interest can lead to short squeezes and volatile price movements.",
    url: "https://finviz.com/screener.ashx?v=131&f=sh_avgvol_o500,sh_curvol_o500,sh_opt_optionshort,sh_price_o3,sh_relvol_o1,sh_short_high&o=-shortinterestshare",
    criteria: [
      "Average volume > 500K",
      "Current volume > 500K",
      "High short interest",
      "Options available"
    ]
  },
  shortSqueeze: { // 2.
    name: "Short Squeeze",
    description: "Stocks with high short interest and potential for a squeeze.",
    details: "A short squeeze occurs when rising stock prices force short sellers to buy shares to cover losses, driving the price even higher. It often happens in stocks with high short interest and sudden positive momentum.",
    url: "https://finviz.com/screener.ashx?v=131&f=sh_avgvol_o100,sh_instown_u50,sh_price_o2,sh_short_o15&ft=4&o=-shortinterestshare",
    criteria: [
      "Average volume > 100K",
      "Price > $2",
      "Short interest > 15%",
      "Institutional ownership < 50%"
    ]
  },
  weekPreEarningsGapUp: { // 3.
    name: "Weekly Earnings Gap Up",
    description: "Stocks with earnings reports coming up and positive momentum.",
    details: "A weekly earnings gap up is a stock price movement where the stock opens above the previous week's closing price, indicating a potential increase in demand or a positive market reaction to upcoming earnings.",
    url: "https://finviz.com/screener.ashx?v=141&f=earningsdate_tomorrowafter,sh_avgvol_o400,sh_curvol_o50,sh_short_u25,ta_averagetruerange_o0.5,ta_gap_u2&ft=4&o=-perfytd",
    criteria: [
      "Earnings report coming up",
      "Average volume > 400K",
      "Current volume > 50",
      "Short interest < 25%",
      "Average true range > 0.5",
      "Gap up > 2%"
    ]
  },
  bankSqueeze: { // 4.
    name: "Bankruptcy Squeeze Candidates",
    description: "Occurs when a company is close to filing for bankruptcy",
    details: "A bankruptcy squeeze is a short squeeze that can happen when a company is close to filing for bankruptcy. A short squeeze occurs when there is more demand from short sellers to borrow shares than there are shares available, which can make it difficult for prime brokers to fulfill borrow requests.",
    url: "https://finviz.com/screener.ashx?v=131&f=fa_pb_low,sh_short_o30&ft=4&o=-shortinterestshare",
    criteria: [
      "Low P/B ratio",
      "High short interest"
    ]
  },
  upOffOfLows: { // 5.
    name: "Potential uptrend from weekly lows",
    description: "Stocks showing strong technical patterns.",
    details: "Stocks that have recently pulled back in price (down 1 week). This pullback could be an opportunity to buy the stock at a lower price before it potentially continues its uptrend.",
    url: "https://finviz.com/screener.ashx?v=141&f=sh_avgvol_o400,ta_pattern_channelup,ta_perf_1wdown&ft=4&o=perf1w",
    criteria: [
      "Average volume > 400K",
      "Channel up pattern",
      "Down 1 week"
    ]
  },
  bounceAtMovingAverage: { // 6.
    name: "Bounce at moving average",
    description: "Stocks that have recently bounced off a moving average.",
    details: "Stocks that have pulled back to a moving average (such as the 20-day or 50-day SMA) and is potentially bouncing off that level. This bounce can be a signal that the stock is resuming its upward trend after a short-term pullback.",
    url: "https://finviz.com/screener.ashx?v=141&f=sh_avgvol_o400,sh_curvol_o2000,sh_relvol_o1,ta_sma20_pa,ta_sma50_pb&ft=4&o=-perf1w",
    criteria: [
      "Average volume > 400K",
      "Current volume > 2000",
      "Relative volume > 1",
      "SMA20 > SMA5",
    ]
  },
  oversold: { // 7. Oversold reversal
    name: "Oversold Reversal",
    description: "Stocks that are oversold and showing signs of reversal.",
    "details": "Stocks that are priced above $5, have high relative trading volume, are showing a positive price change, and have an RSI below 30. These stocks are considered oversold and may be showing signs of a reversal, presenting a potential buying opportunity.",
    url: "https://finviz.com/screener.ashx?v=111&f=sh_price_o5,sh_relvol_o2,ta_change_u,ta_rsi_os30&ft=4&o=price",
    criteria: [
      "Price > $5",
      "Relative volume > 2",
      "Positive change",
      "RSI < 30"
    ]
  },
  oversoldWithEarnings: { // 8.
    name: "Oversold with upcoming earnings",
    description: "Stocks that are oversold and have upcoming earnings.",
    details: "Stocks that are priced above $5, have high relative trading volume, are showing a positive price change, have an RSI below 50, and have upcoming earnings. These stocks are considered oversold and may be showing signs of a reversal, presenting a potential buying opportunity.",
    url: "https://finviz.com/screener.ashx?v=141&f=cap_smallover,earningsdate_thismonth,fa_epsqoq_o15,fa_grossmargin_o20,sh_avgvol_o750,sh_curvol_o1000,ta_perf_52w10o,ta_rsi_nob50&ft=4&o=perfytd",
    criteria: [
      "Small cap",
      "Earnings report coming up",
      "EPS Q/Q > 15%",
      "Gross margin > 20%",
      "Average volume > 750K",
      "Current volume > 1000",
      "52-week performance > 10%",
      "RSI < 50"
    ]
  },
  newHighs: { // 9.
    name: "New Highs",
    description: "Stocks hitting new highs.",
    details: "Stocks that are priced above $7, showing a positive price change, and hitting new highs in the short-term, medium-term, and long-term. These stocks are showing strong momentum and may continue to rise in price.",
    url: "https://finviz.com/screener.ashx?v=141&f=an_recom_buy,sh_price_u7,ta_change_u,ta_highlow20d_nh,ta_highlow50d_nh,ta_highlow52w_nh,ta_perf_dup&ft=4&o=-perf1w",
    criteria: [
      "Price > $7",
      "Positive change",
      "New highs in 20-day, 50-day, and 52-week range"
    ]
  },
  breakingOut: { // 10.
    name: "Breaking Out",
    description: "Stocks breaking out to new highs.",
    details: "Stocks that are priced above $1, have a high return on equity, and are breaking out to new highs in the short-term, medium-term, and long-term. These stocks are showing strong momentum and may continue to rise in price.",
    url: "https://finviz.com/screener.ashx?v=141&f=fa_debteq_u1,fa_roe_o20,sh_avgvol_o100,ta_highlow50d_nh,ta_sma20_pa,ta_sma200_pa,ta_sma50_pa&ft=4&o=-perf1w",
    criteria: [
      "Debt/Equity < 1",
      "ROE > 20%",
      "Average volume > 100K",
      "New highs in 50-day range",
      "SMA20 > SMA5",
      "SMA200 > SMA5",
      "SMA50 > SMA5"
    ]
  },
  smaCrossover: { // 11.
    name: "SMA Crossover",
    description: "Stocks with a moving average crossover.",
    details: "Stocks that are profitable, have high average trading volume, low short interest, a beta greater than 1, and a 50-day moving average that has crossed above the 20-day moving average. This crossover can be a bullish signal that the stock is gaining momentum.",
    url: "https://finviz.com/screener.ashx?v=141&f=fa_pe_profitable,sh_avgvol_o400,sh_relvol_o1,sh_short_low,ta_beta_o1,ta_sma50_cross20b&ft=4",
    criteria: [
      "Profitable",
      "Average volume > 400K",
      "Relative volume > 1",
      "Low short interest",
      "Beta > 1",
      "SMA50 crossed above SMA20"
    ]
  },
  highGrowth: { // 12.
    name: "High Earnings Growth",
    description: "Stocks with high earnings growth.",
    details: "Stocks that are profitable, have high average trading volume, a high RSI, and have seen strong earnings growth quarter-over-quarter and year-over-year. These stocks are showing strong momentum and may continue to rise in price.",
    url: "https://finviz.com/screener.ashx?v=141&f=fa_epsqoq_o25,fa_epsyoy_o25,fa_epsyoy1_o25,fa_salesqoq_o25,sh_avgvol_o400,ta_rsi_nos50,ta_sma200_pa&ft=4&o=-perfytd",
    criteria: [
      "EPS Q/Q > 25%",
      "EPS Y/Y > 25%",
      "EPS Y/Y1 > 25%",
      "Sales Q/Q > 25%",
      "Average volume > 400K",
      "RSI < 50",
      "SMA200 > SMA5"
    ]
  },
  highSalesGrowth: { // 13.
    name: "High Sales Growth",
    description: "Stocks with high sales growth.",
    details: "Stocks that are profitable, have low debt-to-equity ratios, a high return on equity, and have seen strong sales growth over the past 5 years and quarter-over-quarter. These stocks are showing strong momentum and may continue to rise in price.",
    url: "https://finviz.com/screener.ashx?v=111&f=fa_debteq_u0.5,fa_roe_o15,fa_sales5years_o20,fa_salesqoq_o20,sh_avgvol_o200,sh_instown_o60,sh_price_o5,sh_short_u5&ft=4",
    criteria: [
      "Debt/Equity < 0.5",
      "ROE > 15%",
      "Sales growth > 20% (5 years)",
      "Sales growth > 20% (Q/Q)",
      "Average volume > 200K",
      "Institutional ownership > 60%",
      "Price > $5",
      "Short interest < 5%"
    ]
  },
  highVolume: { // 14.
    name: "High Volume",
    description: "Stocks with high trading volume.",
    details: "Stocks that are profitable, have high average trading volume, a high relative volume, and are showing strong price momentum. These stocks are actively traded and may present short-term trading opportunities.",
    url: "https://finviz.com/screener.ashx?v=131&f=fa_curratio_o1,fa_epsqoq_o15,fa_quickratio_o1,fa_salesqoq_o15,sh_avgvol_o400,sh_price_o5,sh_relvol_o1.5,ta_sma20_pa,ta_sma200_sb50,ta_sma50_sa200&ft=4&o=instown",
    criteria: [
      "Current ratio > 1",
      "EPS Q/Q > 15%",
      "Quick ratio > 1",
      "Sales growth > 15% (Q/Q)",
      "Average volume > 400K",
      "Price > $5",
      "Relative volume > 1.5",
      "SMA20 > SMA5",
      "SMA200 > SMA50",
      "SMA50 > SMA20"
    ]
  },
  consistentGrowth: { // 15.
    name: "Consistent Growth",
    description: "Stocks with consistent earnings and sales growth.",
    details: "Stocks that are profitable, have high average trading volume, a high return on equity, and have seen consistent earnings and sales growth quarter-over-quarter and year-over-year. These stocks are showing strong momentum and may continue to rise in price.",
    url: "https://finviz.com/screener.ashx?v=141&f=fa_eps5years_pos,fa_epsqoq_o20,fa_epsyoy_o25,fa_epsyoy1_o15,fa_estltgrowth_pos,fa_roe_o15,sh_instown_o10,sh_price_o15,ta_highlow52w_a90h,ta_rsi_nos50&ft=4&o=-perfytd",
    criteria: [
      "EPS growth > 0 (5 years)",
      "EPS Q/Q > 20%",
      "EPS Y/Y > 25%",
      "EPS Y/Y1 > 15%",
      "Earnings estimate growth > 0",
      "ROE > 15%",
      "Institutional ownership > 10%",
      "Price > $15",
      "High-low 52-week range > 90%",
      "RSI < 50"
    ]
  },
  buyAndHold: { // 16.
    name: "Buy and Hold Value",
    description: "Stocks with strong value and growth potential.",
    details: "Stocks that are profitable, have high average trading volume, a low P/E ratio, a low PEG ratio, a high return on equity, a low beta, and a rising 20-day moving average. These stocks are considered undervalued and may present long-term investment opportunities.",
    url: "https://finviz.com/screener.ashx?v=121&f=cap_microover,fa_curratio_o1.5,fa_estltgrowth_o10,fa_peg_o1,fa_roe_o15,ta_beta_o1.5,ta_sma20_pa&ft=4&o=-forwardpe",
    criteria: [
      "Micro-cap over",
      "Current ratio > 1.5",
      "Earnings estimate growth > 10%",
      "PEG ratio < 1",
      "ROE > 15%",
      "Beta < 1.5",
      "SMA20 > SMA5"
    ]
  },
  undervaluedDividend: { // 17. 
    name: "Undervalued Dividend Growth",
    description: "Stocks with undervalued dividends and growth potential.",
    details: "Stocks that are profitable, have high average trading volume, a positive dividend yield, strong earnings growth, a low payout ratio, a low P/E ratio, and a low PEG ratio. These stocks are considered undervalued and may present long-term investment opportunities.",
    url: "https://finviz.com/screener.ashx?v=111&f=cap_largeover,fa_div_pos,fa_epsyoy1_o5,fa_estltgrowth_o5,fa_payoutratio_u50,fa_pe_u20,fa_peg_low&ft=4&o=-pe",
    criteria: [
      "Large-cap over",
      "Dividend > 0",
      "EPS Y/Y1 > 5%",
      "Earnings estimate growth > 5%",
      "Payout ratio < 50%",
      "P/E ratio < 20",
      "PEG ratio < 1"
    ]
  },  
  lowPEValue: { // 18.
    name: "Low P/E Value",
    description: "Stocks with low P/E ratios and strong value potential.",
    details: "Stocks that are profitable, have low price-to-book and price-to-earnings ratios, a low PEG ratio, a positive return on assets, a positive return on equity, and are priced above $5. These stocks are considered undervalued and may present long-term investment opportunities.",
    url: "https://finviz.com/screener.ashx?v=141&f=cap_smallunder,fa_pb_low,fa_pe_low,fa_peg_low,fa_roa_pos,fa_roe_pos,sh_price_o5&ft=4&o=-perfytd",
    criteria: [
      "Small-cap under",
      "Price-to-book ratio < 1",
      "P/E ratio < 1",
      "PEG ratio < 1",
      "Return on assets > 0",
      "Return on equity > 0",
      "Price > $5"
    ]
  },
  canslim: { // 19.
    name: "CANSLIM",
    description: "Stocks that meet the CANSLIM criteria.",
    details: "CANSLIM is a stock investing strategy developed by William O'Neil that combines fundamental and technical analysis to identify high-growth stocks. The criteria include strong earnings and sales growth, institutional ownership, new product or service, leadership, and market conditions.",
    url: "https://finviz.com/screener.ashx?v=111&f=fa_eps5years_o20,fa_epsqoq_o20,fa_epsyoy_o20,fa_sales5years_o20,fa_salesqoq_o20,sh_curvol_o200&ft=4",
    criteria: [
      "EPS growth > 20% (5 years)",
      "EPS Q/Q > 20%",
      "EPS Y/Y > 20%",
      "Sales growth > 20% (5 years)",
      "Sales Q/Q > 20%",
      "Average volume > 200K"
    ]
  }

}

function populateStrategySelect() {
  const strategySelect = document.getElementById('strategySelect')
  strategySelect.innerHTML = '<option value="">Choose a Strategy...</option>' // Clear existing options

  Object.keys(strategies).forEach(key => {
    const option = document.createElement('option')
    option.value = key
    option.textContent = strategies[key].name
    strategySelect.appendChild(option)
  })
}

// Call the function to populate the select options on page load
document.addEventListener('DOMContentLoaded', populateStrategySelect)

document.getElementById('strategySelect').addEventListener('change', (e) => {
  const strategy = strategies[e.target.value]
  const criteriaDisplay = document.getElementById('criteriaDisplay')
  const finvizLink = document.getElementById('finvizLink')

  if (strategy) {
    criteriaDisplay.innerHTML = `
          <h3>${strategy.name} - <span class="desc">${strategy.description}</span></h3>
          <p>${strategy.details ?? ""}</p>
          <h4>Key Criteria:</h4>
          <ul>
              ${strategy.criteria.map(criterion => `<li>${criterion}</li>`).join('')}
          </ul>
      `
    finvizLink.href = strategy.url
    finvizLink.style.display = 'inline-block'
  } else {
    criteriaDisplay.innerHTML = ''
    finvizLink.style.display = 'none'
  }
})
