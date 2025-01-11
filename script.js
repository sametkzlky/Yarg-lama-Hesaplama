$(function () {
  let currentPrice = 0;
  let ecurrentPrice = 0;

  $(document).on("change", ".normtebInput", function () {
    const monthValue = $(this).val();
    const approxResultElement = $(this)
      .closest(".container-content-product")
      .find(".approxResult");
    const pieceInput = $(this)
      .closest(".container-content-product")
      .find("#normPiece");
    const clearButton = $(this)
      .closest(".container-content-product")
      .find("#clear");

    fetch("./src/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        if (monthValue) {
          currentPrice = getApproxValue(monthValue, data);
          approxResultElement.text(`${currentPrice} ₺`);
          clearButton.css("display", "block");
          pieceInput.css("display", "block");
        } else {
          approxResultElement.text("Lütfen bir tarih seçiniz.");
          clearButton.css("display", "none");
          pieceInput.css("display", "none");
        }
      })
      .catch((error) => {
        console.error("JSON verisi yüklenirken bir hata oluştu:", error);
      });
  });

  $(document).on("input", "#normPiece", function () {
    const pieceValue = $(this).val();
    const approxResultElement = $(this)
      .closest(".container-content-product")
      .find(".approxResult");

    if (pieceValue < 1) {
      $(this).val(1);
    }

    if (currentPrice > 0 && pieceValue > 0) {
      const updatedPrice = currentPrice * pieceValue;
      approxResultElement.text(`${updatedPrice} ₺`);
    }
  });

  $(document).on("click", ".hesapla", function () {
    let total = 0;

    $(".approxResult").each(function () {
      const priceText = $(this).text().replace("₺", "").trim();
      const price = parseFloat(priceText);
      if (!isNaN(price)) total += price;
    });

    $("#totalPrice").text(
      `Toplam Normal Tebligat Ücreti: ${total.toFixed(2)} ₺`
    );
  });

  $("#tebligatSelector").change(function () {
    if ($(this).val() == "Normal Tebligat") {
      $("#normalTebligat").show();
      $("#eTebligat").hide();
    } else {
      $("#normalTebligat").hide();
      $("#eTebligat").show();
    }
  });

  $(document).on("click", "#normEkle", function () {
    const newRow = `
     <div class="container-content-product">
          <input type="date" id="normteb" class="normtebInput" />
          <p class="approxResult"></p>
          <input type="number" class="piece" id="normPiece" value="1" min="1">
          <p class="clean" id="clear">x</p>
      </div>
    `;
    $("#normTable .scroll-container").append(newRow);
  });

  $(document).on("keydown", ".normtebInput", function (e) {
    const monthValue = $(this).val();

    if (e.key === "Enter" && monthValue) {
      let nextInput = $(this)
        .closest(".container-content-product")
        .next()
        .find(".normtebInput");

      if (nextInput.length > 0) {
        nextInput.focus();
      } else {
        const newRow = `
          <div class="container-content-product">
            <input type="date" id="normteb" class="normtebInput" />
            <p class="approxResult"></p>
            <input type="number" class="piece" id="normPiece" value="1" min="1">
            <p class="clean" id="clear">x</p>
          </div>
        `;
        const appendedRow = $(newRow).appendTo("#normTable .scroll-container");
        appendedRow.find(".normtebInput").focus();
      }
    }
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

  $(document).on("change", ".etebInput", function () {
    const emonthValue = $(this).val();
    const eapproxResultElement = $(this)
      .closest(".econtainer-content-product")
      .find(".eapproxResult");
    const epieceInput = $(this)
      .closest(".container-content-product")
      .find("#ePiece");
    const eclearButton = $(this)
      .closest(".econtainer-content-product")
      .find("#eclear");

    fetch("./src/data/edata.json")
      .then((response) => response.json())
      .then((edata) => {
        if (emonthValue) {
          ecurrentPrice = egetApproxValue(emonthValue, edata);
          eapproxResultElement.text(`${egetApproxValue(emonthValue, edata)} ₺`);
          eclearButton.css("display", "block");
          epieceInput.css("display", "block");
        } else {
          eapproxResultElement.text("Lütfen bir tarih seçiniz.");
          eclearButton.css("display", "none");
          epieceInput.css("display", "none");
        }
      })
      .catch((error) => {
        console.error("JSON verisi yüklenirken bir hata oluştu:", error);
      });
  });

  $(document).on("input", "#ePiece", function () {
    const epieceValue = $(this).val();
    const eapproxResultElement = $(this)
      .closest(".container-content-product")
      .find(".eapproxResult");

    if (epieceValue < 1) {
      $(this).val(1);
    }

    if (ecurrentPrice > 0 && epieceValue > 0) {
      const eupdatedPrice = ecurrentPrice * epieceValue;
      eapproxResultElement.text(`${eupdatedPrice} ₺`);
    }
  });

  $(".overContCover-inp input").on("keydown", function (event) {
    if (event.key === "Enter") {
      // Enter tuşu kontrolü
      $(".total").click(); // .total butonunun click işlevini tetikle
    }
  });

  $(".total").click(function () {
    var postaGideri =
      parseFloat($(".overContCover-inp input").eq(0).val()) || 0;
    var bilirkişiGideri =
      parseFloat($(".overContCover-inp input").eq(1).val()) || 0;
    var imajExportGideri =
      parseFloat($(".overContCover-inp input").eq(2).val()) || 0;
    var digerGiderler =
      parseFloat($(".overContCover-inp input").eq(3).val()) || 0;

    var normTotal = $(".normtotal").text();
    var priceText = parseFloat(normTotal.replace(/[^\d.-]/g, "")) || 0;

    var eTotal = $(".etotal").text();
    var epriceText = parseFloat(eTotal.replace(/[^\d.-]/g, "")) || 0;
    epriceText = Math.abs(epriceText);

    var toplamTebligatGideri = priceText + epriceText;

    var toplamGider =
      toplamTebligatGideri +
      postaGideri +
      bilirkişiGideri +
      imajExportGideri +
      digerGiderler;

    $(".result").html(
      `
      Normal Tebligat Gideri: ${priceText} TL<br><br>
      E-Tebligat Gideri: ${epriceText} TL<br><br>
      Posta Gideri: ${postaGideri} TL<br><br>
      Bilirkişi Gideri: ${bilirkişiGideri} TL<br><br>
      İmaj-Export Gideri: ${imajExportGideri} TL <br><br>
      Diğer Yargılama Giderleri: ${digerGiderler} TL <br><br>
      Toplam Yargılama Gideri: ${toplamGider} TL 
    `
    );
  });

  $(document).on("click", ".ehesapla", function () {
    let etotal = 0;

    $(".eapproxResult").each(function () {
      const epriceText = $(this).text().replace("₺", "").trim();
      const eprice = parseFloat(epriceText);
      if (!isNaN(eprice)) etotal += eprice;
    });

    $("#etotalPrice").text(`Toplam E-Tebligat Ücreti: ${etotal.toFixed(2)} ₺`);
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
          <input type="date" id="eteb" class="etebInput" />
          <p class="eapproxResult"></p>
          <input type="number" class="piece" id="ePiece" value="1" min="1">
          <p class="clean" id="eclear">x</p>
      </div>
    `;
    $("#etebTable .scroll-container").append(enewRow);
  });

  $(document).on("keydown", ".etebInput", function (e) {
    const emonthValue = $(this).val();

    if (e.key === "Enter" && emonthValue) {
      let enextInput = $(this)
        .closest(".container-content-product")
        .next()
        .find(".etebInput");

      if (enextInput.length > 0) {
        enextInput.focus();
      } else {
        const newRow = `
          <div class="econtainer-content-product container-content-product">
            <input type="date" id="eteb" class="etebInput" />
            <p class="eapproxResult"></p>
            <input type="number" class="piece" id="ePiece" value="1" min="1">
            <p class="clean" id="eclear">x</p>
          </div>
        `;
        const appendedRow = $(newRow).appendTo("#etebTable .scroll-container");
        appendedRow.find(".etebInput").focus();
      }
    }
  });

  $("#normalTeb").on("click", function () {
    $(this).addClass("active");
    $("#eTeb").removeClass("active");
  });
  $("#eTeb").on("click", function () {
    $(this).addClass("active");
    $("#normalTeb").removeClass("active");
  });

  $(document).on("click", "#clear", function () {
    const productPriceText = $(this)
      .closest(".container-content-product")
      .find(".approxResult")
      .text()
      .replace("₺", "")
      .trim();
    const productPrice = parseFloat(productPriceText);

    if (!isNaN(productPrice)) {
      $(this).closest(".container-content-product").remove();

      let total = 0;

      $(".approxResult").each(function () {
        const priceText = $(this).text().replace("₺", "").trim();
        const price = parseFloat(priceText);
        if (!isNaN(price)) total += price;
      });

      $("#totalPrice").text(
        `Toplam Normal Tebligat Ücreti: ${total.toFixed(2)} ₺`
      );
    }
  });

  $(document).on("click", "#eclear", function () {
    const productPriceText = $(this)
      .closest(".econtainer-content-product")
      .find(".eapproxResult")
      .text()
      .replace("₺", "")
      .trim();
    const productPrice = parseFloat(productPriceText);

    if (!isNaN(productPrice)) {
      $(this).closest(".econtainer-content-product").remove();

      let etotal = 0;

      $(".eapproxResult").each(function () {
        const epriceText = $(this).text().replace("₺", "").trim();
        const eprice = parseFloat(epriceText);
        if (!isNaN(eprice)) {
          etotal += eprice;
        }
      });

      $("#etotalPrice").text(
        `Toplam E-Tebligat Ücreti: ${etotal.toFixed(2)} ₺`
      );
    }
  });

  $("#clearBtn").on("click", function () {
    $("#normTable .scroll-container").html(`
    <div class="container-content-product">
      <input type="date" id="normteb" class="normtebInput" />
      <p class="approxResult"></p>
      <input type="number" class="piece" id="normPiece" value="1" min="1">
      <p class="clean" id="clear">x</p>      
    </div>
  `);

    $("#totalPrice").text("Toplam Normal Tebligat Ücreti: 0 ₺");
  });

  $("#clearBtn").on("click", function () {
    $(".inp").val("");
    $(".result").empty();
  });

  $(".eclearBtn").on("click", function () {
    $("#etebTable .scroll-container").html(`
    <div class="econtainer-content-product container-content-product">
      <input type="date" id="eteb" class="etebInput" />
      <p class="eapproxResult"></p>
      <input type="number" class="piece" id="ePiece" value="1" min="1">
      <p class="clean" id="eclear">x</p>
    </div>
  `);

    $("#etotalPrice").text("Toplam E-Tebligat Ücreti: 0 ₺");
  });
});
