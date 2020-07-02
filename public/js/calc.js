// Delta Temp BTU Loss Calculator Selectors
const form = document.getElementById("form");
const sqft = document.getElementById("sqft");
const ufactor = document.getElementById("ufactor");
const temp = document.getElementById("temp");
const kwh = document.getElementById("kwh");
const degree_days = document.getElementById("dd");
const results = document.getElementById("results");

// Full Season Degree Day Calculator
const full_season_form = document.getElementById("full_season_form");
const sqft_season = document.getElementById("sqft_season");
const heating_source = document.getElementById("heating_source");
const window_type = document.getElementById("window_type");
const city = document.getElementById("city");
const full_season_results = document.getElementById("full_season_results");

// One Hour Heat Loss Function
const heatloss = (sqft, temp, ufactor) => {
  const deg_diff = temp.value;
  const win_area = sqft.value;
  const u_val = ufactor.value;
  const btu = deg_diff * win_area * u_val;
  const cop = 3412;
  const elec_rate = kwh.value;
  const dollar_loss = ((btu / cop) * elec_rate).toFixed(2);
  const watts = (btu / 3.412).toFixed();
  console.log(btu);
  results.innerText = `${btu} BTU's of heat loss per hour requiring a constant ${watts} watts equaling $ ${dollar_loss} every hour`;
};

// Full Season Window Heat Loss Function
const fullSeasonCalc = (sqft_season, city, window_type, heating_source) => {
  let heatTypeFactor = 0;
  let rate = 0;
  if (heating_source.value === "elec") {
    heatTypeFactor = 38.82;
    rate = 0.12;
  } else if (heating_source.value === "hp") {
    heatTypeFactor = 30.82;
    rate = 0.12;
  } else if (heating_source.value === "ng") {
    heatTypeFactor = 2.03;
    rate = 1.2;
  } else {
    heatTypeFactor = 1.57;
    rate = 3;
  }

  const raw_results =
    ((city.value * heatTypeFactor * rate) / 10000) *
    sqft_season.value *
    window_type.value;
  console.log(raw_results);

  const results = raw_results.toFixed(2);

  full_season_results.innerText = `Results: your windows lose $ ${results} worth of heat a year`;
};

// Submit Delta Temp Calc
form.addEventListener("submit", function(e) {
  e.preventDefault();
  heatloss(sqft, temp, ufactor);
});

// Submit Full Season Calc
full_season_form.addEventListener("submit", function(e) {
  e.preventDefault();
  fullSeasonCalc(sqft_season, city, window_type, heating_source);
});
