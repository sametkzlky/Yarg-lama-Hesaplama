$(function () {
  $(document).on("change", ".monthInput", function () {
    const monthValue = $(this).val();
    const approxResultElement = $(this)
      .closest(".container-content-product")
      .find(".approxResult");

    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        if (monthValue) {
          approxResultElement.text(`${getApproxValue(monthValue, data)} ₺`);
        } else {
          approxResultElement.text("Lütfen bir tarih seçiniz.");
        }
      })
      .catch((error) => {
        console.error("JSON verisi yüklenirken bir hata oluştu:", error);
      });
  });

  $(document).on("click", ".hesapla", function () {
    let total = 0;

    $(".approxResult").each(function () {
      const priceText = $(this).text().replace("₺", "").trim();
      const price = parseFloat(priceText);
      if (!isNaN(price)) total += price;
    });

    $("#totalPrice").text(`Toplam Ücret: ${total.toFixed(2)} ₺`);
  });

  $("#normalTeb").click(function () {
    toggleContainers("#normalTebligat", "#eTebligat");
  });

  $("#eTeb").click(function () {
    toggleContainers("#eTebligat", "#normalTebligat");
  });

  $(document).on("click", "#normEkle", function () {
    const newRow = `
      <div class="container-content-product">
        <input type="date" id="monthInput" class="monthInput" />
        <p class="approxResult"></p>
      </div>
    `;
    $("#dateTable .scroll-container").append(newRow);
  });

  function getApproxValue(monthValue, data) {
    const dateRanges = [
      {
        start: "2005-01-01",
        end: "2006-01-01",
        value: data.ikibinbes.butunaylar,
      },
      {
        start: "2006-01-01",
        end: "2008-01-01",
        value: data.ikibinaltiyedi.butunaylar,
      },
      {
        start: "2008-01-01",
        end: "2010-01-01",
        value: data.ikibinsekizdokuz.butunaylar,
      },
      {
        start: "2010-01-01",
        end: "2011-01-01",
        value: data.ikibinon.butunaylar,
      },
      {
        start: "2011-01-01",
        end: "2012-01-01",
        value: data.ikibinonbir.butunaylar,
      },
      {
        start: "2012-01-01",
        end: "2013-01-01",
        value: data.ikibinoniki.butunaylar,
      },
      {
        start: "2013-01-01",
        end: "2014-06-01",
        value: data.ikibinonuc.butunaylar,
      },
      {
        start: "2014-06-01",
        end: "2015-05-01",
        value: data.ikibinondorthaziran.butunaylar,
      },
      {
        start: "2015-05-01",
        end: "2016-07-12",
        value: data.ikibinonbesmayis.butunaylar,
      },
      {
        start: "2016-07-12",
        end: "2017-09-20",
        value: data.ikibinonaltitemmuz.butunaylar,
      },
      {
        start: "2017-09-20",
        end: "2018-01-02",
        value: data.ikibinonyedieylul.butunaylar,
      },
      {
        start: "2018-01-02",
        end: "2019-05-20",
        value: data.ikibinonsekizocak.butunaylar,
      },
      {
        start: "2019-05-20",
        end: "2019-11-01",
        value: data.ikibinondokuzmayis.butunaylar,
      },
      {
        start: "2019-11-01",
        end: "2021-11-01",
        value: data.ikibinondokuzkasim.butunaylar,
      },
      {
        start: "2021-11-01",
        end: "2022-02-07",
        value: data.ikibinyirmibirkasim.butunaylar,
      },
      {
        start: "2022-02-07",
        end: "2022-08-15",
        value: data.ikibinyirmiikisubat.butunaylar,
      },
      {
        start: "2022-08-15",
        end: "2023-02-01",
        value: data.ikibinyirmiikiagustos.butunaylar,
      },
      {
        start: "2023-02-01",
        end: "2023-08-01",
        value: data.ikibinyirmiucsubat.butunaylar,
      },
      {
        start: "2023-08-01",
        end: "2024-01-22",
        value: data.ikibinyirmiucagustos.butunaylar,
      },
      {
        start: "2024-01-22",
        end: "2024-06-01",
        value: data.ikibinyirmidortocak.butunaylar,
      },
      {
        start: "2024-06-01",
        end: "2030-06-01",
        value: data.ikibinyirmidorthaziran.butunaylar,
      },
    ];

    for (const range of dateRanges) {
      if (monthValue >= range.start && monthValue < range.end) {
        return range.value;
      }
    }

    return "Bilinmiyor";
  }

  function toggleContainers(showId, hideId) {
    $(".button-cont-cover div").removeClass("active");
    $(showId).slideDown(1000).addClass("active");
    $(hideId).slideUp(1000);
  }

  $(document).on("change", ".emonthInput", function () {
    const emonthValue = $(this).val();
    const eapproxResultElement = $(this)
      .closest(".econtainer-content-product")
      .find(".eapproxResult");

    fetch("./edata.json")
      .then((response) => response.json())
      .then((edata) => {
        if (emonthValue) {
          eapproxResultElement.text(`${egetApproxValue(emonthValue, edata)} ₺`);
        } else {
          eapproxResultElement.text("Lütfen bir tarih seçiniz.");
        }
      })
      .catch((error) => {
        console.error("JSON verisi yüklenirken bir hata oluştu:", error);
      });
  });

  $(document).on("click", ".ehesapla", function () {
    let etotal = 0;

    $(".eapproxResult").each(function () {
      const epriceText = $(this).text().replace("₺", "").trim();
      const eprice = parseFloat(epriceText);
      if (!isNaN(eprice)) etotal += eprice;
    });

    $("#etotalPrice").text(`Toplam Ücret: ${etotal.toFixed(2)} ₺`);
  });

  function egetApproxValue(emonthValue, edata) {
    const edateRanges = [
      {
        start: "2019-01-01",
        end: "2019-10-14",
        value: edata.eikibinondokuz.ebutunaylar,
      },
      {
        start: "2019-10-14",
        end: "2022-02-14",
        value: edata.eikibinondokuzekim.ebutunaylar,
      },
      {
        start: "2022-02-14",
        end: "2022-08-15",
        value: edata.eikibinyirmiikisubat.ebutunaylar,
      },
      {
        start: "2022-08-15",
        end: "2023-02-01",
        value: edata.eikibinyirmiikiagustos.ebutunaylar,
      },
      {
        start: "2023-02-01",
        end: "2030-01-01",
        value: edata.eikibinyirmiucsubat.ebutunaylar,
      },
    ];

    for (const range of edateRanges) {
      if (emonthValue >= range.start && emonthValue < range.end) {
        return range.value;
      }
    }

    return "Bilinmiyor";
  }
  $(document).on("click", "#eekle", function () {
    const enewRow = `
      <div class="econtainer-content-product container-content-product">
        <input type="date" id="monthInput" class="emonthInput" />
        <p class="eapproxResult approxResult"></p>
      </div>
    `;
    $("#edateTable .scroll-container").append(enewRow);
  });

  $("#normalTeb").on("click", function () {
    $(this).addClass("active");
    $("#eTeb").removeClass("active");
  });
  $("#eTeb").on("click", function () {
    $(this).addClass("active");
    $("#normalTeb").removeClass("active");
  });
});
