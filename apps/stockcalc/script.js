// Description: This script is used to calculate the stock price based on the user input values.
// Based on https://www.reddit.com/r/investing/comments/lglskh/collection_of_finviz_screeners/

const strategies = {
  shortSqueeze: {
    name: "Short Squeeze Potential",
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
  shortedStocks: {
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
  weeklyEarningsGapUp: {
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
  earnings: {
    name: "Earnings Play",
    description: "Stocks with upcoming earnings and positive momentum",
    details: "An earnings play is a strategy where investors trade a stock based on expected price movements around a company’s earnings report. They aim to profit from volatility before or after the report, depending on surprises or market reactions.",
    url: "https://finviz.com/screener.ashx?v=141&f=earningsdate_tomorrowafter,sh_avgvol_o400,sh_curvol_o50,sh_short_u25,ta_averagetruerange_o0.5,ta_gap_u2&ft=4&o=-perfytd",
    criteria: [
      "Upcoming earnings",
      "Average volume > 400K",
      "Low short interest",
      "Positive momentum"
    ]
  },
  technical: {
    name: "Technical Analysis",
    description: "Stocks showing strong technical patterns",
    url: "https://finviz.com/screener.ashx?v=141&f=sh_avgvol_o400,ta_pattern_channelup,ta_perf_1wdown&ft=4&o=perf1w",
    criteria: [
      "Channel up pattern",
      "Recent pullback",
      "Good volume"
    ]
  },
  fundamental: {
    name: "Fundamental Analysis",
    description: "Stocks with strong fundamental metrics",
    url: "https://finviz.com/screener.ashx?v=111&f=fa_debteq_u0.5,fa_roe_o15,fa_sales5years_o20,fa_salesqoq_o20,sh_avgvol_o200,sh_instown_o60,sh_price_o5,sh_short_u5&ft=4",
    criteria: [
      "Low debt/equity ratio",
      "High ROE > 15%",
      "Strong sales growth",
      "Institutional backing"
    ]
  },
  growth: {
    name: "Growth Stocks",
    description: "High-growth companies with strong momentum",
    url: "https://finviz.com/screener.ashx?v=141&f=fa_eps5years_pos,fa_epsqoq_o20,fa_epsyoy_o25,fa_epsyoy1_o15,fa_estltgrowth_pos,fa_roe_o15,sh_instown_o10,sh_price_o15,ta_highlow52w_a90h,ta_rsi_nos50&ft=4&o=-perfytd",
    criteria: [
      "Strong EPS growth",
      "Positive earnings trend",
      "High ROE",
      "Near 52-week highs"
    ]
  },
  value: {
    name: "Value Stocks",
    description: "Undervalued stocks with strong fundamentals",
    url: "https://finviz.com/screener.ashx?v=141&f=cap_smallunder,fa_pb_low,fa_pe_low,fa_peg_low,fa_roa_pos,fa_roe_pos,sh_price_o5&ft=4&o=-perfytd",
    criteria: [
      "Low P/E ratio",
      "Low P/B ratio",
      "Low PEG ratio",
      "Positive ROE & ROA"
    ]
  }
}

document.getElementById('strategySelect').addEventListener('change', (e) => {
  const strategy = strategies[e.target.value]
  const criteriaDisplay = document.getElementById('criteriaDisplay')
  const finvizLink = document.getElementById('finvizLink')

  if (strategy) {
    criteriaDisplay.innerHTML = `
          <h3>${strategy.name}</h3>
          <p>${strategy.description}</p>
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
