function convertBinImgToURL(data) {
  var arr: string[] = [];

  for (var i = 0; i < data.length; i++) {
    const imageBuffer = data[i].image.data;

    const byteArray = new Uint8Array(imageBuffer);
    const blob = new Blob([byteArray]);

    const imgUrl = URL.createObjectURL(blob);

    arr.push(imgUrl);
  }
  return arr;
}
